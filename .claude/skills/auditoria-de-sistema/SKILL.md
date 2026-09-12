---
name: auditoria-de-sistema
description: Úsalo para revisar tu Sistema Operativo de IA. "¿está bien armado mi sistema?", "audita mi sistema", "revisa cómo voy", "esto ya se oxidó". Comprueba que el sistema encuentre lo que dice que encuentra, puntúa las cuatro capas sobre 100 y guarda un reporte fechado. Solo lee, no arregla nada.
---

## Qué hace

Contesta dos preguntas, en este orden:

1. ¿El sistema encuentra de verdad lo que su mapa dice que encuentra?
2. ¿Qué tan gruesa está cada capa, y qué conviene reforzar primero?

La primera importa más que la segunda. Un sistema con muchas carpetas y un mapa que apunta a
archivos que ya no existen es peor que uno chiquito y honesto, porque cuando la ruta falla el
sistema no dice "no lo encontré", se inventa la respuesta bien redactada.

Puntúa **Contexto, Conexiones, Habilidades y Autonomía sobre 25 cada una**, usando
[rubrica.md](rubrica.md). El número mide **qué tanto de este sistema está comprobado**, no qué
tan útil es ni qué porcentaje de tu trabajo hace. Una carpeta, una skill instalada, una llave de
API o una afirmación segura no son pruebas de nada.

Esto es distinto a `/descubrir-automatizaciones`: aquí se revisa si el sistema **está bien
armado**. Allá se busca **qué construir después**.

## Cuándo no correr esto

- Si lo que buscas es una automatización nueva: usa `/descubrir-automatizaciones`.
- Si acabas de instalar el sistema hace menos de una semana. Va a salir bajo y eso no te dice
  nada útil todavía. Úsalo, y córrelo el día 7.

## Etiquetas de evidencia

Todo hallazgo se marca con una de tres. Se usan en el reporte y deciden los puntos.

- **Verificado.** Lo abriste, lo corriste o lo leíste, y funcionó. Cita el archivo, la línea o la
  fecha de la corrida.
- **Dicho pero sin comprobar.** Está escrito en algún lado, pero no lo revisaste. Vale puntos de
  documentación, nunca puntos completos.
- **Falta o está roto.** No existe, apunta a la nada, o contradice a otra fuente.

Que un archivo tenga fecha reciente de modificación no prueba que su contenido esté al día.

## Ejecución

### Paso 1. Lee el mapa, no la carpeta

Empieza por el `CLAUDE.md`. Sigue sus rutas. Lee los `CLAUDE.md` de las subcarpetas que el mapa
mencione. No recorras todo el disco: la auditoría mide si el mapa sirve, y recorrer todo por tu
cuenta hace trampa contra esa medición.

Identifica de lo que leíste: qué hace esta persona, qué le importa ahora, y hasta tres flujos de
trabajo suyos que importen de verdad. Los `{{...}}` sin llenar no cuentan como respuesta.

No pidas datos de facturación a alguien cuyo trabajo no factura. Ajusta lo que buscas a lo que
esta persona hace.

### Paso 2. Las cinco pruebas de ruteo

Aquí es donde se ve si el sistema sirve. Elige cinco preguntas reales de esta persona, una por
categoría, y contéstalas **siguiendo solo las rutas declaradas**:

1. ¿Qué hace esta persona, para quién, y qué le importa ahora?
2. ¿Cuánto cobra por algo concreto, o cómo se mide su trabajo?
3. ¿Cuál es el estado y el siguiente paso de un proyecto activo?
4. ¿Cómo escribe, y dónde están las muestras?
5. ¿Qué herramienta está conectada y cómo se usa?

Si una categoría no aplica, di por qué y sustitúyela por otra necesidad real. Siempre cinco.

Por cada una anota: la pregunta, la ruta que seguiste, el archivo donde estaba la respuesta, y
si la encontraste **por la ruta**, **solo buscando por tu cuenta**, o **no la encontraste**.

Encontrarla buscando por tu cuenta no cuenta como que la ruta funciona. Ese es el hallazgo, no
el rescate.

### Paso 3. Los cuatro modos de oxidación

Un sistema no se rompe de golpe, se oxida. Revisa los cuatro, con ejemplos concretos:

- **Rutas muertas.** Filas del mapa que apuntan a archivos o carpetas que ya no existen.
- **Índices que mienten.** El mapa o un `README` dice una cosa y la carpeta tiene otra: proyectos
  sin listar, conteos viejos, nombres que cambiaron.
- **Datos congelados.** Un número, una prioridad o un estado que alguien escribió una vez y nadie
  volvió a tocar. Compara contra la fecha de hoy. Una prioridad de hace cuatro meses presentada
  como actual es un dato falso, no un dato viejo.
- **Duplicados.** El mismo hecho escrito en dos archivos, con dos versiones. Di cuál debería
  ganar y cuál debería apuntar al otro.

### Paso 4. Revisa las cuatro capas

**Contexto.** ¿Puede una sesión nueva entender quién es esta persona y retomar su trabajo sin
depender de esta conversación? Revisa que lo de `contexto/` sea específico y no genérico, y que
los archivos que se apuntan entre sí resuelvan.

**Conexiones.** Por cada herramienta de `conexiones.md`: para qué sirve, por qué vía está
conectada, y si hay evidencia de una lectura exitosa reciente. Las marcadas **Sin comprobar** no
dan puntos de conexión, dan puntos de documentación: alguien dijo que funciona y nadie lo probó.
Si hay varias así, el primer arreglo del reporte es comprobar una, que cuesta un minuto. Una llave en `.env` o un MCP
configurado no prueba que la conexión funcione. Usa comprobaciones de solo lectura, cortas y
seguras. No imprimas llaves ni datos privados en bloque, y no corras un script que no hayas
revisado.

