# Sistema Operativo de IA de {{Tu nombre}}

{{Una o dos líneas: quién eres y qué haces. Lo llena `/comenzar`.}}

## Hasta dónde manda este archivo

Manda en todo el sistema. Una carpeta puede tener su propio `CLAUDE.md` y ese manda adentro de
ella; este sigue vigente para el resto.

Si tienes un proyecto que vive fuera de esta carpeta, no lo copies aquí. Agrega su fila en el
mapa de abajo con la ruta a donde vive de verdad, o usa `/apuntar` y lo hace por ti.

## Mapa de ruteo

Empata la necesidad con la ruta y ve directo. La tercera columna es la que evita que el
sistema rompa algo.

| Necesidad | Ruta | Regla |
|---|---|---|
| Mis respuestas de la entrevista inicial | `entrevista.md` | La fuente de `contexto/`. Si cambias algo aquí, vuelve a correr `/comenzar` |
| Quién soy, cómo trabajo, qué me pesa | `contexto/sobre-mi.md` | Fuente de verdad de identidad |
| Qué hago, para quién, cuánto cobro | `contexto/sobre-el-negocio.md` | Es un índice corto: cuando algo se separe a su propio archivo, aquí queda la ruta, no el contenido repetido. Nunca inventes un precio que no esté aquí |
| En qué estoy ahora | `contexto/prioridades.md` | Lleva fecha. Si tiene más de un mes sin tocarse, avísame antes de usarlo |
| Cómo escribo | `contexto/voz.md` | Cárgalo antes de cualquier texto que se publique o se mande |
| Qué herramientas alcanza el sistema | `conexiones.md` | Se lee antes de intentar cualquier conexión. Las llaves están en `.env`, nunca aquí |
| Cómo se usa algo: una herramienta, un formato, un método | `referencias/` | Material que se consulta, no información sobre mí. Sin llaves adentro |
| Mis proyectos y entregas | `proyectos/` | Lee `proyectos/README.md` antes de crear una carpeta nueva |
| Qué decidí y por qué | `decisiones/registro.md` | Solo se agrega. Lo escrito no se reescribe |
| Qué estoy repitiendo a mano | `decisiones/repeticiones.md` | Una línea por vez. La lee `/descubrir-automatizaciones` |
| Qué pasó cuando algo corrió solo | `corridas/` | Una línea por corrida. Si algo falla, aquí es donde se ve |
| Reportes de auditoría | `auditorias/` | Fechados. No borres los viejos, la comparación depende de ellos |
| Cosas viejas | `archivados/` | No se borra, se mueve aquí |
| Qué agregar cuando el sistema crezca | `CRECIMIENTO.md` | Léelo antes de inventar una carpeta nueva |

Las filas de `contexto/` todavía no tienen archivo detrás: las llena `/comenzar`. Al terminar,
borra las que no apliquen a tu caso. Una fila que apunta a un archivo que no existe es peor que
no tener la fila, porque el sistema se inventa lo que debería haber ahí y lo redacta bien.

Este mapa se queda corto a propósito. `contexto/` crece con el uso y cada archivo nuevo lleva su
fila: `precios.md` cuando ya no quepa adentro de `sobre-el-negocio.md`, `procesos.md` cuando
mapees uno de verdad, `clientes.md` cuando pases de tres o cuatro. `CRECIMIENTO.md` dice cuándo, y
`/apuntar` pone la fila.

## Mis comandos

- `/comenzar`: arma el contexto la primera vez. Vuelve a correrlo cuando algo cambie a fondo.
- `/auditoria-de-sistema`: revisa si el sistema encuentra lo que dice que encuentra, y qué tan
  gruesa está cada capa. Solo lee, salvo el reporte que guarda.
- `/descubrir-automatizaciones`: encuentra qué automatizar después. Puede terminar en "no hace
  falta nada", y eso también es un resultado.
- `/apuntar`: mete algo al mapa de arriba. Una carpeta nueva, un archivo, un proyecto que vive
  fuera del sistema. Agrega la fila y comprueba que la ruta sirva.

## Precedencia de fuentes

Cuando dos archivos digan cosas distintas, este es el orden. No dupliques un dato entre ellos.

1. **Este archivo** gobierna comportamiento y ruteo. Cambia poco.
2. **`contexto/`** es la verdad de quién soy y cómo trabajo. Gana cualquier empate.
3. **`decisiones/registro.md`** es historia, no estado. Si contradice al estado actual, gana el estado
   y la contradicción se anota.

## Reglas duras

- **Si algo no está en el contexto, dilo.** No inventes un precio, una fecha, un dato de un
  cliente ni una cifra. Preferible "no lo tengo" que una respuesta bien redactada y falsa.
- **Ningún número que cambie solo se escribe adentro de un archivo de contexto.** El archivo dice
  de dónde leerlo, no cuál es. Si lo copias, en dos semanas te miente con cara de seguridad.
- **`.env` no se imprime, no se cita, no se copia a otro archivo.**
- **Una ruta muerta es peor que ninguna ruta.** Si mueves o borras algo que está en el mapa de
  arriba, actualiza la fila en la misma sesión.

## Cadencia

- Revisión corta cada semana: ¿el mapa sigue apuntando a donde están las cosas?
- `/auditoria-de-sistema` una vez al mes, o después de cualquier reorganización grande.
- `/descubrir-automatizaciones` cuando `decisiones/repeticiones.md` tenga tres o cuatro líneas
  del mismo tipo.

## Cómo trabajar conmigo

{{Ajusta esto a tu gusto. Estas son las que casi siempre sirven.}}

- Directo y sin relleno. Si la respuesta son dos líneas, que sean dos líneas.
- Cuando tome una decisión, sugiéreme anotarla en `decisiones/registro.md`.
- Cuando notes que te pedí lo mismo por tercera vez, agrega la línea a
  `decisiones/repeticiones.md` y sigue con lo que estábamos haciendo. No me interrumpas para
  proponerme automatizarlo.
- Antes de asumir que voy a hacer algo a mano, pregúntame qué parte puede hacer la IA.
