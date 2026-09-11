---
name: descubrir-automatizaciones
description: Úsalo cuando quieras encontrar qué automatizar después. "qué debería automatizar", "en qué me conviene enfocarme", "ya hice esto muchas veces a mano". Lee lo que llevas repitiendo, elige un candidato, decide si de verdad vale la pena, y termina en una ficha lista para construir. Puede terminar en "no hace falta nada", y eso también es un resultado.
---

## Qué hace

Encuentra en qué vale la pena poner atención después, lo delimita, y si de verdad hace falta
construir algo, termina en una **ficha clara**. Nunca construye aquí: deja el pedido listo para
que lo construyas en la siguiente conversación.

Tres fases: detectar, decidir, entregar la ficha. No te saltes fases aunque la persona llegue
con una idea clara. Sobre todo no te saltes la segunda, que es donde se filtra lo que no vale la
pena.

Esto es distinto a `/auditoria-de-sistema`: allá se revisa si el sistema está bien armado, aquí
se busca qué construir después. Si el sistema está desordenado, corre la auditoría primero.

## Cuándo no correr esto

- Si lo que quieres es revisar la salud del sistema completo: `/auditoria-de-sistema`.
- Si `decisiones/repeticiones.md` no tiene nada y a la persona tampoco se le ocurre nada
  repetitivo al preguntarle. Ahí no hay material, y forzar la conversación termina en una ficha
  inventada. Que el sistema sea nuevo no basta para descartar: si contestó la pregunta 5 de
  `/comenzar`, ya hay al menos una línea con la que trabajar.

## Ejecución

### Antes de preguntar nada

Lee, en este orden:

- `decisiones/repeticiones.md`: lo que ya quedó anotado como repetido. Cuenta **solo** las líneas
  que están bajo el encabezado "Mis repeticiones". Todo lo de arriba es instructivo y no pasó
  nunca: contarlo sería inventarle historia a la persona. Agrupa por tipo y cuenta. Esto es la
  mitad del trabajo: si algo aparece tres o cuatro veces, ya tienes candidato sin preguntar.
- `contexto/prioridades.md` y `contexto/sobre-mi.md`: qué le importa ahora y qué odia hacer.
- `decisiones/registro.md`: qué ya se decidió antes, para no volver a proponerlo.
- `conexiones.md`: qué alcanza hoy el sistema. Un candidato que necesita algo no conectado es
  un candidato con un paso previo, dilo.
- El último reporte de `auditorias/` si existe. Si la auditoría dejó un hueco marcado como
  prioritario, ese entra como primer candidato.

Cuánto peso darle a lo que encuentres, según cuántas líneas del mismo tipo haya:

- **Ninguna:** dilo y sigue con las preguntas. No es un error, es que todavía no se ha anotado nada.
- **Una o dos:** es una pista, no un candidato. Menciónala y pregunta si ha seguido pasando.
  Contar un patrón con una sola línea es inventarle historia a la persona, igual que contar las
  líneas de ejemplo.
- **Tres o más:** ya es un candidato. Entra a la fase 1 con eso arriba, sin preguntar de cero.

### Fase 1. Detectar

En conversación, no como formulario. Empieza mostrando lo que encontraste en `repeticiones.md`,
y luego pregunta, en este orden, sin avanzar hasta tener respuesta real:

1. "¿Qué hiciste tres o más veces esta semana que se sintió repetitivo?"
2. "¿Dónde se te fue el tiempo esta semana?"
3. "¿Hay algo que le pasarías a alguien nuevo si lo tuvieras disponible ahora mismo?"

Si llega con una idea concreta, anótala como candidata y haz las tres preguntas de todas formas.
A veces sale algo de más impacto que lo que traía en mente.

Cierra la fase con uno a tres candidatos, cada uno con una línea de por qué importa. Si sale más
de uno, pide que elija cuál delimitar primero. Un candidato a la vez.

### Fase 2. Decidir si vale la pena

Tres preguntas, en este orden.

**1. ¿Qué pasa si dejas de hacer esto?**

Si la respuesta es que no cambia nada, la skill termina aquí. No automatices basura, la vuelves
basura más rápida. Anótalo en `decisiones/registro.md` como una decisión tomada, no como un fracaso, y
cierra bien: quitarse una tarea de encima es mejor resultado que automatizarla.

**2. ¿Qué número mueve?**

Uno de tres: consigues más clientes, cada cliente vale más, o gastas menos. Si la persona no
cobra por lo que hace, el equivalente es: llegas a más gente, cada entrega vale más, o te toma
menos tiempo.

