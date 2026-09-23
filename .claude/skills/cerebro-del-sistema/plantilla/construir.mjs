#!/usr/bin/env node
// Escanea las categorias de constelacion.config.json, encuentra wikilinks
// [[Titulo]] y links markdown [texto](archivo.md) REALES, y escribe grafo.json.
// No inventa conexiones que no esten en el texto. Un link ambiguo o que no
// resuelve a ninguna nota conocida se descarta, no se adivina.
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname, relative, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = resolve(dirname(fileURLToPath(import.meta.url)));
const CONFIG_PATH = join(AQUI, "constelacion.config.json");

if (!existsSync(CONFIG_PATH)) {
  console.error("No encuentro constelacion.config.json en", AQUI);
  process.exit(1);
}
const cfg = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));

function listarArchivos(dir) {
  let out = [];
  let entradas;
  try {
    entradas = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entradas) {
    if (e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(listarArchivos(p));
    else if (e.name.endsWith(".md") || e.name.endsWith(".txt")) out.push(p);
  }
  return out;
}

// 1. Recolectar todas las notas de todas las categorias.
const notas = []; // { id, titulo, categoria, rutaAbs, rutaRel }
const porTituloNormal = new Map(); // titulo en minusculas -> id (primera coincidencia gana)
const porRutaAbs = new Map(); // ruta absoluta -> id
let idn = 0;
const advertencias = [];

for (const cat of cfg.categorias) {
  for (const rutaRelCat of cat.rutas) {
    const abs = resolve(cfg.raiz, rutaRelCat);
    if (!existsSync(abs)) {
      advertencias.push(`La ruta de "${cat.etiqueta}" no existe: ${rutaRelCat}`);
      continue;
    }
    const archivos = statSync(abs).isDirectory() ? listarArchivos(abs) : [abs];
    for (const archivo of archivos) {
      const titulo = basename(archivo, extname(archivo));
      const id = "n" + (idn++);
      const rel = relative(cfg.raiz, archivo);
      notas.push({ id, titulo, categoria: cat.id, rutaAbs: archivo, rutaRel: rel });
      porRutaAbs.set(archivo, id);
      const clave = titulo.toLowerCase();
      if (!porTituloNormal.has(clave)) porTituloNormal.set(clave, id);
    }
  }
}

// 2. Leer cada nota, extraer wikilinks y links markdown, resolver contra el indice.
const enlacesSet = new Set(); // "idA|idB" para no duplicar
const enlaces = [];
const REGEX_WIKI = /\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g;
const REGEX_MD = /\[[^\]]*\]\(([^)]+\.md)\)/g;

for (const nota of notas) {
  let texto = "";
  try {
    texto = readFileSync(nota.rutaAbs, "utf8");
  } catch {
    continue;
  }

  let m;
  REGEX_WIKI.lastIndex = 0;
  while ((m = REGEX_WIKI.exec(texto))) {
    const destinoTitulo = m[1].trim().toLowerCase();
    const destinoId = porTituloNormal.get(destinoTitulo);
    if (destinoId && destinoId !== nota.id) {
      const clave = [nota.id, destinoId].sort().join("|");
      if (!enlacesSet.has(clave)) {
        enlacesSet.add(clave);
        enlaces.push({ source: nota.id, target: destinoId, tipo: "wikilink" });
      }
    }
  }

  REGEX_MD.lastIndex = 0;
  while ((m = REGEX_MD.exec(texto))) {
    const rutaLink = m[1].trim();
    if (rutaLink.startsWith("http://") || rutaLink.startsWith("https://")) continue;
    let rutaDecodificada = rutaLink;
    try {
      rutaDecodificada = decodeURIComponent(rutaLink);
    } catch {
      // link mal formado, se usa tal cual
    }
    const abs = resolve(dirname(nota.rutaAbs), rutaDecodificada);
    const destinoId = porRutaAbs.get(abs);
    if (destinoId && destinoId !== nota.id) {
      const clave = [nota.id, destinoId].sort().join("|");
      if (!enlacesSet.has(clave)) {
        enlacesSet.add(clave);
        enlaces.push({ source: nota.id, target: destinoId, tipo: "markdown" });
      }
    }
  }
}

// 3. Contar conexiones por nota, para el tamano del punto en la constelacion.
const grado = new Map(notas.map((n) => [n.id, 0]));
for (const e of enlaces) {
  grado.set(e.source, (grado.get(e.source) || 0) + 1);
  grado.set(e.target, (grado.get(e.target) || 0) + 1);
}

const grafo = {
  nombre: cfg.nombre,
  generado: new Date().toISOString(),
  categorias: cfg.categorias.map((c) => ({ id: c.id, etiqueta: c.etiqueta, color: c.color })),
  nodos: notas.map((n) => ({
    id: n.id,
    titulo: n.titulo,
    categoria: n.categoria,
    ruta: n.rutaRel,
    grado: grado.get(n.id) || 0,
  })),
  enlaces,
};

writeFileSync(join(AQUI, "grafo.json"), JSON.stringify(grafo));

console.log(`${cfg.nombre}: ${notas.length} notas, ${enlaces.length} conexiones reales.`);
const porCat = {};
for (const n of notas) porCat[n.categoria] = (porCat[n.categoria] || 0) + 1;
for (const cat of cfg.categorias) {
  console.log(`  - ${cat.etiqueta}: ${porCat[cat.id] || 0}`);
}
if (advertencias.length) {
  console.log("Avisos:");
  for (const a of advertencias) console.log("  -", a);
}
if (notas.length > 0 && enlaces.length === 0) {
  console.log("Sin conexiones todavia: ninguna nota usa [[wikilinks]] o links a otra .md. El grafo va a salir de puntos sueltos, y es honesto que se vea asi.");
}
