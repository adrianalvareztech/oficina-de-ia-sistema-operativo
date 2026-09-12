# Sistema Operativo de IA

Tu trabajo en archivos, y Claude Code operándolos.

Es una carpeta con lo que sabes de ti y de lo que haces: qué vendes o qué entregas, cuánto
cobras si cobras, cómo son tus procesos, cómo escribes. Claude Code lee esa carpeta y desde ahí
te ayuda a trabajar, sin que le vuelvas a explicar quién eres en cada conversación.

No necesitas saber programar. Todo pasa por Claude Code, en español, con comandos guiados.

## Para quién es

Funciona igual si eres dueño de un negocio, freelance, empleado o estudiante. Lo que cambia son
las respuestas, no el sistema. `/comenzar` te pregunta primero qué haces y adapta la entrevista
a eso, así que no vas a tener que inventar un catálogo de servicios si no vendes nada.

## Cómo empezar

1. Clónalo a tu computadora.

   ```
   git clone https://github.com/adrianalvareztech/oficina-de-ia-sistema-operativo.git mi-sistema
   cd mi-sistema
   ```

2. **Desconéctalo de mi repositorio.** Este paso no te lo saltes: recién clonado, tu carpeta
   sigue apuntando a mi repo, y ahí van a vivir tus precios y tus clientes.

   ```
   git remote remove origin
   ```

   Con eso ya es tuya y nada más tuya. Si además lo quieres respaldado, crea el tuyo **en
   privado** y súbelo:

   ```
   gh repo create mi-sistema --private --source=. --push
   ```

   Si no haces esto último el sistema funciona igual, solo que vive nada más en tu computadora.

3. Ábrelo con Claude Code y corre `/comenzar`. Te va a hacer siete preguntas. Entre más reales
   las respuestas, mejor sirve el sistema. Ninguna te pide escribir un manual: si una te está
   tomando más de tres minutos, contesta lo que tengas y sigue.
4. Cuando termine, pregúntale "¿en qué me conviene enfocarme esta semana?". Ahí deja de ser una
   carpeta.
5. Conecta una herramienta de verdad, la que más uses. Anótala en `conexiones.md`.
6. Cuando algo se sienta incompleto, corre `/auditoria-de-sistema`.

## Las cuatro capas

Se construyen en orden. No es estético: cada una necesita la anterior.

1. **Contexto.** Lo que el sistema sabe de ti sin que se lo vuelvas a escribir.
2. **Conexiones.** A qué llega. Tu correo, tu calendario, tus herramientas.
3. **Habilidades.** Qué sabe hacer. Tus procesos, escritos una vez para invocarlos con un comando.
4. **Autonomía.** Qué corre solo. Va al final, cuando las tres de abajo ya funcionan.

## Qué hay adentro

```
CLAUDE.md               el mapa. Dice dónde está cada cosa, no la contiene
entrevista.md           las 7 preguntas de /comenzar. Puedes llenarlas antes
contexto/               quién eres, qué haces, qué te importa, cómo escribes
conexiones.md           registro de qué herramientas alcanza el sistema
referencias/            lo que consultas: herramientas, formatos, métodos
proyectos/              tus proyectos y entregas (ver proyectos/README.md)
decisiones/registro.md       qué decidiste y por qué. Solo se agrega
decisiones/repeticiones.md   lo que sigues haciendo a mano
corridas/               qué pasó cada vez que algo corrió solo
auditorias/             reportes fechados de /auditoria-de-sistema
archivados/             cosas viejas. No se borran, se mueven
CRECIMIENTO.md          qué agregar cuando el sistema crezca
.claude/skills/         tus cuatro comandos base, más los que construyas
```

## Tus comandos

- `/comenzar`: arma tu contexto la primera vez.
- `/auditoria-de-sistema`: revisa si tu sistema encuentra lo que dice que encuentra, y qué tan
  gruesa está cada capa. Guarda el reporte con fecha.
- `/descubrir-automatizaciones`: encuentra qué automatizar después.
- `/apuntar`: mete algo nuevo al mapa del `CLAUDE.md` y comprueba que la ruta sirva.

## Antes de subir nada a GitHub

Revisa que `.env` esté en `.gitignore`. Ya viene así en este kit, pero compruébalo tú.

Un archivo que empieza con punto no es secreto ni privado. El punto solo lo esconde en el
explorador de archivos. Lo único que mantiene tus llaves fuera de GitHub es que `.gitignore` las
liste. Si algún día creas un proyecto nuevo desde cero, esto es lo primero que tienes que hacer.

## Una nota sobre "segundo cerebro"

No es lo mismo que contexto. Contexto es la base que armas el primer día y actualizas cuando
algo cambia. Un segundo cerebro es una wiki que se acumula con el tiempo, con llamadas,
mensajes, notas y lo que vayas aprendiendo. Solo vale la pena cuando ya generas suficiente
información como para justificarla, y armarlo antes es trabajo que nadie va a leer. No viene en
este kit a propósito.
