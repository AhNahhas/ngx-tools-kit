import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    children: [
      {
        path: 'bulk-load',
        loadComponent: () => import('./components/bulk-load/bulk-load').then(m => m.BulkLoad),
      },
      {
        path: 'persistent-host',
        loadComponent: () =>
          import('./components/persistent-host/persistent-host').then(m => m.PersistentHost),
      },
      {
        path: 'teleport',
        loadComponent: () => import('./components/teleport/teleport').then(m => m.Teleport),
      },
      /*{
        path: 'measure',
        loadComponent: () => import('./components/measure/measure').then(m => m.Measure),
      },*/
    ],
  },
];
