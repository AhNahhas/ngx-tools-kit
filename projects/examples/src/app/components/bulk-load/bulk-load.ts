import { Component, inject, OnInit } from '@angular/core';
import { NtkBulkLoad, NtkBulkLoadable } from 'ngx-tools-kit';

@Component({
  selector: 'ntk-bulk-load-task',
  standalone: true,
  template: `
    <span>Task Refreshed</span>
    <button type="button" class=" ms-2 btn btn-success" (click)="refresh()">Refresh</button>
  `,
})
export class BulkLoadTask implements OnInit {
  loadable = inject(NtkBulkLoadable);

  ngOnInit(): void {
    this.loadable.markReady(true);
  }

  async refresh(): Promise<void> {
    this.loadable.markReady(false);
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.loadable.markReady(true);
  }
}

@Component({
  selector: 'ntk-bulk-load-example',
  standalone: true,
  imports: [NtkBulkLoad, NtkBulkLoadable, BulkLoadTask],
  templateUrl: './bulk-load.html',
  styleUrl: './bulk-load.scss',
})
export class BulkLoad {}
