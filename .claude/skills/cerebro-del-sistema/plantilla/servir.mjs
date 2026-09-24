#!/usr/bin/env node
// Servidor estatico minimo, sin dependencias de npm. Sirve esta carpeta,
// lee una nota real cuando se le pide, y puede abrir su carpeta en el
// explorador. Nunca sale de 127.0.0.1.
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const AQUI = resolve(dirname(fileURLToPath(import.meta.url)));
const CONFIG = JSON.parse(readFileSync(join(AQUI, "constelacion.config.json"), "utf8"));

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function rutaPermitida(rutaRel) {
  // La nota tiene que caer dentro de alguna de las rutas configuradas.
  const abs = resolve(CONFIG.raiz, rutaRel);
  for (const cat of CONFIG.categorias) {
    for (const r of cat.rutas) {
      const base = resolve(CONFIG.raiz, r);
      if (abs === base || abs.startsWith(base + "\\") || abs.startsWith(base + "/")) return abs;
    }
  }
  return null;
}

const server = createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");

  if (url.pathname === "/api/nota") {
    const rutaRel = url.searchParams.get("ruta") || "";
    const abs = rutaPermitida(rutaRel);
    if (!abs || !existsSync(abs)) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("no encontrada");
      return;
    }
    const texto = readFileSync(abs, "utf8");
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end(texto.slice(0, 4000));
    return;
  }

  if (url.pathname === "/api/abrir") {
    const rutaRel = url.searchParams.get("ruta") || "";
    const abs = rutaPermitida(rutaRel);
    if (!abs) {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("ruta no permitida");
      return;
    }
    const carpeta = statSync(abs).isDirectory() ? abs : dirname(abs);
    const cmd = process.platform === "win32" ? "explorer"
      : process.platform === "darwin" ? "open" : "xdg-open";
    spawn(cmd, [carpeta], { detached: true, stdio: "ignore" }).unref();
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("ok");
    return;
  }

  let ruta = url.pathname === "/" ? "/index.html" : url.pathname;
  const abs = join(AQUI, ruta);
  if (!abs.startsWith(AQUI) || !existsSync(abs) || statSync(abs).isDirectory()) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("no encontrado");
    return;
  }
  const tipo = TIPOS[extname(abs)] || "application/octet-stream";
  res.writeHead(200, { "content-type": tipo });
  res.end(readFileSync(abs));
});

let puerto = CONFIG.puerto || 4650;
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Puerto ${puerto} ocupado. Cambia "puerto" en constelacion.config.json y corre de nuevo.`);
    process.exit(1);
  }
  throw err;
});
server.listen(puerto, "127.0.0.1", () => {
  console.log(`${CONFIG.nombre} corriendo en http://127.0.0.1:${puerto}`);
});
