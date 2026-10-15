# Contexto de diseño — PsicoTools (web actual → futura app mobile con IA)

> Fuente de verdad del proyecto web: `FrontEnd/src/index.css`.
> Si la IA mobile va a reutilizar la identidad, debe usar **estos valores y estas
> fuentes**. Prohibido inventar hex nuevos: todo color sale de aquí.

## 1. Paleta de colores

### 1.1 Primitivas (base, no cambian con el tema)

| Token               | Hex       | Uso sugerido en mobile                          |
| ------------------- | --------- | ----------------------------------------------- |
| `brand-500`         | `#8ea604` | Primario en light (fondos con texto oscuro)     |
| `brand-600`         | `#748703` | Hover/bordes en light (solo UI grande, 3:1)     |
| `brand-400`         | `#a6c205` | Primario en dark (texto y fondos)               |
| `brand-300`         | `#bcd916` | Hover en dark                                   |
| `accent-500`        | `#ec9f05` | Secundario/ámbar en light (fondos, texto oscuro)|
| `accent-400`        | `#f0ad24` | Secundario/ámbar en dark                        |
| `gray-50`           | `#f8f9fa` | Fondo base light                                |
| `gray-100`          | `#edf2f7` | Bordes sutiles light                            |
| `gray-300`          | `#cbd5e0` | Bordes de inputs light                          |
| `gray-400`          | `#a0aec0` | Texto secundario dark / deshabilitado light     |
| `gray-600`          | `#4a5568` | Texto secundario light                          |
| `gray-800`          | `#2d3748` | Bordes sutiles dark                             |
| `gray-900`          | `#1a202c` | Texto primario light                            |
| `dark-bg`           | `#121418` | Fondo base dark + texto sobre lima/ámbar        |
| `dark-surface`      | `#1e2228` | Superficies (cards) en dark                     |
| `surface-light`     | `#ffffff` | Superficies (cards) en light                    |
| `text-dark-primary` | `#f7fafc` | Texto primario en dark                          |

### 1.2 Tokens semánticos — LIGHT MODE (`:root`)

| Token               | Valor        |
| ------------------- | ------------ |
| Fondo base          | `#f8f9fa`    |
| Fondo superficie    | `#ffffff`    |
| Texto primario      | `#1a202c`    |
| Texto secundario    | `#4a5568`    |
| Texto deshabilitado | `#a0aec0`    |
| Acción primaria     | `#8ea604`    |
| Acción hover        | `#748703`    |
| Acción secundaria   | `#ec9f05`    |
| Borde sutil         | `#edf2f7`    |
| Borde input         | `#cbd5e0`    |
| Éxito               | `#8ea604`    |
| Error               | `#bf3100`    |
| Advertencia         | `#f5bb00`    |
| Info                | `#2b6cb0`    |

### 1.3 Tokens semánticos — DARK MODE (`[data-theme="dark"]`)

| Token               | Valor        |
| ------------------- | ------------ |
| Fondo base          | `#121418`    |
| Fondo superficie    | `#1e2228`    |
| Texto primario      | `#f7fafc`    |
| Texto secundario    | `#a0aec0`    |
| Texto deshabilitado | `#4a5568`    |
| Acción primaria     | `#a6c205`    |
| Acción hover        | `#bcd916`    |
| Acción secundaria   | `#f0ad24`    |
| Borde sutil         | `#2d3748`    |
| Borde input         | `#4a5568`    |
| Éxito               | `#a6c205`    |
| Error               | `#e04814`    |
| Advertencia         | `#fcd34d`    |
| Info                | `#63b3ed`    |

### 1.4 Reglas de contraste verificadas (WCAG AA, obligatorias en mobile)

- Texto normal: **4.5:1** mínimo. Texto grande (≥24px o ≥19px negrita): **3:1**.
- Botones lima: fondo `brand` + texto `#121418`
  (light 5.91:1 / dark 9.08:1). Nunca texto blanco sobre lima (2.76:1, falla).
- Botones ámbar: fondo `accent` + texto `#121418`
  (light 7.40:1 / dark 8.15:1).
- Lima/ámbar como **texto pequeño sobre fondo claro fallan**
  (2.62:1 / 2.09:1): en light úsalos solo en fondos, bordes e iconografía
  grande; el texto pequeño usa primario/secundario.
- Error en dark (`#e04814` sobre `#1e2228`, 3.88:1): solo bordes/iconos o
  textos grandes; el cuerpo del mensaje va en texto primario sobre tinta.
- Advertencia en light (`#f5bb00` sobre blanco, 1.75:1): nunca como texto;
  fondo ámbar + texto `#1a202c` (9.32:1).
- Foco visible: contorno de 3px en ámbar (`accent`) + offset 2px.
- Táctil: mínimo 44×44px en botones/inputs.

## 2. Fuentes

| Uso   | Fuente / stack                                              | Origen / pesos        |
| ----- | ----------------------------------------------------------- | --------------------- |
| Texto | `Roboto` → `"Trebuchet MS"`, `"Lucida Sans Unicode"`, `"Lucida Grande"`, `"Lucida Sans"`, `Arial`, `sans-serif` | `@fontsource/roboto` pesos `300/400/500/700` |
| Código / monoespaciado | `ui-monospace`, `SFMono-Regular`, `Consolas`, `monospace` | Sistema (sin descarga) |

- Jerarquía web de referencia: títulos `700` con `letter-spacing` negativo
  (-0.5px a -1px), etiquetas de formulario `700` a 12–13px, cuerpo 14–15px,
  `line-height: 1.5`.
- En mobile, mapear a la escala propia de la plataforma (sp/pt) manteniendo
  los mismos pesos relativos (light 300 / regular 400 / medium 500 / bold 700).

## 3. Instrucción para la futura IA mobile

1. Replica las tablas 1.1–1.3 como design tokens nativos
   (ej. `Color.kt`, `AppColors.dart` o CSS variables si es web mobile).
2. Respeta la sección 1.4: ningún texto por debajo de los ratios indicados.
3. Usa las fuentes de la sección 2 (Roboto + mismos fallbacks).
4. Ante cualquier duda visual, `FrontEnd/src/index.css` manda.
