#!/usr/bin/env node
// Copia la plantilla a <raiz>/apps/cerebro-del-sistema/ y escribe la
// configuracion personalizada. Se niega a pisar una carpeta existente.
import { mkdirSync, existsSync, readdirSync, statSync, copyFileSync, writeFileSync, readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const PLANTILLA = resolve(AQUI, "..", "plantilla");

function args() {
  const a = process.argv.slice(2);
  const out = { raiz: process.cwd(), salida: "apps/cerebro-del-sistema" };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--raiz") out.raiz = resolve(a[++i]);
    else if (a[i] === "--config") out.config = resolve(a[++i]);
    else if (a[i] === "--salida") out.salida = a[++i];
  }
  return out;
}

function copiarDir(src, dst) {
  mkdirSync(dst, { recursive: true });
  for (const e of readdirSync(src, { withFileTypes: true })) {
    const s = join(src, e.name);
    const d = join(dst, e.name);
    if (e.isDirectory()) copiarDir(s, d);
    else copyFileSync(s, d);
  }
}

const { raiz, config, salida } = args();

if (!config || !existsSync(config)) {
  console.error("Falta --config <archivo.json> con { nombre, categorias: [{id,etiqueta,color,rutas}] }");
  process.exit(1);
}

const destino = resolve(raiz, salida);
if (existsSync(destino)) {
  console.error("Ya existe:", destino, "- no se sobrescribe. Borra o mueve la carpeta primero si quieres reemplazarla.");
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(config, "utf8"));
if (!cfg.nombre || !Array.isArray(cfg.categorias) || cfg.categorias.length === 0) {
  console.error("El config necesita 'nombre' y al menos una categoria en 'categorias'.");
  process.exit(1);
}
for (const c of cfg.categorias) {
  if (!c.id || !c.etiqueta || !c.color || !Array.isArray(c.rutas) || c.rutas.length === 0) {
    console.error("Cada categoria necesita id, etiqueta, color y al menos una ruta:", c);
    process.exit(1);
  }
}

copiarDir(PLANTILLA, destino);

const salidaConfig = {
  nombre: cfg.nombre,
  raiz,
  categorias: cfg.categorias,
  puerto: cfg.puerto || 4650,
};
writeFileSync(join(destino, "constelacion.config.json"), JSON.stringify(salidaConfig, null, 2));

console.log("Listo:", destino);
console.log("Siguiente: node build.mjs && node servir.mjs   (adentro de esa carpeta)");
