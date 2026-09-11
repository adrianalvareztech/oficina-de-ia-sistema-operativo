# Qué agregar cuando haga falta

El kit viene ligero a propósito. Lo vas a ir superando con el uso, y esta guía dice qué agregar y
cuándo. No agregues nada de aquí "por si acaso". Una carpeta vacía es peor que no tenerla: el
sistema la ve, cree que ahí hay algo, y no encuentra nada.

## Lo que ya trae y no conviene quitar

| Dónde | Para qué |
|---|---|
| `CLAUDE.md` | El mapa. Dónde está cada cosa y qué regla aplica |
| `contexto/` | Quién eres, qué haces, cuánto cobras, cómo escribes |
| `conexiones.md` | Qué herramientas alcanza el sistema |
| `referencias/` | Material que consultas: herramientas, formatos, métodos |
| `proyectos/` | Tus proyectos y entregas |
| `decisiones/registro.md` | Qué decidiste y por qué. Solo se agrega |
| `decisiones/repeticiones.md` | Lo que sigues haciendo a mano |
| `corridas/` | Qué pasó cada vez que algo corrió solo |
| `auditorias/` | Reportes fechados. Sin los viejos no hay comparación |
| `archivados/` | Cosas viejas. No se borran, se mueven |

## Archivos de contexto que aparecen después

`/comenzar` crea lo básico. Estos llegan cuando el sistema ya lleva semanas de uso, y cada uno
tiene su señal:

- **`contexto/precios.md`** cuando la sección de precios de `sobre-el-negocio.md` ya no se lee de
  un jalón, o cuando tengas varios paquetes con condiciones distintas.
- **`contexto/procesos.md`** cuando mapees un proceso de verdad, que normalmente pasa la primera
  vez que construyes una habilidad. Antes de eso sale vago y no sirve: escribir "cómo entra un
  cliente" en abstracto produce un archivo que nadie usa.
- **`contexto/clientes.md`** cuando pasas de tres o cuatro y ya no caben en `sobre-el-negocio.md`.
- **`contexto/equipo.md`** cuando dejas de trabajar solo, o cuando el sistema tenga que saber
  quién decide qué.
- **`contexto/{lo que sea}.md`** cuando notes que le explicas lo mismo por tercera vez. Esa es la
  señal, no un plan.

Cada archivo nuevo lleva su fila en el mapa del `CLAUDE.md`. Un archivo que existe pero no está
en el mapa es un archivo que el sistema no va a abrir.

## Cuándo partir un archivo en carpeta

Cuando ya no lo lees de un jalón. Si `clientes.md` creció a doscientas líneas, se vuelve
`clientes/` con un archivo por cliente, y `sobre-el-negocio.md` apunta a la carpeta en vez de al
archivo.

La regla de fondo es la misma en todo el sistema: los archivos apuntan, no contienen. Si el
sistema tiene que leer trescientas líneas para contestarte cuánto cobras, la arquitectura está
mal, no el prompt.

## Autonomía

No viene armada desde el día 1 a propósito. Necesita las tres capas de abajo funcionando, y
saltarse ese orden es la razón número uno por la que la gente termina con automatizaciones que
no puede arreglar.

Cuando `decisiones/repeticiones.md` junte tres o cuatro líneas del mismo tipo, corre
`/descubrir-automatizaciones`.

## Un proyecto que ya no cabe adentro

Créalo aparte en tu computadora y agrega su fila al mapa del `CLAUDE.md` con la ruta a donde
vive. No hace falta repositorio nuevo. Ver `proyectos/README.md`.

## Segundo cerebro

Una wiki aparte que se acumula con llamadas, mensajes y lecciones. No es parte de este kit. Solo
tiene sentido cuando ya generas suficiente información como para justificarla, y armarla antes es
trabajo que nadie va a leer.

## Cómo saber que ya es momento

Si tienes que pensarlo, todavía no. La señal es concreta: algo no cabe donde vive, o lo repites
tanto que duele no tenerlo resuelto.