**Habilidades.** Hasta tres flujos atados a lo que importa ahora, no los más vistosos. Por cada
uno: qué lo dispara, qué necesita, a dónde va el resultado, si hay una salida real que se pueda
ver, y si se ha usado más de una vez. Las tres skills base de este kit no cuentan aquí, son del
sistema. La cantidad de skills no da puntos.

**Autonomía.** Disparadores realmente activos y su evidencia de corridas. Empieza por `corridas/`:
si hay automatizaciones montadas y esa carpeta está vacía, o su última línea es de hace días,
ese es el hallazgo. Por cada disparador: dónde corre, qué lo dispara, qué produce, cuándo le
tocaba correr por última vez, si corrió, y qué pasa cuando falla. Una skill que se llama `diario-algo` no es autonomía. Un ritual que la persona
hace a mano sí cuenta, pero se marca como manual y tiene tope.

**Esta capa se puntúa como cualquier otra.** Si no hay nada corriendo solo, sale bajo, y eso es
información útil, no una falla del reporte.

### Paso 5. Puntúa

Lee [rubrica.md](rubrica.md) completa. Asigna los 20 criterios, aplica los topes, y muestra los
cuatro subtotales, la suma, qué tope aplicó y por qué, el resultado final y la etapa.

Falta de evidencia no da puntos, pero distingue **sin comprobar** de **roto**. No inventes fallas
en un sistema sano y no infles el número para que alguien se sienta bien. Un puntaje inflado
vuelve inútil la auditoría del mes que viene.

### Paso 6. Reporta

Corto. Que se lea en menos de un minuto.

**Abre con la etapa y las capas, no con el total.** El número completo va hasta abajo. El orden
importa: si lo primero que alguien ve es su calificación, se queda discutiendo el número. Si lo
primero que ve son las cuatro barras, mira dónde está flaco, que es para lo que sirve esto.

```
Tu sistema está en: {etapa}

Contexto     {barra}  {n}/25
Conexiones   {barra}  {n}/25
Habilidades  {barra}  {n}/25
Autonomía    {barra}  {n}/25

La más flaca es {capa}, y es la que más te está costando hoy porque {una línea}.

Ruteo: {n} de 5 preguntas se contestaron por la ruta declarada.
{una línea por cada prueba que falló}

Oxidación: {los hallazgos concretos, o "nada que reportar"}

Lo que está sólido: {una o dos líneas}

Lo que conviene resolver primero:
1. {arreglo}: {qué lo prueba terminado}
2. {arreglo}: {qué lo prueba terminado}
3. {arreglo}: {qué lo prueba terminado}

Comparado con la auditoría anterior: {qué mejoró, qué empeoró, o "primera corrida"}

{total}/100. {Topes aplicados, cuál y por qué, o "sin topes"}
```

Ordena los arreglos por cuánto afectan el trabajo real. Una respuesta equivocada o una fuente
inalcanzable van antes que el orden de las carpetas. Máximo tres, y si el sistema está sano di
que está sano en vez de inventar el tercero.

Cierra ofreciendo el siguiente paso, según qué tipo de hueco salió más arriba:

- Ruta muerta o algo que el mapa no encuentra: `/apuntar`, con el archivo y para qué sirve.
- Falta una automatización o sobra trabajo manual: `/descubrir-automatizaciones`, con el hueco.
- Contexto flaco o genérico: `/comenzar`, diciendo qué sección actualizar.

### Paso 7. Guarda el reporte

Escribe el reporte completo en `auditorias/auditoria-{AAAA-MM-DD}.md` y confirma que quedó
escrito antes de decir que lo guardaste. Crea la carpeta si no existe. No borres reportes viejos:
la comparación del paso 6 depende de ellos.

Este es el único archivo que esta skill puede escribir.

## Reglas

1. **Solo lee.** No arregla rutas, no mueve archivos, no cambia configuraciones, no manda nada.
   Lo único que escribe es su propio reporte.
2. **Ninguna capa se salta.** Autonomía se puntúa aunque esté en cero.
3. **Sé honesto, no generoso.** Un sistema recién instalado tiene que salir en "Sin probar".
   Si un clon recién hecho saca 70, la rúbrica se está aplicando mal.
4. **Sin jerga.** Nada de "stage 0" ni niveles de madurez con nombre en inglés. Capas y qué tan
   gruesas están.
5. **Tres arreglos como máximo**, cada uno con qué lo daría por terminado.
6. **No cites un dato del sistema como cierto solo porque está escrito.** Esta skill mide
   evidencia, y eso vale también para lo que ella misma reporta.

## Verificación

- Kit recién clonado, sin `/comenzar`: tiene que salir en "Sin probar", con
  Contexto muy bajo y Autonomía en cero.
- Sistema con `contexto/` lleno pero nada conectado ni corriendo: el tope de 49 tiene que
  aplicar, y el reporte tiene que decir cuál tope y por qué.
- Una fila del mapa apuntando a un archivo borrado: tiene que salir en oxidación como ruta
  muerta, con el nombre del archivo.
- Una prueba de ruteo que solo se resuelve buscando por fuera: se reporta como fallida, no como
  encontrada.
- Segunda corrida una semana después: el reporte compara contra el anterior y los dos archivos
  siguen en `auditorias/`.
