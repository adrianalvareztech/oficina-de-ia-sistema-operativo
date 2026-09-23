// Cerebro del Sistema: constelacion 3D de las notas reales del AIOS.
// Fondo: canvas 2D con estrellas propio, detras de un WebGL transparente.
// Grafo: 3d-force-graph (cdn), sin tocar su THREE interno.

(function estrellas() {
  const cv = document.getElementById("estrellas");
  const ctx = cv.getContext("2d");
  let estrellas = [];

  function medir() {
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const n = Math.floor((cv.width * cv.height) / 2600);
    estrellas = Array.from({ length: n }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: Math.random() * 1.2 + 0.2,
      fase: Math.random() * Math.PI * 2,
      vel: 0.4 + Math.random() * 0.8,
    }));
  }

  function pintar(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const e of estrellas) {
      const parpadeo = 0.55 + 0.45 * Math.sin(t * 0.0006 * e.vel + e.fase);
      ctx.globalAlpha = parpadeo;
      ctx.fillStyle = "#f2ede4";
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(pintar);
  }

  window.addEventListener("resize", medir);
  medir();
  requestAnimationFrame(pintar);
})();

(async function grafo() {
  const res = await fetch("grafo.json");
  const datos = await res.json();

  document.getElementById("marca-nombre").textContent = datos.nombre;
  document.getElementById("marca-conteo").textContent =
    `${datos.nodos.length} notas · ${datos.enlaces.length} conexiones`;

  const colorPorCategoria = Object.fromEntries(datos.categorias.map((c) => [c.id, c.color]));
  const etiquetaPorCategoria = Object.fromEntries(datos.categorias.map((c) => [c.id, c.etiqueta]));
  const apagadas = new Set();
  let filtro = "";

  const nodos = datos.nodos.map((n) => ({ ...n }));
  const enlaces = datos.enlaces.map((e) => ({ ...e }));

  const contenedor = document.getElementById("grafo");
  const Graph = ForceGraph3D()(contenedor)
    .graphData({ nodes: nodos, links: enlaces })
    .backgroundColor("rgba(0,0,0,0)")
    .showNavInfo(false)
    .nodeId("id")
    .nodeLabel((n) => `${n.titulo}`)
    .nodeVal((n) => 1.4 + Math.min(n.grado, 8) * 0.6)
    .nodeColor((n) => (visible(n) ? colorPorCategoria[n.categoria] || "#888" : "rgba(80,80,80,0.15)"))
    .nodeOpacity(0.92)
    .nodeVisibility((n) => visible(n))
    .linkVisibility((l) => visible(l.source) && visible(l.target))
    .linkColor(() => "rgba(232, 163, 61, 0.35)")
    .linkOpacity(0.35)
    .linkWidth(0.4)
    .linkDirectionalParticles(1)
    .linkDirectionalParticleWidth(1.4)
    .linkDirectionalParticleSpeed(0.004)
    .linkDirectionalParticleColor(() => "#e8a33d")
    .onNodeClick(abrirNota)
    .onBackgroundClick(() => cerrarNota());

  function visible(n) {
    const id = typeof n === "object" ? n.id : n;
    const nodo = nodos.find((x) => x.id === id) || n;
    if (nodo.categoria && apagadas.has(nodo.categoria)) return false;
    if (filtro && nodo.titulo && !nodo.titulo.toLowerCase().includes(filtro)) return false;
    return true;
  }

  // Camara: entrada suave, luego orbita lenta que se detiene si el usuario toca.
  Graph.cameraPosition({ x: 0, y: 0, z: Math.max(280, nodos.length * 6) });
  let orbitando = true;
  const controles = Graph.controls();
  controles.addEventListener("start", () => (orbitando = false));
  let angulo = 0;
  (function orbita() {
    if (orbitando) {
      angulo += 0.0007;
      const radio = Graph.cameraPosition().z || 320;
      Graph.cameraPosition({ x: radio * Math.sin(angulo), z: radio * Math.cos(angulo) });
    }
    requestAnimationFrame(orbita);
  })();

  // Leyenda: un renglon por categoria, clic apaga/prende.
  const leyenda = document.getElementById("leyenda");
  for (const cat of datos.categorias) {
    const total = nodos.filter((n) => n.categoria === cat.id).length;
    const item = document.createElement("div");
    item.className = "leyenda-item";
    item.innerHTML = `<span class="leyenda-barra" style="background:${cat.color}"></span>${cat.etiqueta} <span class="tenue">${total}</span>`;
    item.addEventListener("click", () => {
      if (apagadas.has(cat.id)) apagadas.delete(cat.id);
      else apagadas.add(cat.id);
      item.classList.toggle("apagado", apagadas.has(cat.id));
      Graph.nodeColor(Graph.nodeColor()).linkVisibility(Graph.linkVisibility());
    });
    leyenda.appendChild(item);
  }

  // Buscador.
  const input = document.getElementById("buscar-input");
  const resultado = document.getElementById("buscar-resultado");
  input.addEventListener("input", () => {
    filtro = input.value.trim().toLowerCase();
    const n = filtro ? nodos.filter((n) => n.titulo.toLowerCase().includes(filtro)).length : 0;
    resultado.textContent = filtro ? `${n} nota${n === 1 ? "" : "s"}` : "";
    Graph.nodeColor(Graph.nodeColor()).linkVisibility(Graph.linkVisibility());
  });

  // Panel de nota.
  const panel = document.getElementById("panel-nota");
  const elTitulo = document.getElementById("nota-titulo");
  const elCategoria = document.getElementById("nota-categoria");
  const elRuta = document.getElementById("nota-ruta");
  const elTexto = document.getElementById("nota-texto");
  const btnAbrir = document.getElementById("abrir-carpeta");
  let notaActual = null;

  async function abrirNota(nodo) {
    notaActual = nodo;
    elTitulo.textContent = nodo.titulo;
    elCategoria.textContent = etiquetaPorCategoria[nodo.categoria] || nodo.categoria;
    elRuta.textContent = nodo.ruta;
    elTexto.textContent = "cargando...";
    panel.classList.add("abierto");
    orbitando = false;
    try {
      const r = await fetch(`/api/nota?ruta=${encodeURIComponent(nodo.ruta)}`);
      elTexto.textContent = r.ok ? await r.text() : "no se pudo leer el archivo.";
    } catch {
      elTexto.textContent = "no se pudo leer el archivo.";
    }
  }

  function cerrarNota() {
    panel.classList.remove("abierto");
    notaActual = null;
  }

  document.getElementById("cerrar-nota").addEventListener("click", cerrarNota);
  btnAbrir.addEventListener("click", () => {
    if (notaActual) fetch(`/api/abrir?ruta=${encodeURIComponent(notaActual.ruta)}`);
  });

  if (nodos.length === 0) {
    document.getElementById("marca-conteo").textContent = "sin notas todavia";
  }
})();
