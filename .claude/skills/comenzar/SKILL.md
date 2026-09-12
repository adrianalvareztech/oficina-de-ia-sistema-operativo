---
name: comenzar
description: Úsalo el primer día, justo después de crear tu repositorio y abrirlo con Claude Code. Te entrevista y arma tu contexto desde cero, adaptando las preguntas a lo que haces (dueño de negocio, freelance, empleado, creador o estudiante). Vuelve a correrlo cuando algo cambie a fondo.
---

## Qué hace

Siete preguntas, y con eso arma lo mínimo que el sistema necesita para servirte: quién eres, qué
haces, para quién, qué te importa ahora y cómo escribes. También deja `conexiones.md` con la
lista de lo que vas a conectar después, y llena los espacios en blanco del `CLAUDE.md`.

**El día 1 se arma poco a propósito.** Cuatro archivos de contexto y una lista de pendientes. El
resto aparece cuando el uso lo pida, no aquí. Un archivo lleno de respuestas improvisadas para no
dejarlo vacío es peor que no tenerlo, porque el sistema lo va a citar como si fuera cierto.

La entrevista se adapta a lo que haces. Un empleado y un dueño de negocio no contestan lo mismo,
y forzar a los dos por el mismo formulario produce archivos inventados.

Es retomable. Cada respuesta se guarda en `entrevista.md` conforme avanzas, así que puedes parar
a media entrevista y seguir después. Si ya la corriste antes, pregunta qué quieres actualizar en
vez de repetirla completa.

**Contexto no es segundo cerebro.** Contexto es la base que arma esta skill, se instala una vez y
se actualiza cuando algo cambia. Un segundo cerebro es una wiki que se acumula con el tiempo, y
no se arma aquí.

## Cuándo no correr esto

- Si solo quieres cambiar un dato suelto: edita el archivo directo en `contexto/`.
- Si lo que quieres es conectar una herramienta: eso es el paso siguiente, no esta skill.
- Si buscas tu próxima automatización: usa `/descubrir-automatizaciones`.

## Ejecución

### Paso 0. Revisa si ya hay entrevista

Lee `entrevista.md` si existe. Si tiene respuestas, no vuelvas a preguntar esas. Di cuáles ya
están y pregunta si quiere completar el resto o armar el contexto con lo que ya hay.

Si el `contexto/` ya está lleno y esto es una segunda corrida, pregunta qué cambió y toca solo
eso. Antes de sobrescribir, mueve los archivos viejos a `archivados/contexto-{AAAA-MM-DD}/`.

### Paso 1. La entrevista

Una pregunta a la vez, en conversación, no como formulario. Escribe cada respuesta en
`entrevista.md` conforme avanzas.

Si alguien se tarda mucho en una pregunta, o empieza a inventar para llenarla, córtala: "con eso
basta, esto crece con el uso". Prefiere una respuesta corta y real a una larga y armada. Vale
para las siete y sobre todo para la 6.

**1. ¿A qué te dedicas?** En sus palabras, sin formalismos.

Pregúntala así, no como "¿qué haces?". Esa se contesta con lo que la persona está haciendo en
este momento y no con su oficio.

De aquí sale el perfil. No lo preguntes directo, dedúcelo, y si no queda claro pregunta una sola
cosa para desempatar. En qué cambian las preguntas 2, 5 y 6:

| Perfil | Pregunta 2 | Pregunta 5 | Pregunta 6 |
|---|---|---|---|
| Dueño de negocio | Su cliente ideal | Lo que más le pesa de operar | Precios y paquetes reales |
| Freelance o consultor | El cliente con el que trabaja a gusto | Lo que más le pesa de entregar | Tarifas, por hora o por proyecto |
| Empleado | Quién recibe su trabajo y qué espera | Lo que más le pesa de su semana | No aplica, se salta |
| Creador o estudiante | Para quién produce | Lo que más le pesa de producir o entregar | Si monetiza y cómo, o no aplica |

Si no encaja en ninguno, no lo fuerces. Pídele que describa en una línea cómo se organiza su
semana y adapta las tres preguntas a eso.

**2. ¿Quién es tu cliente ideal?** Según la tabla. Empuja hacia lo concreto: no "empresas
medianas", sino cómo reconoce a uno de los buenos cuando le escribe.

**3. ¿Qué es lo más importante en los próximos 90 días?** Dos o tres, no diez. Si dice "crecer" o
"vender más", pide un número, una fecha o algo entregable. Sin eso, en tres meses el archivo no
sirve para saber si pasó.

**4. Pega una o dos cosas que hayas escrito últimamente.** Tal cual, sin retocar.

Esta es la única pregunta con una regla que no se dobla: si empieza a escribir el texto ahí mismo
en vez de pegarlo, detente y pídele que lo pegue de algo que ya haya escrito antes. Un texto
redactado en el momento ya viene contaminado por la conversación y no captura cómo escribe de
verdad. Dilo así, sin rodeos, y espera el pegado.

**5. ¿Qué tarea se te come la semana?** Lo que más pesa, no lo más difícil.

**6. ¿Cuánto cobras?** Según la tabla. Si no cobra por lo que hace, que diga "no aplica" y sigue.
No insistas y no inventes un catálogo.

**7. ¿Qué herramientas usas hoy?** No la preguntes al aire. Lee las categorías una por una y deja
que conteste o salte: correo, calendario, dónde guarda archivos, dónde tiene a sus clientes o
contactos, por dónde cobra, dónde apunta sus tareas, sus redes, y dónde quedan sus juntas.

