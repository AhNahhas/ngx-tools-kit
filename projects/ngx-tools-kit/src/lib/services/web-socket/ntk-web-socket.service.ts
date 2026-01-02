import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { NtkWebSocketConfig } from './ntk-web-socket-config.model';

export const NTK_WEB_SOCKET_CONFIG = new InjectionToken<NtkWebSocketConfig>(
  'NTK_WEB_SOCKET_CONFIG'
);

@Injectable({
  providedIn: 'root',
})
export class NtkWebSocketService {
  private webSocket!: WebSocket;
  private config!: NtkWebSocketConfig;
  private processors: ((event: MessageEvent) => void)[] = [];

  async init(config: NtkWebSocketConfig): Promise<WebSocket> {
    return new Promise<WebSocket>((resolve, reject) => {
      this.config = config;
      this.webSocket = new WebSocket(this.config.url, this.config.protocols);

      // Setup WebSocket event handlers
      if (this.config.onMessage) this.processors.push(this.config.onMessage);
      this.webSocket.addEventListener('open', event => this.config.onOpen?.(event));
      this.webSocket.addEventListener('message', event => this.processMessage(event));
      this.webSocket.addEventListener('close', event => this.config.onClose?.(event));
      this.webSocket.addEventListener('error', event => this.config.onError?.(event));

      // Handle connection open and error events
      const rejectHandler = (error: Event) => reject(error);
      this.webSocket.addEventListener('error', rejectHandler, { once: true });

      const resolveHandler = () => resolve(this.webSocket);
      this.webSocket.addEventListener('open', resolveHandler, { once: true });
    });
  }

  async close(): Promise<void> {
    return new Promise<void>(resolve => {
      if (this.webSocket?.readyState === WebSocket.OPEN) {
        this.webSocket.addEventListener('close', () => resolve());
        this.webSocket.close();
      } else if (
        this.webSocket?.readyState === WebSocket.CONNECTING ||
        this.webSocket?.readyState === WebSocket.CLOSING
      ) {
        setTimeout(() => resolve(close()));
      } else {
        resolve();
      }
    });
  }

  async whenReady(): Promise<WebSocket> {
    return new Promise<WebSocket>(resolve => {
      if (this.webSocket?.readyState === WebSocket.OPEN) {
        resolve(this.webSocket);
      } else if (this.webSocket?.readyState === WebSocket.CONNECTING) {
        setTimeout(() => resolve(this.whenReady()));
      } else {
        resolve(this.init(this.config));
      }
    });
  }

  addProcessor(processor: (event: MessageEvent) => void): void {
    this.processors.push(processor);
  }

  removeProcessor(processor: (event: MessageEvent) => void): void {
    const index = this.processors.indexOf(processor);
    if (index >= 0) {
      this.processors.splice(index, 1);
    }
  }

  async send<T = unknown>(data: T): Promise<void> {
    const ws = await this.whenReady();
    const parsed = typeof data === 'string' ? data : JSON.stringify(data);
    return ws.send(parsed);
  }

  private processMessage(event: MessageEvent): void {
    for (const processor of this.processors) {
      processor(event);
    }
  }
}

export function provideNtkWebSocket(config: NtkWebSocketConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Provide the WebSocket configuration
    { provide: NTK_WEB_SOCKET_CONFIG, useValue: config },

    // Websocket service initialization
    provideAppInitializer(async () => {
      const config = inject(NTK_WEB_SOCKET_CONFIG);
      const webSocketService = inject(NtkWebSocketService);
      await webSocketService.init(config);
    }),
  ]);
}
