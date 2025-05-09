# KLEI CLI

KLEI CLI es una herramienta de línea de comandos profesional con múltiples características.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
npm install -g klei-cli
# o
pnpm install -g klei-cli
```

## Uso

Para usar la CLI, puedes ejecutar los siguientes comandos:

### create

Este comando crea un nuevo proyecto.

```bash
# klei create <nombre> [opciones]
# klei create mi-proyecto
# klei create --t npmjs
# klei create --type npmjs
klei create mi-proyecto --type npmjs
```

### help

Este comando muestra la ayuda y los comandos disponibles.

```bash
klei help
```

## Comandos Disponibles

- `create [nombre]`: Crea un nuevo proyecto.
  - `--t, --type <type>`: Especifica el tipo de proyecto.
- `help`: Muestra la ayuda y los comandos disponibles.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
