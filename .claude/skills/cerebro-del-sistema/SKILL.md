---
name: cerebro-del-sistema
description: Usalo para convertir el conocimiento real de este AIOS en una constelacion 3D navegable. "construye mi cerebro 3d", "visualiza mi conocimiento", "/cerebro-del-sistema", "quiero ver como se conecta todo". Lee notas con [[wikilinks]] y links markdown reales, nunca inventa una conexion que no este en el texto.
disable-model-invocation: true
argument-hint: "[nombre del cerebro] [categorias o carpeta ya generada]"
---

# Cerebro del Sistema

Convierte las notas reales de este AIOS en un campo estelar 3D navegable: cada nota es un
punto de luz, cada `[[wikilink]]` o link markdown real es una linea que las conecta. No es una
esfera con orbitas: es una constelacion, propia, construida sobre `3d-force-graph` (libreria
generica de codigo abierto), sin copiar el paquete de ningun tercero.

El comando es `/cerebro-del-sistema`. Interpreta tambien la frase "cerebro del sistema" o
"cerebro 3D" en la conversacion. No requiere Node instalado aparte del que ya trae Claude Code
(Node 22 o mas nuevo), ni `npm install`, ni paso de build: la libreria de grafo 3D se carga en
el navegador desde un CDN. Cero dependencias que instalar a mano.

## Paso 1. Encuentra donde hay notas

Corre el descubridor, que solo lista rutas, nunca lee contenido:

```
node .claude/skills/cerebro-del-sistema/scripts/descubrir.mjs --raiz .
```

Tambien revisa el `CLAUDE.md` por rutas explicitas a carpetas de conocimiento (un vault, un
segundo cerebro, notas viejas) que el descubridor no haya encontrado por estar fuera de esta
carpeta.

## Paso 2. Pregunta nombre y categorias

Usa la herramienta de preguntas del host si esta disponible.

1. **Nombre:** "¿Como le quieres llamar a tu cerebro?" Un argumento ya recibido contesta esto.
2. **Categorias:** "¿Que categorias principales quieres ver?" Ofrece las carpetas que encontro
   el descubridor, cada una con su ruta y cuantas notas tiene. Deja que la persona renombre,
   quite o agregue. Entre tres y siete categorias se ve bien en la constelacion; el limite duro
   es doce.

Si una carpeta candidata tiene notas pero nadie sabe que son, pregunta antes de incluirla. No
adivines rutas externas: si alguien menciona un vault de Obsidian o un segundo cerebro, pide la
ruta exacta.

Asigna un color distinto a cada categoria de esta paleta (o deja que la persona elija la suya):
`#60a5fa #f472b6 #34d399 #a78bfa #22d3ee #fb7185 #facc15`. **Ningun color de categoria puede
ser el acento `#e8a33d`**: ese queda reservado para la interfaz, para que no compita
visualmente con los nodos.

## Paso 3. Arma la app

Escribe un archivo de configuracion temporal (fuera del repo o en una carpeta ignorada) con
este formato, y llama al armador:

```json
{
  "nombre": "Como se llame",
  "categorias": [
    {"id": "contexto", "etiqueta": "Contexto", "color": "#60a5fa", "rutas": ["contexto"]}
  ],
  "puerto": 4650
}
```

```
node .claude/skills/cerebro-del-sistema/scripts/armar.mjs --raiz . --config <config.json> --salida apps/cerebro-del-sistema
```

Se niega a pisar una carpeta que ya existe. Si el destino ya esta ocupado por una version
anterior, pregunta si se reemplaza (borrarla primero) o si se usa otro nombre de salida.

## Paso 4. Construye y sirve

Dentro de la carpeta generada:

```
node construir.mjs
node servir.mjs
```

Lee el resumen real que imprime `construir.mjs`: cuantas notas y cuantas conexiones encontro
por categoria. Una categoria vacia se reporta honesta, no se rellena con nodos inventados. Si
salen cero conexiones, dilo tal cual: significa que las notas de esa persona todavia no usan
`[[wikilinks]]` ni se enlazan entre si, y el cerebro se va a ver como puntos sueltos hasta que
eso cambie. Eso es informacion util, no un error que haya que disimular.

Arranca `servir.mjs` con el mecanismo de segundo plano del host (en Windows, oculto). Puerto
por default 4650; si esta ocupado, el propio servidor lo dice y hay que cambiar `"puerto"` en
`constelacion.config.json` y volver a correr. El bind siempre es `127.0.0.1`, nunca expuesto a
la red.

## Lo que hay que preservar

Esto es el contrato visual y de comportamiento de la plantilla. No lo simplifiques ni lo
regeneres con un modelo de imagen:

- Fondo de campo estelar propio (canvas 2D, sin libreria), con el grafo 3D transparente encima.
- Nodos coloreados por categoria, con tamano que crece segun cuantas conexiones reales tiene
  esa nota.
- Lineas de conexion tenues, con particulas viajando a lo largo (no lineas solidas quietas).
- Camara con orbita lenta automatica que se detiene en cuanto la persona arrastra o hace zoom.
- Leyenda arriba a la derecha: clic en una categoria la apaga y prende.
- Buscador abajo, al centro: filtra nodos por titulo en vivo.
- Clic en un nodo abre un panel lateral con el titulo, la categoria, la ruta real, un extracto
  del contenido real (leido del archivo, nunca inventado) y un boton para abrir la carpeta en
  el explorador del sistema.
- Toda la interfaz en el idioma de quien la usa.

## Verificacion

1. `construir.mjs` reporta conteos que coinciden con lo que el descubridor encontro.
2. Abre al menos una nota real de cada categoria no vacia desde el panel lateral; el texto
   coincide con el archivo original, que sigue intacto.
3. El buscador filtra de verdad; la leyenda apaga y prende categorias.
4. Arrastra y haz zoom: la orbita automatica se detiene y no interrumpe la interaccion.
5. Revisa la consola del navegador. Si no puedes verificar visualmente, dilo exactamente asi en
   vez de dar por bueno algo que no viste.

## Notas

- **Cero instalacion de npm.** La libreria de grafo 3D se carga por CDN en `index.html`. Si la
  persona va a grabar o usar esto sin internet, avisa que esa parte necesita conexion la
  primera vez que abre la pagina.
- No copies nada del paquete `3d-brain` de terceros ni de ningun otro skill de cerebro 3D. Esta
  plantilla es propia, de punta a punta.
- No publiques ni despliegues esto sin autorizacion explicita. Es local por diseno.
