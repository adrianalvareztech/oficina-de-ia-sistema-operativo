---
name: apuntar
description: Úsalo para meter algo al mapa de ruteo del CLAUDE.md. "apunta esta carpeta", "agrega este proyecto al mapa", "mi sistema no encuentra esto", "conecta esta carpeta que vive afuera". Sirve para una carpeta nueva, un archivo, un proyecto que vive fuera del sistema, o una ruta que se rompió.
argument-hint: "<archivo, carpeta o ruta> [para qué sirve]"
---

## Qué hace

Agrega una fila al mapa de ruteo del `CLAUDE.md` para que el sistema encuentre algo que hoy no
encuentra. Una fila, la más chica que resuelva, y comprobada.

El mapa no se mantiene solo. Cada vez que creas una carpeta, mueves un archivo o arrancas un
proyecto nuevo, el mapa se queda un poco más viejo que la realidad. Cuando eso pasa, el sistema
no dice "no lo encontré": se inventa la respuesta y la redacta bien. Esta skill es el
mantenimiento.

## Cuándo se usa

- Creaste una carpeta o un archivo nuevo y todavía no está en el mapa.
- Tienes un proyecto que vive **fuera** del sistema y quieres que lo sepa encontrar.
- Moviste algo y la fila del mapa quedó apuntando a la nada.
- `/auditoria-de-sistema` encontró una ruta muerta y quieres arreglarla.

## Cuándo no

- Si lo que quieres es conectar una herramienta: eso es `conexiones.md` más su archivo en
  `referencias/`, no una fila del mapa.
- Si es un dato de negocio nuevo: eso va adentro de un archivo de `contexto/`, y solo hace falta
  apuntarlo si creaste un archivo nuevo para él.

## Ejecución

### 1. Comprueba que exista

Abre lo que te pidieron apuntar y mira qué es. Si no existe, o no queda claro para qué sirve o
cuál es la versión buena, haz **una** pregunta corta y espera. No inventes el propósito.

Si es una ruta a otra parte de la computadora, comprueba que se pueda abrir desde aquí.

### 2. Escribe la fila

Tres columnas, igual que las demás:

| Necesidad | Ruta | Regla |
|---|---|---|
| La pregunta que resuelve, en el lenguaje de quien la va a hacer | La ruta exacta | Qué hay que saber para no romperlo |

- **Necesidad** se escribe como la pregunta real, no como el nombre técnico. "Cuánto le cobré a
  este cliente" sirve. "Datos del cliente" no.
- **Ruta** relativa si está adentro del sistema, completa si vive afuera.
- **Regla** solo si hay algo que saber. Si no hay nada, déjala vacía en vez de rellenar.

Si lo que apuntas es un elemento suelto de algo que ya tiene su fila, no crees una fila nueva:
métela en el índice de esa carpeta. Una fila nueva en el mapa raíz es para un tipo de cosa que
no estaba, no para un ejemplo más de algo que ya estaba.

### 3. No copies el contenido

Apunta a donde vive el dato. No lo traigas al `CLAUDE.md` ni lo resumas ahí, aunque sea corto.
El día que cambie en su lugar, la copia se queda vieja y tienes dos versiones contradiciéndose.

### 4. Comprueba siguiéndola

Sigue tu propia fila desde el `CLAUDE.md` hasta el archivo, como si fueras una sesión nueva que
nunca vio esta conversación. Si no llegas, arregla la fila antes de decir que quedó.

### 5. Reporta en dos líneas

Qué apuntaste, dónde quedó la fila, y si hubo algo que no pudiste comprobar.

## Reglas

1. **Una fila, la más chica que resuelva.** No reorganices el mapa de paso.
2. **No muevas ni borres lo que estás apuntando.** Esta skill toca el mapa, nada más.
3. **No copies datos que cambian.** Se apunta, no se resume.
4. **Comprueba antes de decir que quedó.** Seguir la ruta es parte del trabajo.
5. **Si ya había una fila que funcionaba, no agregues otra.** Dilo y no edites nada.
6. **Nada de llaves ni contraseñas en el mapa.**

## Verificación

- Carpeta nueva adentro del sistema: queda una fila, la ruta abre, y no se tocó nada más.
- Proyecto que vive afuera: la fila lleva la ruta completa y se comprobó que abre desde aquí.
- Ruta muerta que venía de la auditoría: la fila queda apuntando a donde está el archivo ahora,
  no se crea una fila nueva al lado de la rota.
- Algo que ya estaba bien apuntado: la skill lo dice y no edita el `CLAUDE.md`.
