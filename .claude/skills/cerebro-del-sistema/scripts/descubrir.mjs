#!/usr/bin/env node
// Lista carpetas candidatas a tener notas con wikilinks. Solo rutas, nunca
// contenido: quien decide qué entra es la persona, no este script.
import { readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const IGNORAR = new Set([
  "node_modules", ".git", "dist", "apps", ".claude", ".obsidian",
  "__pycache__", ".next", "build", "archives", "archivados",
]);

function args() {
  const a = process.argv.slice(2);
  const out = { raiz: process.cwd() };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--raiz") out.raiz = resolve(a[++i]);
  }
  return out;
}

function contarMd(dir, profundidad = 0, max = 3) {
  if (profundidad > max) return 0;
  let n = 0;
  let entradas = [];
  try {
    entradas = readdirSync(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const e of entradas) {
    if (e.name.startsWith(".")) continue;
    if (IGNORAR.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      n += contarMd(p, profundidad + 1, max);
    } else if (e.name.endsWith(".md") || e.name.endsWith(".txt")) {
      n += 1;
    }
  }
  return n;
}

function candidatos(raiz) {
  const out = [];
  let entradas = [];
  try {
    entradas = readdirSync(raiz, { withFileTypes: true });
  } catch (err) {
    console.error("No se pudo leer la raiz:", raiz, err.message);
    process.exit(1);
  }
  for (const e of entradas) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith(".")) continue;
    if (IGNORAR.has(e.name)) continue;
    const p = join(raiz, e.name);
    const total = contarMd(p);
    if (total > 0) {
      out.push({ ruta: relative(raiz, p) || e.name, absoluta: p, notas: total });
    }
  }
  return out.sort((a, b) => b.notas - a.notas);
}

const { raiz } = args();
const lista = candidatos(raiz);
console.log(JSON.stringify({ raiz, candidatos: lista }, null, 2));
