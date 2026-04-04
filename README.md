# NgWorkspace

This repository is an Angular workspace containing the `ngx-tools-kit` library package.

## Repository overview

- `angular.json` — workspace configuration
- `package.json` — shared workspace scripts and dependencies
- `tsconfig.json` — workspace TypeScript configuration
- `projects/ngx-tools-kit/` — the library package source and package-specific README

The primary package in this workspace is `projects/ngx-tools-kit`, which exports reusable Angular components, directives, pipes, and services.

## Quick start

Install dependencies:

```bash
npm install
```

Run the workspace application or library builds:

```bash
npm run start
```

Run unit tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

## Library workflow

Build the library package:

```bash
ng build ngx-tools-kit
```

The compiled package is emitted to `dist/ngx-tools-kit`.

### Publish the library

After building, publish from the package folder:

```bash
cd dist/ngx-tools-kit
npm publish
```

## Package documentation

The library-specific documentation is maintained in `projects/ngx-tools-kit/README.md`.

Use that file for component, directive, service, and pipe usage examples.

## Project structure

- `projects/ngx-tools-kit/src/lib/components/` — reusable Angular components and structural directives
- `projects/ngx-tools-kit/src/lib/directives/` — standalone directives for DOM and render behavior
- `projects/ngx-tools-kit/src/lib/services/` — injectable helpers and integration services
- `projects/ngx-tools-kit/src/lib/pipes/` — template utilities

## Development notes

- The workspace is based on Angular 20 and uses standalone component patterns in the library.
- The library includes zoneless-friendly APIs and Angular signal-compatible primitives.
- Keep public exports in `projects/ngx-tools-kit/src/public-api.ts`.

## Useful scripts

- `npm run start` — serve the workspace application
- `npm test` — run unit tests
- `npm run lint` — run linting
- `ng build ngx-tools-kit` — build the library package

## Additional Resources

For more information about Angular CLI and workspace configuration, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
