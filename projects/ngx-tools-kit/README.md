# NgxToolsKit

NgxToolsKit is an Angular library that exposes reusable components, directives, services, and pipes for Angular applications.

## Installation

Install the library as a dependency in your Angular application:

```bash
npm install ngx-tools-kit
```

## Importing the Library

In a consumer application, import the exported symbols from `ngx-tools-kit`:

```ts
import {
  NtkBulkLoad,
  NtkBulkLoadable,
  NtkPersistentHost,
  NtkComponentOutlet,
  NtkTeleport,
  NtkMeasure,
  FormControlErrorPipe,
  ReducePipe,
  ntkTokenInterceptor,
  provideNtkWebSocket,
} from 'ngx-tools-kit';
```

Depending on your application setup, add components and directives to a module `imports` or to a standalone component’s `imports`.

## Usage

### Components

#### `NtkBulkLoad`

Use `NtkBulkLoad` to render content only after all child items with `NtkBulkLoadable` are ready.

```html
<ntk-bulk-load>
  <div ntkBulkLoadable>Content loaded</div>
  <div ntkBulkPending>Loading placeholder</div>
</ntk-bulk-load>
```

In a child directive, call `markReady(true)` once the individual item is ready.

#### `NtkPersistentHost` and `NtkComponentOutlet`

Use `NtkPersistentHost` together with `NtkComponentOutlet` for dynamic component rendering while preserving previously created instances.

```html
<ntk-persistent-host>
  <ng-container *ntkComponentOutlet="currentComponent"></ng-container>
</ntk-persistent-host>
```

This allows the host to reuse component instances when the same type is rendered again.

### Directives

#### `NtkTeleport`

Teleport an element to a target DOM location while keeping it under Angular control.

```html
<div ntkTeleport="#teleportTarget">Teleported content</div>
<div id="teleportTarget"></div>
```

#### `NtkMeasure`

Measure the render duration of the host element and receive the result through a callback.

```html
<div [ntkMeasure]="onMeasure"></div>
```

```ts
onMeasure(result: { duration: number; timestamp: number }) {
  console.log('render took', result.duration, 'ms');
}
```

### Pipes

#### `formControlError`

Map Angular form control errors to user-friendly messages.

```html
<div *ngIf="control.errors">
  {{ control | formControlError: { required: 'Required field', minlength: 'Minimum length required' } }}
</div>
```

#### `ntkReduce`

Reduce an array in the template.

```html
{{ values | ntkReduce: (sum, item) => sum + item.value : 0 }}
```

### Services

#### `ntkTokenInterceptor`

Create an HTTP interceptor that adds an authorization token to outgoing requests.

```ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ntkTokenInterceptor } from 'ngx-tools-kit';

providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useFactory: () => ntkTokenInterceptor(() => localStorage.getItem('token') ?? ''),
    multi: true,
  },
];
```

#### `provideNtkWebSocket`

Initialize a WebSocket connection when the application starts.

```ts
import { provideNtkWebSocket } from 'ngx-tools-kit';

providers: [
  provideNtkWebSocket({
    url: 'wss://example.com/socket',
    protocols: ['protocol1'],
    onOpen: event => console.log('open', event),
    onMessage: event => console.log('message', event),
  }),
];
```

#### Utilities

The library also exposes utility classes for common tasks:

- `NtkCommonUtils` for null/empty checks, padding, and `HttpParams` conversion
- `NtkFormUtils` for reusable form validators such as email, date, and array validators

## Building

To build the library, run:

```bash
ng build ngx-tools-kit
```

The compiled artifacts will be created in `dist/ngx-tools-kit`.

## Publishing the Library

Once the project is built, publish it from the distribution folder:

```bash
cd dist/ngx-tools-kit
npm publish
```

## Running unit tests

```bash
ng test
```

## Running end-to-end tests

```bash
ng e2e
```

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
