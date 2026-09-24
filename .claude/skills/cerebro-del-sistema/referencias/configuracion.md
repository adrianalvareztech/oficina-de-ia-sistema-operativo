# El archivo de configuracion

Lo lee `armar.mjs` (`--config`) y lo vuelve a escribir como `constelacion.config.json` adentro
de la app generada, con `raiz` agregado.

```json
{
  "nombre": "Texto libre, es lo que se ve arriba a la izquierda",
  "categorias": [
    {
      "id": "contexto",
      "etiqueta": "Contexto",
      "color": "#60a5fa",
      "rutas": ["contexto", "otra-carpeta/subcarpeta"]
    }
  ],
  "puerto": 4650
}
```

- `id`: unico, minusculas, sin espacios. Se usa internamente para el filtro de la leyenda.
- `etiqueta`: lo que ve la persona.
- `color`: hexadecimal. Nunca `#e8a33d` (acento reservado de la interfaz).
- `rutas`: una o mas, relativas a la raiz del AIOS (el `--raiz` que se le paso a `armar.mjs`).
  Puede ser una carpeta (se recorre completa, subcarpetas incluidas) o un archivo suelto.
  Una ruta fuera del AIOS tambien funciona si es absoluta, pero hay que haberla confirmado con
  la persona primero: nunca se adivina un vault externo.
- `puerto`: opcional, default 4650.

`armar.mjs` valida que cada categoria tenga las cuatro llaves y al menos una ruta antes de
escribir nada. Si el archivo de salida (`apps/cerebro-del-sistema/` por default) ya existe, se
niega: hay que borrarlo o usar `--salida` con otro nombre.
