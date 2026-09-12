# Rúbrica de las cuatro capas

Cinco criterios por capa, cinco puntos cada uno. Veinte criterios, cien puntos.

## Cómo se puntúa

Usa **solo 0, 1, 3 o 5**. Elige el escalón más alto que la evidencia sostenga completo. Si un
escalón pide dos cosas, hacen falta las dos.

- **0**: no existe, está roto, o ni siquiera llega al escalón de 1.
- **1**: está documentado. Alguien lo escribió. No se comprobó.
- **3**: se comprobó una vez, en una muestra.
- **5**: se comprobó en todo lo que aplica, y sigue vigente.

Nunca pongas 2 ni 4. Nunca empieces en 5 y vayas restando. Nunca des puntos por infraestructura
que esta persona no necesita, ni cambies evidencia que falta por optimismo.

Si no se puede identificar ningún flujo o ninguna conexión aplicable, esos criterios van en 0,
no se dan por cumplidos por ausencia.

## Contexto (25)

| # | Criterio | 1 punto | 3 puntos | 5 puntos |
|---|---|---|---|---|
| C1 | Identidad real | Hay identidad y propósito, sin `{{...}}` a medio llenar | Identidad, para quién trabaja y qué le importa ahora tienen archivo concreto | Además no se contradicen entre archivos, y lo que importa ahora está dicho con algo concreto, no "crecer" |
| C2 | Ruteo | El mapa da al menos una ruta que sirve | 3 de las 5 pruebas se contestan por la ruta declarada | Las 5 se contestan por la ruta, y comparar el mapa contra las carpetas no revela omisiones importantes |
| C3 | Frescura | Los datos que cambian dicen de cuándo son | Los datos que cambian tienen regla de actualización, o están marcados como históricos con ruta a la fuente actual | Todo lo que se presenta como actual sigue vigente, sin prioridades ni cifras de hace meses |
| C4 | Autoridad | Hay al menos una fuente declarada como la buena | Se distingue lo estable de lo que cambia, y lo que se afirma tiene de dónde salió | No quedan duplicados sin resolver ni contradicciones entre dos archivos |
| C5 | Continuidad | Existe algún registro de una decisión o del estado de algo | Un proyecto activo tiene entregable actual, por qué se decidió así, y siguiente paso, todo alcanzable desde su entrada | Un segundo proyecto o tema se puede retomar igual |

Un sistema de una sola persona con un solo proyecto puede sacar C5 completo si el segundo hilo
es una decisión anterior distinta dentro de ese mismo proyecto.

## Conexiones (25)

Antes de puntuar, lista qué dominios aplican a esta persona: dinero, clientes o audiencia,
calendario, comunicación, tareas, archivos y conocimiento. Marca los que no apliquen y di por
qué. No des puntos por conectar herramientas que no le sirven a nadie aquí.

| # | Criterio | 1 punto | 3 puntos | 5 puntos |
|---|---|---|---|---|
| N1 | Cobertura | Un dominio aplicable tiene lectura exitosa, pero menos de la mitad la tienen | La mitad o más, pero no todos | Todos los dominios aplicables tienen lectura exitosa reciente |
| N2 | Sirve para algo | Está escrito qué se le va a preguntar | Una pregunta real devuelve el dato correcto, con su fecha y su fuente | Dos preguntas distintas devuelven resultados suficientes |
| N3 | Se puede repetir | Una conexión tiene documentado por dónde entra y para qué | Todos los dominios tienen su archivo en `referencias/` o su estado explícito, y "Sin comprobar" se distingue de "No" | Alguien más puede reproducir el acceso siguiendo solo lo escrito, sin nada de esta conversación |
| N4 | Permisos | Está escrito qué puede leer y qué puede escribir | Si hace falta escribir en algún lado, hay una escritura autorizada que salió bien; o el alcance de solo lectura está documentado y comprobado | Lo comprobado respeta esos límites y hay protección contra duplicar una acción |
| N5 | Se nota cuando falla | Está escrito cada cuánto debería refrescarse | Lo que se leyó está dentro de ese plazo, y cuando falla se ve, no se sustituye con datos viejos sin avisar | Además hay evidencia de qué pasa cuando la sesión expira o el dato se queda viejo |

Un archivo local o una exportación cuentan como conexión si son la fuente real y están al día.
No hay puntos extra por usar MCP en vez de API, ni por tener muchas conexiones.

## Habilidades (25)

Elige hasta tres flujos atados a lo que importa ahora, y elígelos **antes** de mirar sus
resultados. Si solo existe uno, evalúa ese con honestidad. Si algo importante necesita un flujo
que no existe, ese hueco se queda en la muestra.

