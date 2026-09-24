// Cerebro del Sistema: un mundo de notas reales. Cada nota es una esfera
// fijada sobre un globo, por sectores de categoria; el centro es el nucleo;
// las conexiones son lineas casi invisibles con particulas viajando. La
// simulacion de fuerzas esta apagada a proposito: el globo no se dispersa.
import * as THREE from "three";
import ForceGraph3D from "3d-force-graph";

const ACENTO = "#e8a33d";
const $ = (id) => document.getElementById(id);
const reducirMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;
const enLocal = ["127.0.0.1", "localhost"].includes(location.hostname);
if (!enLocal) $("abrir-carpeta").hidden = true;

const datos = await (await fetch("grafo.json")).json();
const nodos = datos.nodos.map((n) => ({ ...n }));
const enlaces = datos.enlaces.map((e, i) => ({ ...e, brillo: ((i * 0.6180339887) % 1) }));
const porId = new Map(nodos.map((n) => [n.id, n]));
const colorPorCategoria = Object.fromEntries(datos.categorias.map((c) => [c.id, c.color]));
const etiquetaPorCategoria = Object.fromEntries(datos.categorias.map((c) => [c.id, c.etiqueta]));
const nodoDe = (x) => (typeof x === "object" ? x : porId.get(x));

$("marca-nombre").textContent = datos.nombre;
$("marca-conteo").textContent = nodos.length
  ? `${nodos.length} notas · ${enlaces.length} conexiones`
  : "sin notas todavia";

// ---- estado ---------------------------------------------------------
const apagadas = new Set();
let filtro = "";
let seleccion = null;
let hovered = null;
let moviendo = !reducirMovimiento;
let replay = null;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---- el globo: cada categoria es un sector, cada nota un punto fijo ---
function semilla(texto) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) h = Math.imul(h ^ texto.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}
function colocarEnGlobo() {
  const K = datos.categorias.length;
  const PHI = 0.6180339887;
  const R0 = 340, R1 = 440;
  datos.categorias.forEach((cat, k) => {
    const lista = nodos
      .filter((n) => n.categoria === cat.id)
      .sort((a, b) => a.titulo.localeCompare(b.titulo));
    const n = lista.length;
    const ancho = (Math.PI * 2) / K;
    const inicio = k * ancho;
    const margen = ancho * 0.1;
    lista.forEach((nodo, i) => {
      // Jitter determinista por id: rompe la rejilla que deja la secuencia
      // aurea con cientos de notas, sin cambiar entre recargas.
      const j1 = semilla(nodo.id + "a"), j2 = semilla(nodo.id + "b");
      const y = Math.max(-0.98, Math.min(0.98, 1 - 2 * ((i + 0.5) / n) + (j1 - 0.5) * (0.8 / Math.max(n, 8))));
      const f = (i * PHI + (j2 - 0.5) * 0.05) % 1;
      const lon = inicio + margen + ((f + 1) % 1) * (ancho - 2 * margen);
      const r = (R0 + (R1 - R0) * ((i * 0.7548776662 + j1 * 0.3) % 1)) * (nodo.grado >= 6 ? 0.93 : 1);
      const h = Math.sqrt(Math.max(0, 1 - y * y));
      nodo.x = nodo.fx = r * h * Math.cos(lon);
      nodo.y = nodo.fy = r * y;
      nodo.z = nodo.fz = r * h * Math.sin(lon);
      nodo.hogar = { x: nodo.x, y: nodo.y, z: nodo.z };
    });
  });
}
colocarEnGlobo();

// No se pintan todas las conexiones: cada linea es un objeto que se dibuja
// cada cuadro, y miles de lineas largas cruzando el globo lo vuelven una
// bola de pelo lenta. En reposo se ven las cortas (vecinas en el globo) y
// una muestra de las largas; al elegir una nota se ven todas las suyas.
const tranquilos = new Set(), ambiente = new Set();
const vecinosDe = new Map(nodos.map((n) => [n.id, []]));
enlaces.forEach((l, i) => {
  const a = porId.get(l.source), b = porId.get(l.target);
  if (!a || !b) return;
  vecinosDe.get(a.id).push(b);
  vecinosDe.get(b.id).push(a);
  l.largo = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  if (l.largo < 230 || i % 23 === 0) tranquilos.add(l);
  if (i % 120 === 0) ambiente.add(l);
});
for (const lista of vecinosDe.values()) lista.sort((p, q) => q.grado - p.grado);