Si no mueve ninguno, pregunta directamente por qué lo está considerando antes de seguir. "Está
cool" no es un caso.

**3. ¿Esto necesita que tú decidas algo en el momento, o solo necesita ejecutarse?**

- Si necesita tu criterio en el momento: es una **habilidad**. Se activa cuando la llamas.
- Si es mecánico y repetitivo, sin decisión de por medio: es candidata a **autonomía**. Corre
  sola.

Aunque sea candidata a autonomía, el nivel al que se construye es otra cosa. Cuatro escalones:

| Escalón | Qué pasa | Qué necesita |
|---|---|---|
| Manual | Lo haces tú | Nada |
| Asistido | Se lo pides y lo hace contigo | Contexto y conexiones |
| Programado | Corre a una hora y te deja el resultado | Una habilidad que ya funciona |
| Autónomo | Arranca solo cuando pasa algo | Las cuatro capas |

**El escalón por default es el más bajo que resuelva el problema.** Casi todos los que fallan se
saltaron los dos primeros. Si alguien pide autónomo en la primera construcción, empújalo a
programado, con la salida en borrador, y que lo mire una semana antes de subirle.

### Fase 3. La ficha

Nunca escribas código aquí. El resultado es una ficha corta, con la forma de siempre: entrada,
proceso, salida.

```
## Pedido. {fecha}

**Qué se necesita:** {una o dos líneas}

Entrada
- Qué lo dispara: {el reloj a una hora / un evento adentro del sistema / una señal de afuera / tú}
- De dónde salen los datos: {fuente, y si ya está en conexiones.md}

Proceso
- Qué se hace con esos datos: {en una línea}
- Dónde se decide algo: {o "no se decide nada, es mecánico"}

Salida
- A dónde va el resultado: {archivo, correo, mensaje, carpeta}
- Dónde queda el registro: {`corridas/{nombre}.log`, una línea por corrida}
- Cómo avisa si falla: {obligatorio si va a correr sola}

**Tipo:** habilidad o autonomía
**Escalón:** manual / asistido / programado / autónomo
**Número que mueve:** {uno de los tres}
```

Si alguna de esas piezas no se puede llenar, no cierres la ficha. Si no se lo puedes explicar a
una persona, no se lo puedes explicar al sistema. Mándalo a escribirlo en papel y que regrese.

Y si el escalón es programado o autónomo, **las dos últimas líneas son obligatorias**. Una
automatización que falla en silencio es peor que no tenerla: sigues creyendo que el trabajo se
está haciendo. El registro en `corridas/` sirve para revisar después; el aviso sirve para enterarte
el mismo día. Hacen falta los dos, y no son lo mismo.

Guarda la ficha en `decisiones/registro.md` con la fecha. Luego cierra:

"Esto ya está lo suficientemente claro para construirlo. Ábreme una conversación nueva, pégame la
ficha y dime constrúyeme esto."

### Después de la ficha

Si en `decisiones/repeticiones.md` había líneas que este pedido resuelve, márcalas con la fecha y
un apunte de a qué ficha fueron. No las borres.

## Reglas

1. **Lee `repeticiones.md` antes de preguntar nada.** Preguntar de cero cuando ya hay un registro
   es hacerle repetir a la persona lo que su sistema ya sabía.
2. **Nunca te saltes la fase 2**, ni con una idea que llegue ya definida.
3. **"No hace falta nada" es un buen resultado.** Anótalo en el log igual.
4. **Un candidato a la vez.**
5. **El escalón más bajo que resuelva.** Empuja hacia abajo, no hacia arriba.
6. **Todo pedido se ata a un número.** Si no se puede, no se cierra la ficha.
7. **Esta skill nunca construye.** Termina siempre en la ficha, nunca en código, ni en una skill
   nueva a medias.
8. **Sin aviso de falla no hay ficha de autonomía.**

## Verificación

- Con `repeticiones.md` lleno: los candidatos de la fase 1 salen de ahí, no de las preguntas
  genéricas.
- Candidato donde "qué pasa si dejas de hacerlo" da "nada": cierra ahí, sin ficha, y se anota en
  el log como decisión.
- Alguien pide algo autónomo en su primera construcción: la skill lo baja a programado y explica
  por qué.
- Ficha cerrada: las siete piezas llenas, ninguna genérica, y la de aviso de falla presente si
  corre sola.