| # | Criterio | 1 punto | 3 puntos | 5 puntos |
|---|---|---|---|---|
| P1 | Se dispara | Hay un flujo con disparador claro atado a una necesidad dicha | Uno se invocó con éxito con las entradas que le tocan | Todos los de la muestra tienen evidencia de invocación, sin traslape entre disparadores |
| P2 | El resultado sirve | Hay un ejemplo de salida y algún criterio de qué es aceptable | Una salida real se revisó contra ese criterio | Todas las salidas de la muestra se revisaron contra su criterio, ninguna se dio por buena sola |
| P3 | Falla bien | Está escrito qué pasa si falta una entrada | Se probó al menos un caso de entrada faltante o fuente vieja y se manejó bien | Cada flujo de la muestra tiene un caso límite probado y respeta sus límites de permisos |
| P4 | Se puede usar de nuevo | Están documentados los archivos que necesita y cómo se invoca | Las rutas internas de la skill resuelven | Una sesión limpia lo reproduce sin nada de la conversación anterior |
| P5 | Se usa de verdad | Hay un uso real con fecha | Uno tiene dos usos reales distintos con sus salidas | Todos los de la muestra tienen uso repetido, y las correcciones quedaron dentro de la skill |

La cantidad de skills y la fecha de los archivos valen cero por sí solas. Un script simple puede
puntuar igual que un agente complejo. Una skill recién creada no prueba uso repetido corriéndola
dos veces seguidas para la foto.

## Autonomía (25)

Usa los horarios reales y cuándo le tocaba correr. Tener la configuración no es haber corrido.

| # | Criterio | 1 punto | 3 puntos | 5 puntos |
|---|---|---|---|---|
| A1 | Disparador real | Existe un ritual humano explícito, o hay un disparador configurado | Un disparador activo tiene dónde corre y qué produce | Ese disparador ya corrió en el entorno donde debe correr, sin nadie mirando |
| A2 | Corridas | Hay una corrida manual con fecha, o un intento automático fallido registrado | Una corrida automática que tocaba se completó con su salida | Dos corridas automáticas distintas se completaron, sin corridas perdidas sin explicar |
| A3 | Se ve qué pasó | Está escrito dónde queda el registro y cómo avisa si falla | Hay corridas en `corridas/` con fecha y resultado, y una vía de aviso comprobada | Una falla real o simulada llegó al aviso, y se recuperó |
| A4 | Se puede parar | Está escrito cómo se apaga y quién es el dueño | La configuración confirma eso y evita que corra dos veces encimada | Se probó parar y recuperar sin efectos secundarios |
| A5 | Se mantiene | Está definido cada cuánto se revisa | Una revisión completada arregló algo real, o confirmó que no hacía falta | Dos ciclos de revisión registrados, con seguimiento de lo que se arregló |

**Si no hay ningún disparador automático comprobado, esta capa tiene tope de 10 de 25**, aunque
la disciplina manual sea buena. Una automatización recién configurada tiene que esperar a que le
toque correr: dos corridas de prueba seguidas no son dos corridas.

## Topes

1. Suma los criterios dentro de cada capa.
2. Si las cinco pruebas de ruteo no recuperan ni qué hace esta persona ni dónde está lo que le
   importa ahora, **Contexto tiene tope de 10**. Muestra el subtotal crudo y el tope.
3. Aplica el tope de 10 en Autonomía si no hay disparador automático comprobado.
4. Suma las cuatro capas.
5. Aplica el tope total más bajo que corresponda:
   - Alguna capa por debajo de 10 → total con tope de **49**.
   - Alguna capa por debajo de 15, o menos de dos corridas automáticas exitosas → tope de **69**.
   - Alguna capa por debajo de 20, o un conflicto de rutas o de fuentes sin resolver → tope
     de **84**.
6. Resultado final = el menor entre la suma y el tope. Di qué tope aplicó y por qué.

| Resultado | Etapa |
|---|---|
| 0 a 24 | Sin probar |
| 25 a 49 | Cimientos |
| 50 a 69 | Funciona con huecos |
| 70 a 84 | Confiable en lo que se revisó |
| 85 a 100 | Mantenido y comprobado |

Nunca digas que un sistema es autónomo, seguro o está completo. Di qué se revisó. Lo que no se
comprobó es un hueco de verificación, no una prueba de que algo esté roto.

## Casos de calibración

Si tu resultado no coincide con estos, estás aplicando mal la rúbrica.

- Kit recién clonado, con carpetas y skills pero sin `/comenzar`: **Sin probar**.
  Las carpetas no dan puntos.
- **Justo después de `/comenzar`, con el contexto bien llenado y nada más: entre 15 y 18, o sea
  Sin probar.** Medido en una corrida real, no estimado. Contexto llega a 14 de 25 y ahí se
  queda, porque continuidad vale 0 mientras no exista un proyecto que se pueda retomar. Si te
  sale más de 20 en un sistema de un día, estás dando puntos por archivos que existen en vez de
  por evidencia.
- El número sube capa por capa, no de golpe. Con el primer proyecto y una decisión registrada
  ronda 22. Con una herramienta conectada de verdad, 30. Con una habilidad usada tres veces, 42.
  Con algo programado en borrador y sin corridas cumplidas todavía, 46 y ahí se topa: para pasar
  de 49 hacen falta dos corridas automáticas que de verdad tocaban.
- Contexto, Conexiones y Habilidades excelentes, autonomía solo manual: suma cruda 85, resultado
  69. Sin corridas automáticas comprobadas, el tope de 69 aplica.
- Un dato de hace cuatro meses presentado como actual baja C3 y C4 y bloquea cualquier resultado
  por encima de 84 hasta que se resuelva.
- Una automatización mensual con dos corridas cumplidas puede sacar el punto de repetición. Una
  diaria configurada ayer, que nunca ha corrido, no.