// ---- visibilidad ----------------------------------------------------
function nodoVisible(n) {
  if (apagadas.has(n.categoria)) return false;
  if (filtro && !n.titulo.toLowerCase().includes(filtro)) return false;
  if (replay && !replay.nacido.has(n.id)) return false;
  return true;
}
function enlaceVisible(l) {
  const a = nodoDe(l.source), b = nodoDe(l.target);
  if (!a || !b || !nodoVisible(a) || !nodoVisible(b)) return false;
  if (replay) {
    const listos = replay.listos.has(a.id) && replay.listos.has(b.id);
    return replay.arbol.has(l) ? listos : replay.tiempo > 12 && listos && tranquilos.has(l);
  }
  const foco = seleccion || hovered;
  if (foco) return a === foco || b === foco;
  return tranquilos.has(l);
}
function rgba(hex, a) {
  const c = new THREE.Color(hex || "#888888");
  return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${a})`;
}
function colorEnlace(l) {
  const a = nodoDe(l.source), b = nodoDe(l.target);
  const base = colorPorCategoria[b.categoria];
  if (replay) return rgba(base, replay.arbol.has(l) ? 0.55 : 0.12);
  if (seleccion || hovered) return rgba(ACENTO, 0.8);
  return rgba(base, l.tipo === "mencion" ? 0.16 : 0.3);
}
function particulasDe(l) {
  if (!moviendo || reducirMovimiento || !enlaceVisible(l)) return 0;
  if (replay) return replay.arbol.has(l) && l.brillo < 0.25 ? 1 : 0;
  if (seleccion || hovered) return l.brillo < 0.35 ? 2 : 0;
  return ambiente.has(l) ? 1 : 0;
}
function refrescar() {
  Graph.nodeVisibility(Graph.nodeVisibility())
    .linkVisibility(Graph.linkVisibility())
    .linkColor(Graph.linkColor())
    .linkDirectionalParticles(Graph.linkDirectionalParticles());
}

// ---- las esferas ----------------------------------------------------
// Puntos planos y nitidos, un material compartido por categoria (menos
// cambios de material por cuadro) y un halo apenas visible. Nada aditivo:
// las burbujas translucidas convierten el globo en espuma.
const geoEsfera = new THREE.SphereGeometry(1, 16, 12);
const geoHalo = new THREE.SphereGeometry(1, 10, 8);
const objetos = new Map();
const materialCuerpo = new Map(), materialHalo = new Map();
for (const c of datos.categorias) {
  const color = new THREE.Color(c.color);
  materialCuerpo.set(c.id, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 }));
  materialHalo.set(c.id, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, depthWrite: false }));
}
const materialGris = new THREE.MeshBasicMaterial({ color: 0x888888 });
const radioDe = (n) => Math.min(9, 1.9 + Math.sqrt(n.grado || 0) * 0.75);
function objetoNodo(n) {
  const g = new THREE.Group();
  const r = radioDe(n);
  const cuerpo = new THREE.Mesh(geoEsfera, materialCuerpo.get(n.categoria) || materialGris);
  cuerpo.scale.setScalar(r);
  g.add(cuerpo);
  if (r > 3) {
    const halo = new THREE.Mesh(geoHalo, materialHalo.get(n.categoria) || materialGris);
    halo.scale.setScalar(r * 1.5);
    g.add(halo);
  }
  objetos.set(n.id, g);
  return g;
}

// ---- el grafo -------------------------------------------------------
const contenedor = $("grafo");
const Graph = ForceGraph3D()(contenedor)
  .backgroundColor("#05060a")
  .showNavInfo(false)
  .warmupTicks(0)
  .cooldownTicks(0)
  .enableNodeDrag(false)
  .nodeId("id")
  .nodeLabel((n) => `<div class="tip"><b>${esc(n.titulo)}</b><span>${esc(etiquetaPorCategoria[n.categoria] || n.categoria)} · ${n.grado} conexion${n.grado === 1 ? "" : "es"}</span></div>`)
  .nodeThreeObject(objetoNodo)
  .nodeThreeObjectExtend(false)
  .nodeVisibility(nodoVisible)
  .linkVisibility(enlaceVisible)
  .linkColor(colorEnlace)
  .linkOpacity(1)
  .linkWidth(0)
  .linkDirectionalParticles(particulasDe)
  .linkDirectionalParticleWidth(1.6)
  .linkDirectionalParticleSpeed(0.006)
  .linkDirectionalParticleColor(() => "#f2ede4")
  .onNodeClick((n) => { if (!replay) abrirNota(n); })
  .onNodeHover((n) => {
    contenedor.style.cursor = n ? "pointer" : "";
    if (replay) return;
    hovered = n || null;
    etiquetasVecinas(seleccion || hovered);
    refrescar();
  })
  .onBackgroundClick(() => { if (seleccion) cerrarNota(); })
  .graphData({ nodes: nodos, links: enlaces });

const escena = Graph.scene();

// ---- el nucleo, los anillos y las estrellas -------------------------
const extras = new THREE.Group();
escena.add(extras);

const nucleo = new THREE.Mesh(new THREE.SphereGeometry(26, 32, 24), new THREE.MeshBasicMaterial({ color: 0x0b0c12 }));
const brasa = new THREE.Mesh(new THREE.SphereGeometry(34, 24, 18), new THREE.MeshBasicMaterial({
  color: ACENTO, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false,
}));
const aro = new THREE.Mesh(new THREE.TorusGeometry(40, 1.1, 8, 96), new THREE.MeshBasicMaterial({
  color: ACENTO, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false,
}));
aro.rotation.x = Math.PI / 2;
const aro2 = new THREE.Mesh(aro.geometry, aro.material.clone());
aro2.material.opacity = 0.35;
aro2.rotation.set(Math.PI / 2.6, 0.5, 0);
aro2.scale.setScalar(1.45);

const lienzo = document.createElement("canvas");
lienzo.width = lienzo.height = 256;
const ctx = lienzo.getContext("2d");
const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
grad.addColorStop(0, "rgba(232,163,61,0.55)");
grad.addColorStop(0.25, "rgba(232,163,61,0.16)");
grad.addColorStop(1, "rgba(232,163,61,0)");
ctx.fillStyle = grad;
ctx.fillRect(0, 0, 256, 256);
const glow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: new THREE.CanvasTexture(lienzo), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
}));
glow.scale.set(420, 420, 1);
extras.add(nucleo, brasa, aro, aro2, glow);

const anillos = [];
[[520, 0.55, -0.35], [560, -0.9, 0.5], [610, 0.25, 1.2]].forEach(([r, rx, ry], i) => {
  const pts = Array.from({ length: 257 }, (_, j) => {
    const a = (j / 256) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
  });
  const linea = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({
    color: 0xf2ede4, transparent: true, opacity: 0.09 - i * 0.02, depthWrite: false,
  }));
  linea.rotation.set(rx, ry, 0);
  const cometa = new THREE.Mesh(new THREE.SphereGeometry(2.6, 10, 8), new THREE.MeshBasicMaterial({ color: ACENTO }));
  linea.add(cometa);
  extras.add(linea);
  anillos.push({ linea, cometa, r, vel: 0.11 + i * 0.05, fase: i * 2.1 });
});

function capaEstrellas(cantidad, rMin, rMax, tam, op) {
  const pos = new Float32Array(cantidad * 3);
  for (let i = 0; i < cantidad; i++) {
    const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2;
    const r = rMin + Math.random() * (rMax - rMin), h = Math.sqrt(1 - u * u);
    pos[i * 3] = r * h * Math.cos(th);
    pos[i * 3 + 1] = r * u;
    pos[i * 3 + 2] = r * h * Math.sin(th);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0xf2ede4, size: tam, sizeAttenuation: true, transparent: true, opacity: op, depthWrite: false,
  }));
}
extras.add(capaEstrellas(1800, 1600, 2600, 2.2, 0.5), capaEstrellas(900, 900, 1500, 1.2, 0.35));

// ---- camara ---------------------------------------------------------
const DIST = 1450;
const camara = Graph.camera();
const controles = Graph.controls();
controles.minDistance = 160;
controles.maxDistance = 3400;
controles.autoRotate = false;

// La orbita lenta la llevo yo, cuadro a cuadro, en vez de depender del
// autoRotate de los controles: asi gira aunque un tween de camara o un
// gesto a medias lo hayan dejado apagado. Se detiene al tocar el globo o
// al posar el mouse en una nota, y vuelve sola a los cuatro segundos.
let interactuando = false, reposo = null, enTween = false;
controles.addEventListener("start", () => { interactuando = true; clearTimeout(reposo); });
controles.addEventListener("end", () => {
  clearTimeout(reposo);
  reposo = setTimeout(() => (interactuando = false), 4000);
});
function enfocar(pos, mirar, ms) {
  const dur = reducirMovimiento ? 0 : ms;
  enTween = true;
  Graph.cameraPosition(pos, mirar, dur);
  setTimeout(() => (enTween = false), dur + 80);
}
function orbitar(dt) {
  if (!moviendo || interactuando || enTween || seleccion || hovered) return;
  const p = camara.position;
  const r = Math.hypot(p.x, p.z);
  if (r < 1) return;
  const a = Math.atan2(p.x, p.z) + dt * (replay ? 0.035 : 0.08);
  Graph.cameraPosition({ x: r * Math.sin(a), y: p.y, z: r * Math.cos(a) });
}
function vistaGeneral(ms = 1100) {
  enfocar({ x: 0, y: 70, z: DIST }, { x: 0, y: 0, z: 0 }, ms);
}
Graph.cameraPosition({ x: 0, y: 70, z: DIST * 1.25 }, { x: 0, y: 0, z: 0 }, 0);
setTimeout(() => vistaGeneral(2000), 200);

// 3d-force-graph mide el contenedor una vez; si la ventana cambia de tamano
// despues, el canvas se queda chico y deja una franja negra.
window.addEventListener("resize", () => Graph.width(innerWidth).height(innerHeight));

// ---- etiquetas: la nota mas conectada de cada categoria -------------
const capaEtiquetas = $("etiquetas");
const etiquetas = [];
for (const cat of datos.categorias) {
  const top = nodos.filter((n) => n.categoria === cat.id && n.grado > 0).sort((a, b) => b.grado - a.grado)[0];
  if (!top) continue;
  const el = document.createElement("div");
  el.className = "etiqueta-nodo";
  el.textContent = top.titulo.length > 34 ? top.titulo.slice(0, 33) + "…" : top.titulo;
  capaEtiquetas.appendChild(el);
  etiquetas.push({ nodo: top, el });
}
// Etiquetas temporales: al posar el mouse o elegir una nota, se nombran
// ella y sus vecinas mas conectadas, como en una wiki.
const temporales = [];
function etiquetasVecinas(centro) {
  for (const t of temporales) t.el.remove();
  temporales.length = 0;
  if (!centro) return;
  const fijas = new Set(etiquetas.map((e) => e.nodo.id));
  const lista = [centro, ...(vecinosDe.get(centro.id) || []).slice(0, 12)];
  for (const nodo of lista) {
    if (fijas.has(nodo.id)) continue;
    const el = document.createElement("div");
    el.className = "etiqueta-nodo" + (nodo === centro ? " centro" : "");
    el.textContent = nodo.titulo.length > 34 ? nodo.titulo.slice(0, 33) + "…" : nodo.titulo;
    capaEtiquetas.appendChild(el);
    temporales.push({ nodo, el });
  }
}
function actualizarEtiquetas() {
  // graph2ScreenCoords usa la camara y el tamano reales del render, no una
  // proyeccion propia que se desfasa al cambiar la ventana.
  const p = camara.position;
  for (const { nodo, el } of etiquetas.concat(temporales)) {
    if (!nodoVisible(nodo) || (replay && !replay.listos.has(nodo.id))) { el.style.opacity = 0; continue; }
    const frente = (nodo.x - p.x) * -p.x + (nodo.y - p.y) * -p.y + (nodo.z - p.z) * -p.z;
    if (frente <= 0) { el.style.opacity = 0; continue; }
    const s = Graph.graph2ScreenCoords(nodo.x, nodo.y, nodo.z);
    if (!Number.isFinite(s.x) || !Number.isFinite(s.y)) { el.style.opacity = 0; continue; }
    el.style.left = s.x + "px";
    el.style.top = s.y + "px";
    const detras = nodo.x * p.x + nodo.y * p.y + nodo.z * p.z < 0;
    el.style.opacity = detras && !temporales.some((t) => t.nodo === nodo) ? 0.28 : 1;
  }
}

// ---- leyenda --------------------------------------------------------
const leyenda = $("leyenda");
for (const cat of datos.categorias) {
  const total = nodos.filter((n) => n.categoria === cat.id).length;
  const item = document.createElement("div");
  item.className = "leyenda-item";
  item.innerHTML = `<span class="leyenda-nombre" style="--c:${esc(cat.color)}">${esc(cat.etiqueta)}</span><span class="tenue">${total}</span>`;
  item.addEventListener("click", () => {
    if (apagadas.has(cat.id)) apagadas.delete(cat.id); else apagadas.add(cat.id);
    item.classList.toggle("apagado", apagadas.has(cat.id));
    refrescar();
  });
  leyenda.appendChild(item);
}

// ---- buscador -------------------------------------------------------
const input = $("buscar-input");
input.addEventListener("input", () => {
  filtro = input.value.trim().toLowerCase();
  const n = filtro ? nodos.filter((x) => x.titulo.toLowerCase().includes(filtro)).length : 0;
  $("buscar-resultado").textContent = filtro ? `${n} nota${n === 1 ? "" : "s"}` : "";
  refrescar();
});

// ---- panel de nota --------------------------------------------------
const panel = $("panel-nota");
let notaActual = null;
async function abrirNota(nodo) {
  notaActual = nodo;
  seleccion = nodo;
  $("nota-titulo").textContent = nodo.titulo;
  $("nota-categoria").textContent = etiquetaPorCategoria[nodo.categoria] || nodo.categoria;
  $("nota-ruta").textContent = nodo.ruta;
  $("nota-conexiones").textContent = `${nodo.grado} conexion${nodo.grado === 1 ? "" : "es"}`;
  $("nota-texto").textContent = "cargando...";
  panel.classList.add("abierto");
  etiquetasVecinas(nodo);
  refrescar();
  const k = 1.9;
  enfocar({ x: nodo.x * k, y: nodo.y * k + 10, z: nodo.z * k }, { x: nodo.x, y: nodo.y, z: nodo.z }, 900);
  // En local, el servidor lee el archivo completo. Servido como sitio
  // estatico (Vercel), no hay /api: se usa el extracto que trae el grafo.
  try {
    const r = enLocal ? await fetch(`/api/nota?ruta=${encodeURIComponent(nodo.ruta)}`) : null;
    $("nota-texto").textContent = r && r.ok ? await r.text() : (nodo.extracto || "sin extracto disponible.");
  } catch {
    $("nota-texto").textContent = nodo.extracto || "no se pudo leer el archivo.";
  }
}
function cerrarNota() {
  panel.classList.remove("abierto");
  notaActual = null;
  seleccion = null;
  etiquetasVecinas(hovered);
  refrescar();
  vistaGeneral();
}
$("cerrar-nota").addEventListener("click", cerrarNota);
$("abrir-carpeta").addEventListener("click", () => {
  if (notaActual) fetch(`/api/abrir?ruta=${encodeURIComponent(notaActual.ruta)}`);
});

// ---- replay de crecimiento: una conectividad real, no una cronologia -
function planearCrecimiento() {
  const ady = new Map(nodos.map((n) => [n.id, []]));
  for (const l of enlaces) {
    const a = nodoDe(l.source).id, b = nodoDe(l.target).id;
    ady.get(a).push({ id: b, l });
    ady.get(b).push({ id: a, l });
  }
  for (const lista of ady.values()) lista.sort((p, q) => porId.get(q.id).grado - porId.get(p.id).grado);
  const semillas = [...nodos].sort((a, b) => b.grado - a.grado || a.titulo.localeCompare(b.titulo));
  const orden = [], visto = new Set(), arbol = new Set(), padre = new Map();
  for (const s of semillas) {
    if (visto.has(s.id)) continue;
    visto.add(s.id);
    const cola = [s];
    orden.push(s);
    for (let q = 0; q < cola.length; q++) {
      const p = cola[q];
      const libres = ady.get(p.id).filter((v) => !visto.has(v.id));
      for (const v of libres.slice(0, 3)) {
        visto.add(v.id);
        const hijo = porId.get(v.id);
        orden.push(hijo);
        arbol.add(v.l);
        padre.set(v.id, p.id);
        cola.push(hijo);
      }
      if (libres.length > 3) cola.push(p);
    }
  }
  const N = orden.length, DUR = 27;
  const nace = new Map(orden.map((n, i) => [
    n.id,
    i === 0 ? 0 : i === 1 ? 1.1 : i === 2 ? 2.2 : 3 + (DUR - 4) * Math.pow((i - 2) / Math.max(1, N - 3), 0.62),
  ]));
  return {
    orden, nace, arbol, padre, DUR, tiempo: 0,
    nacido: new Set(), listos: new Set(), origen: new Map(), ultimoRefresco: -1, siguiente: 0,
  };
}
function moverNodo(n, p) {
  n.x = n.fx = p.x;
  n.y = n.fy = p.y;
  n.z = n.fz = p.z;
}
const relato = $("relato");
function frase(t, progreso) {
  if (t < 1.1) return "Empieza con una nota.";
  if (t < 4) return "Luego, una conexion.";
  if (t < 12) return "Las ideas se ramifican.";
  if (t < 22) return "El conocimiento se acumula.";
  if (progreso < 1) return "El sistema toma forma.";
  return "Todo tu sistema. Conectado.";
}
function iniciarCrecimiento() {
  if (!nodos.length) { avisar("no hay notas que hacer crecer"); return; }
  if (seleccion) cerrarNota();
  replay = planearCrecimiento();
  for (const o of objetos.values()) o.scale.setScalar(0.001);
  relato.hidden = false;
  hovered = null;
  etiquetasVecinas(null);
  Graph.cameraPosition({ x: 0, y: 30, z: DIST * 0.62 }, { x: 0, y: 0, z: 0 }, 0);
  refrescar();
}
function pasoCrecimiento(dt) {
  const r = replay;
  r.tiempo += dt;
  const t = r.tiempo;
  while (r.siguiente < r.orden.length && r.nace.get(r.orden[r.siguiente].id) <= t) {
    const n = r.orden[r.siguiente];
    const p = r.padre.has(n.id) ? porId.get(r.padre.get(n.id)) : null;
    // Brota desde donde esta su nota padre en este instante, o desde el nucleo.
    r.origen.set(n.id, p ? { x: p.x, y: p.y, z: p.z } : { x: 0, y: 0, z: 0 });
    moverNodo(n, r.origen.get(n.id));
    r.nacido.add(n.id);
    r.siguiente += 1;
  }
  for (const id of r.nacido) {
    if (r.listos.has(id)) continue;
    const n = porId.get(id);
    const edad = t - r.nace.get(id);
    const u = Math.min(1, edad / 1.5);
    const resorte = u >= 1 ? 1 : 1 - Math.exp(-5 * u) * Math.cos(7 * u);
    const o = r.origen.get(id), h = n.hogar;
    moverNodo(n, { x: o.x + (h.x - o.x) * resorte, y: o.y + (h.y - o.y) * resorte, z: o.z + (h.z - o.z) * resorte });
    objetos.get(id)?.scale.setScalar(Math.max(0.001, Math.min(1, u * 1.6)));
    if (u >= 1) { moverNodo(n, h); r.listos.add(id); }
  }
  if (t - r.ultimoRefresco > 0.12) { r.ultimoRefresco = t; refrescar(); }
  const progreso = Math.min(1, r.nacido.size / r.orden.length);
  $("relato-titulo").textContent = frase(t, progreso);
  $("relato-detalle").textContent = `${r.nacido.size} de ${r.orden.length} notas`;
  $("relato-barra").style.setProperty("--progreso", `${Math.round(progreso * 100)}%`);
  if (t > r.DUR + 1.6) terminarCrecimiento();
}
function terminarCrecimiento() {
  replay = null;
  for (const n of nodos) moverNodo(n, n.hogar);
  for (const o of objetos.values()) o.scale.setScalar(1);
  refrescar();
  vistaGeneral(1400);
  setTimeout(() => (relato.hidden = true), 2200);
}

// ---- controles ------------------------------------------------------
function ponerMovimiento(valor) {
  moviendo = valor && !reducirMovimiento;
  $("btn-mover").textContent = moviendo ? "Pausar" : "Mover";
  $("btn-mover").setAttribute("aria-pressed", String(moviendo));
  Graph.linkDirectionalParticleSpeed(moviendo ? 0.006 : 0);
  refrescar();
}
function alternarCine() {
  const activo = document.body.classList.toggle("cine");
  $("btn-cine").textContent = activo ? "Salir" : "Cine";
  $("btn-cine").setAttribute("aria-pressed", String(activo));
  if (activo && seleccion) cerrarNota();
}
let avisoTimer = null;
function avisar(texto) {
  const el = $("aviso");
  el.textContent = texto;
  el.hidden = false;
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => (el.hidden = true), 2200);
}
$("btn-crecer").addEventListener("click", () => { if (!replay) iniciarCrecimiento(); });
$("btn-mover").addEventListener("click", () => ponerMovimiento(!moviendo));
$("btn-cine").addEventListener("click", alternarCine);
document.addEventListener("keydown", (e) => {
  const escribiendo = e.target === input;
  if (e.key === "Escape") {
    if (replay) terminarCrecimiento();
    else if (seleccion) cerrarNota();
    else if (document.body.classList.contains("cine")) alternarCine();
  } else if (!escribiendo && e.key.toLowerCase() === "c") alternarCine();
  else if (!escribiendo && e.code === "Space") { e.preventDefault(); ponerMovimiento(!moviendo); }
});
if (reducirMovimiento) { $("btn-mover").textContent = "Mover"; $("btn-mover").setAttribute("aria-pressed", "false"); }

// ---- el cuadro a cuadro ---------------------------------------------
let ultimo = performance.now(), t = 0;
window.cerebro = {
  estado: () => ({
    t, moviendo, seleccion: seleccion?.titulo || null,
    lineasVisibles: enlaces.filter(enlaceVisible).length,
    particulas: enlaces.reduce((s, l) => s + particulasDe(l), 0),
    dibujo: { ...Graph.renderer().info.render },
    replay: replay && { tiempo: replay.tiempo, nacido: replay.nacido.size, listos: replay.listos.size, siguiente: replay.siguiente },
  }),
};
function cuadro(ahora) {
  try {
    paso(ahora);
  } catch (err) {
    console.error("cuadro:", err);
  }
  requestAnimationFrame(cuadro);
}
function paso(ahora) {
  const dt = Math.min(0.05, (ahora - ultimo) / 1000);
  ultimo = ahora;
  if (moviendo && !document.hidden) t += dt;
  glow.material.opacity = seleccion ? 0.3 : 0.72 + Math.sin(t * 0.8) * 0.1;
  aro.rotation.z = t * 0.25;
  aro2.rotation.z = -t * 0.18;
  const revelado = replay ? Math.min(1, replay.tiempo / 10) : 1;
  for (const { linea, cometa, r, vel, fase } of anillos) {
    linea.visible = revelado > 0.02;
    linea.scale.setScalar(0.25 + 0.75 * revelado);
    linea.rotation.z += dt * 0.02;
    cometa.position.set(Math.cos(t * vel + fase) * r, Math.sin(t * vel + fase) * r, 0);
  }
  if (replay) pasoCrecimiento(dt);
  orbitar(dt);
  actualizarEtiquetas();
}
requestAnimationFrame(cuadro);