Preguntado abierto la gente se acuerda de tres herramientas y olvida cinco, y `conexiones.md`
nace incompleto. Ajusta las categorías al perfil: a un estudiante no le preguntes por dónde cobra,
pregúntale dónde entrega.

Cierra preguntando si ya tiene algún CLI instalado y autenticado: Google Workspace, GitHub,
Vercel, Cloudflare. Mucha gente llega aquí con alguno ya puesto de un curso anterior y no se da
cuenta de que eso ya es una conexión. Si no sabe qué es un CLI, no se lo expliques a fondo aquí,
déjalo en blanco y sigue.

**No corras comandos para averiguarlo.** Lo que diga la persona es lo que se anota, y se anota
como lo que es: algo dicho, no comprobado.

Todavía no se conecta nada más, solo se anota.

### Paso 2. Armar el contexto

Con todas las respuestas, escribe de un solo golpe. No vayas escribiendo archivos parciales
durante la entrevista.

- `contexto/sobre-mi.md`: preguntas 1 y 5. Quién eres, cómo trabajas, y qué es lo que más te
  pesa. Escríbelo como se lo explicarías a alguien que entra a trabajar contigo mañana.
- `contexto/sobre-el-negocio.md`: preguntas 1, 2 y 6. Qué haces, tu cliente ideal, y cómo cobras
  si cobras. Corto. Este archivo es un índice: cuando crezca y toque separar precios o clientes a
  su propio archivo, aquí queda la ruta, no el contenido repetido.
- `contexto/prioridades.md`: pregunta 3. Con la fecha de hoy arriba, porque este archivo caduca.
- `contexto/voz.md`: las muestras de la pregunta 4, pegadas tal cual, con una nota corta arriba de
  cuándo usarlas.
- `decisiones/repeticiones.md`: la pregunta 5 como primera línea, con la fecha de hoy, **abajo del
  encabezado "Mis repeticiones"**. No toques nada de arriba, que es instructivo.
- `conexiones.md`: una fila por herramienta de la pregunta 7. Las que nombró como CLI instalado
  van en **Sin comprobar**; todas las demás en **No**. Ninguna en Sí: para eso hace falta que algo
  la haya leído de verdad, y eso todavía no pasa. Borra la fila de ejemplo. Si alguien no usa
  ninguna herramienta, deja la tabla vacía antes que dejar el ejemplo, porque una fila de ejemplo
  se lee después como una conexión real.
- `CLAUDE.md`: llena los `{{...}}`, o sea el nombre y las dos líneas de qué hace.

**No crees ningún otro archivo de `contexto/`.** Nada de `procesos.md`, `equipo.md` ni
`clientes.md` el primer día. Esos aparecen cuando hay material real para llenarlos, y
`CRECIMIENTO.md` dice cuándo. La única excepción: si la respuesta de precios salió larga y
detallada, sepárala a `contexto/precios.md` y deja la ruta en `sobre-el-negocio.md`.

### Paso 3. Limpia el mapa de ruteo

El `CLAUDE.md` trae filas para archivos que crecen después. Una ruta que apunta a un archivo
inexistente es peor que no tener la ruta, porque el sistema se inventa el contenido y lo redacta
bien.

Borra del mapa las filas de lo que no creaste. `CRECIMIENTO.md` explica cuándo volver a
agregarlas, y `/apuntar` las vuelve a poner cuando llegue el momento.

### Paso 4. Cierre

Una pantalla, no un resumen largo. Tres líneas:

```
Listo. Tu sistema ya sabe quién eres, qué haces, qué te importa ahora y cómo escribes.

Ahora: pregúntame "¿en qué me conviene enfocarme esta semana?"
Después: conecta una herramienta real, la que más uses, y anótala en conexiones.md.
```

Cuando corran esa pregunta, contéstala usando solo los archivos nuevos: tres puntos, atados a lo
que dijo en la pregunta 3, escritos en el registro de su pregunta 4. Cierra preguntándole qué
parte de eso podría hacer la IA en vez de él.

## Reglas

1. **La muestra de voz se pega, no se escribe en vivo.** Sin excepción.
2. **Un solo golpe de escritura en el paso 2.**
3. **Cuatro archivos de contexto el primer día, no más.** Si te dan ganas de crear un quinto, no
   lo crees: el lugar de esa idea es `CRECIMIENTO.md`.
4. **No inventes para llenar un archivo.** Si alguien no tiene precios, no tiene equipo o no tiene
   clientes, eso se escribe tal cual o no se escribe. Un archivo con contenido inventado es peor
   que uno que no existe.
5. **No conectes nada.** `conexiones.md` queda como lista de pendientes.
6. **No generes skills ni automatizaciones aquí.** Para eso está `/descubrir-automatizaciones`.
7. **No pidas llaves ni contraseñas.** Eso es del día siguiente y va en `.env`.
8. **Cierre corto.** Tres líneas, no un menú.

## Verificación

- Primera corrida: `contexto/` queda con cuatro archivos de contenido real, no genérico, y el
  `CLAUDE.md` tiene el nombre de verdad, no los `{{...}}` sin llenar.
- Perfil no comercial: un empleado o un estudiante termina sin ningún archivo vacío y sin haber
  tenido que inventar un catálogo de precios.
- La pregunta 5 dejó su línea en `decisiones/repeticiones.md` con fecha, bajo el encabezado, y
  el resto del archivo quedó intacto.
- `conexiones.md` ya no tiene la fila de ejemplo.
- Ruteo: cada fila del mapa apunta a un archivo que existe.
- Voz: si escriben una muestra en vivo en vez de pegarla, la skill la rechaza y pide una real.
- Segunda corrida: pregunta qué cambió, no repite la entrevista, y respalda lo viejo en
  `archivados/`.
