# Referencias

Material que consultas, no información sobre ti.

Esa es la línea que separa esta carpeta de `contexto/`. En `contexto/` va lo que el sistema sabe
de ti: quién eres, qué haces, qué te importa ahora. Aquí va lo que el sistema necesita **abrir
para hacer algo bien**: cómo se usa una herramienta, cómo se arma un documento tuyo, qué dice un
método que sigues.

Si te preguntas dónde va algo: si describe a tu negocio, es contexto. Si es un manual, va aquí.

## Qué termina viviendo aquí

**Herramientas conectadas.** Un archivo por cada una, con cómo se usa. Es lo primero que se llena,
porque lo vas a necesitar el día que conectes algo. `gmail.md`, `notion.md`, `stripe.md`.

**Formatos de lo que produces.** Cómo se ve una cotización tuya, qué lleva un reporte, la
estructura de tus propuestas. Si una habilidad genera documentos, su formato vive aquí y la
habilidad apunta.

**Métodos y guías que sigues.** Un marco de trabajo, un checklist de calidad, los criterios con
los que revisas algo antes de mandarlo. Lo que hoy tienes en la cabeza y le explicas a la gente
nueva.

**Datos de consulta que no cambian.** Una tabla de medidas, códigos, categorías, lo que aplique a
lo tuyo.

No hay lista cerrada. Si es algo que abres para consultar y no es información sobre ti, va aquí.

## Cómo se escribe uno de herramienta

La primera vez que conectas algo, pídele a Claude que investigue la documentación y escriba el
archivo. Después de eso ya no hace falta volver a buscar en internet, que es lento y caro. Cuando
algo falle, actualiza el archivo con lo que aprendiste ahí mismo, para que no te vuelva a pasar.

Adentro: para qué la usas tú, no para qué sirve en general. Cómo se conecta y dónde vive esa
conexión. Qué se puede pedir, con un ejemplo que ya te haya funcionado. Qué falla seguido. Y los
límites que importen, como cuántas llamadas o cada cuánto expira la sesión.

## Lo que nunca va aquí

Ninguna llave, ningún token, ninguna contraseña. Eso vive en `.env` y nada más ahí. Un archivo de
referencia dice "la llave está en `.env` como `NOMBRE_API_KEY`", nunca el valor.

Esta carpeta se sube a tu repositorio. `.env` no.

## Cuando crezca

Cuando pases de ocho o diez archivos, agrupa por carpeta: `referencias/herramientas/`,
`referencias/formatos/`. Y actualiza la fila del `CLAUDE.md`, o corre `/apuntar` y lo hace por ti.
