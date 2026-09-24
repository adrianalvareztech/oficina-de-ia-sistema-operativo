---
name: cerebro-del-sistema
description: Usalo para convertir el conocimiento real de este AIOS en una constelacion 3D navegable. "construye mi cerebro 3d", "visualiza mi conocimiento", "/cerebro-del-sistema", "quiero ver como se conecta todo". Lee notas con [[wikilinks]] y links markdown reales, nunca inventa una conexion que no este en el texto.
disable-model-invocation: true
argument-hint: "[nombre del cerebro] [categorias o carpeta ya generada]"
---

# Cerebro del Sistema

Convierte las notas reales de este AIOS en un mundo 3D navegable: un globo donde cada nota es
una esfera fijada en el sector de su categoria, con un nucleo al centro, anillos orbitales y el
conjunto girando despacio. Cada `[[wikilink]]`, link markdown o mencion por titulo exacto es
una conexion real entre dos notas. Esta construido sobre `3d-force-graph` (libreria generica de
codigo abierto) con codigo, chrome y paleta propios; no copia el paquete de ningun tercero.

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

Asigna un color distinto a cada categoria de esta paleta, en este orden (o deja que la persona
elija la suya): jade `#5ED3A6`, lila `#C4A6FF`, agua `#59E3E3`, rosa `#FF9AC7`, coral `#FF6B6B`,
cielo `#7CB8FF`, lima `#C4E85A`, hueso `#F5EFE0`. Es una paleta propia, sin el amarillo, el
naranja ni el gris de otros cerebros 3D. **Ningun color de categoria puede ser el acento
`#e8a33d`** ni un dorado parecido: ese queda reservado para la interfaz y el nucleo, para que
no compita visualmente con los nodos.

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

- **Un globo, no una galaxia.** Las notas van fijadas sobre una esfera (radio 340 a 440), cada
  categoria en su propio sector, con la simulacion de fuerzas apagada (`warmupTicks(0)`,
  `cooldownTicks(0)`). Sin eso el grafo se dispersa y deja de leerse como un mundo.
- Nucleo oscuro al centro con aro ambar y glow, tres anillos orbitales tenues con un punto que
  los recorre, y campo de estrellas en la escena (con paralaje al girar).
- Esferas planas y nitidas coloreadas por categoria, tamano segun cuantas conexiones reales
  tiene la nota. La mas conectada de cada categoria lleva etiqueta fija; las etiquetas se
  proyectan con `graph2ScreenCoords` de la libreria (no con una proyeccion propia) y el canvas
  se redimensiona con la ventana, o quedan flotando lejos de su nodo y sale una franja negra.
- **Hover = wiki.** Al posar el mouse sobre una nota se ven solo sus conexiones, en el color
  de acento, y se nombran ella y hasta doce vecinas. Al hacer clic se abre el panel. Tooltip
  con titulo, categoria y numero de conexiones.
- Conexiones como lineas finas del color de la categoria destino, con particulas viajando en
  una muestra chica. **En reposo no se pintan todas:** solo las cortas (extremos vecinos en el
  globo) y una de cada 23 largas; al elegir una nota se ven todas las suyas. Cada linea es un
  objeto que se dibuja cada cuadro, y pintar miles de lineas largas cruzando el globo lo
  vuelve una bola de pelo lenta. Las menciones por titulo van mas tenues que los links.
- Las menciones por titulo solo cuentan entre categorias distintas (`construir.mjs`): dentro
  de una misma carpeta, los indices nombran a todas las demas notas y eso es tabla de
  contenidos, no relacion.
- Camara con autorotacion lenta que se detiene al arrastrar o hacer zoom y vuelve sola a los
  cinco segundos de quietud. Respeta `prefers-reduced-motion`.
- **Ver crecer:** replay de conectividad real (no una cronologia inventada). Empieza en una
  nota, cada nota brota desde su nota padre segun las conexiones que existen, y termina con el
  globo completo en unos 27 segundos, con relato en pantalla.
- **Cine:** oculta la interfaz y deja solo el mundo. Tecla `c`. `Espacio` pausa el movimiento.
- Leyenda arriba a la derecha (clic apaga y prende una categoria), buscador abajo al centro,
  y clic en una nota abre un panel lateral con titulo, categoria, ruta real, numero de
  conexiones, un extracto del archivo real y un boton para abrir su carpeta.
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

- **Cero instalacion de npm.** `three` y `3d-force-graph` se cargan como modulos ES desde
  `esm.sh` con un import map en `index.html`, fijados a versiones exactas para que ambos usen
  la misma instancia de `three`. Si la persona va a usar esto sin internet, avisa que la
  pagina necesita conexion la primera vez que abre (despues queda en cache del navegador).
- **La animacion se pausa en pestanas ocultas.** Es comportamiento del navegador
  (`requestAnimationFrame`), no una falla: el replay solo avanza con la pestana visible.
- No copies nada del paquete `3d-brain` de terceros ni de ningun otro skill de cerebro 3D. Esta
  plantilla es propia, de punta a punta.
- No publiques ni despliegues esto sin autorizacion explicita. Es local por diseno.
