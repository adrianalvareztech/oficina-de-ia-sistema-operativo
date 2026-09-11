# Conexiones

Qué herramientas alcanza este sistema. Esto es lo primero que se lee antes de intentar cualquier
conexión: si algo no está en esta tabla, el sistema no lo tiene.

Lo llena `/comenzar` con la lista de lo que usas hoy. Cada vez que conectes algo de verdad, o
compruebes algo que estaba en duda, actualiza su fila.

| Herramienta | Para qué la uso | Estado | Cómo | Última vez que funcionó |
|---|---|---|---|---|
| _ejemplo: Gmail_ | _correo y seguimiento_ | No | | |

La columna de estado tiene tres valores y la diferencia importa:

- **Sí**: algo leyó por ahí de verdad, y la fecha de la última columna lo respalda.
- **Sin comprobar**: debería funcionar, nadie lo ha probado. Aquí entra un CLI que instalaste en
  otro momento y que crees que sigue autenticado.
- **No**: no está conectada.

Dos estados no alcanzan. Una conexión que se rompió y una que nunca configuraste se ven igual si
solo tienes sí y no, y son problemas distintos: una hay que arreglarla y la otra hay que hacerla.

En la columna "Cómo" van tres opciones: **API** (llave secreta en `.env`), **CLI** (el programa de
la herramienta instalado en tu computadora, con tu sesión ya autorizada) o **MCP** (el puente que
la herramienta ya trae listo, configurado en `.mcp.json`).

Si una herramienta no tiene ninguna de las tres, todavía hay salida: automatizar el navegador, o
buscarla en una pasarela como Composio que conecta muchas apps por un solo MCP. Antes de casarte
con esa opción, lee qué te deja hacer y qué no.

## Cuando conectes algo

1. Ponla en esta tabla con la fecha.
2. Escribe su archivo en `referencias/`, con cómo se usa y un ejemplo que ya te haya funcionado.
3. Si usa llave, va en `.env`. Revisa que `.env` siga en `.gitignore` antes de subir nada.
4. Pruébala con algo que solo pueda contestarse con esa herramienta conectada. Si contesta sin
   ella, no probaste nada.

## Empieza por una

La que más uses, no la que esté de moda. Cinco conexiones a medias sirven menos que una que
funciona, y cada una que agregas es una más que se puede quedar vieja sin que te enteres.
