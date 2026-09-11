# Proyectos

Aquí va cada proyecto o entrega que este sistema te ayuda a producir. Una carpeta por proyecto.

Si trabajas con clientes, esta también es la carpeta de tus clientes. No hagas una carpeta
`clientes/` aparte: la misma información en dos lugares es lo que después se contradice.

## Elige un patrón y quédate con él

**Cada cliente es un proyecto.** Arquitectos, ingenieros, consultores de proyecto único. La
carpeta del proyecto es la carpeta del cliente, y ahí va todo junto.

```
proyectos/
  casa-perez/
```

**Un cliente con varios proyectos.** Agencias, freelance con trabajo recurrente, retainers.

```
proyectos/
  cliente-a/
    campana-lanzamiento/
    rediseno-web/
```

**Sin clientes.** Producto, contenido, escuela, trabajo interno. Una carpeta por entrega.

```
proyectos/
  curso-python/
  reporte-trimestral/
```

Ninguno es más correcto. Lo que sí confunde al sistema es mezclar los tres al mismo tiempo.

## Un proyecto puede tener lo suyo adentro

Cuando un proyecto crece, puede llevar su propio `CLAUDE.md` y sus propias habilidades:

```
proyectos/
  cliente-a/
    CLAUDE.md              manda dentro de esta carpeta
    .claude/skills/
      reporte-semanal/
```

El `CLAUDE.md` del proyecto es el que dice cuándo se usa cada habilidad. Algo así:

> Este proyecto es la marca nueva del restaurante del sur.
> Cuando toque el reporte del viernes, usa la habilidad `reporte-semanal`.
> Los precios de este cliente son distintos a los de la lista general: están en `precios.md` de
> esta carpeta.

Así una habilidad muy específica de un cliente no se activa cuando estás trabajando en otro.

## Cuando un proyecto ya no cabe aquí

Si un proyecto es demasiado grande, demasiado privado, o tiene su propio ciclo de vida, no tiene
que vivir adentro. Créalo aparte en tu computadora y agrega su fila al mapa de ruteo del
`CLAUDE.md` de la raíz, con la ruta a donde vive de verdad.

No necesitas un repositorio nuevo ni nada complicado. Con que el mapa sepa dónde está, el sistema
lo va a encontrar.
