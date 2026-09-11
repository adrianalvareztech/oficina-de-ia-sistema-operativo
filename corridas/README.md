# Corridas

Qué pasó cada vez que algo corrió solo.

Esto es distinto a `decisiones/registro.md`, aunque el nombre se parezca. Ahí va **por qué decidiste
algo**, y se escribe una vez, cuando lo decides. Aquí va **qué pasó cuando corrió**, y se escribe
solo, cada vez que corre.

Mientras no tengas nada automatizado, esta carpeta se queda vacía. Está aquí desde el principio
para que cuando montes tu primera automatización ya sepas dónde va el registro, en vez de tener
que inventarlo en ese momento.

## Por qué importa

Una automatización que falla en silencio es peor que no tenerla. Si no avisa, sigues creyendo que
el trabajo se está haciendo, y te enteras semanas después, normalmente porque alguien más lo nota.

Con un registro te enteras el mismo día, y cuando algo se rompe puedes ver desde cuándo.

## Cómo se usa

Un archivo por automatización, con su nombre: `brief-manana.log`, `reporte-viernes.log`.

Cada corrida deja una línea:

```
2026-03-14 07:30 · brief-manana · ok · 4 correos urgentes, 2 juntas
2026-03-15 07:30 · brief-manana · ok · nada urgente
2026-03-16 07:30 · brief-manana · ERROR · la sesion de Gmail expiro
```

Cuatro cosas: cuándo, cuál, cómo salió, y una línea de qué hizo o qué falló.

## Las dos preguntas que contesta

**¿Corrió?** Si hoy es 16 y la última línea es del 12, llevas cuatro días sin que corra y no te
habías dado cuenta. Esa es la falla más común y la más difícil de notar sin esto.

**¿Corrió bien?** Un `ok` que siempre dice lo mismo también es sospechoso. Si tu brief lleva dos
semanas diciendo "nada urgente", o de verdad no pasa nada, o dejó de leer tu correo.

## El aviso

El archivo sirve para revisar. No sirve para enterarte.

Cuando montes algo que corra solo, decide por dónde te avisa cuando falla: un mensaje, un correo,
una notificación. `/descubrir-automatizaciones` no cierra una ficha de autonomía sin esa línea, y
es a propósito.
