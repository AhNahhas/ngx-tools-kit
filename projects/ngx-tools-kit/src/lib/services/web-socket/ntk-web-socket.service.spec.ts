import { TestBed } from '@angular/core/testing';

import { NtkWebSocketService, provideNtkWebSocket } from './ntk-web-socket.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { NtkWebSocketConfig } from './ntk-web-socket-config.model';

class DummyWebSocket {
  private _url: string;
  private _protocols?: string | string[];
  private _readyState: number = WebSocket.CLOSED;
  private _error = false;

  private onOpenCallbacks = new Array<(event: Event) => void>();
  private onCloseCallbacks = new Array<(event: CloseEvent) => void>();
  private onErrorCallbacks = new Array<(event: Event) => void>();
  private onMessageCallbacks = new Array<(event: MessageEvent) => void>();

  public incomingMessages: MessageEvent[] = [];
  public sentMessages: string[] = [];

  get url(): string {
    return this._url;
  }

  get protocol(): string | undefined {
    if (Array.isArray(this._protocols)) {
      return this._protocols.join(',');
    }

    return this._protocols;
  }

  get readyState(): number {
    return this._readyState;
  }

  get inError(): boolean {
    return this._error;
  }

  constructor(url: string, protocols?: string | string[]) {
    this._url = url;
    this._protocols = protocols;
    setTimeout(() => this.onopen(new Event('open')));
  }

  // Override methods if needed for testing
  onopen(_event: Event): void {
    this._error = false;
    this._readyState = WebSocket.OPEN;
    for (const callback of this.onOpenCallbacks) {
      callback(_event);
    }
  }

  onclose(_event: CloseEvent): void {
    this._readyState = WebSocket.CLOSED;
    this.incomingMessages = [];
    for (const callback of this.onCloseCallbacks) {
      callback(_event);
    }
  }

  onerror(_event: Event): void {
    this._error = true;
    this._readyState = WebSocket.CLOSED;
    this.incomingMessages = [];
    for (const callback of this.onErrorCallbacks) {
      callback(_event);
    }
  }

  onmessage(_event: MessageEvent): void {
    this.incomingMessages.push(_event);
    for (const callback of this.onMessageCallbacks) {
      callback(_event);
    }
  }

  // Override communication methods
  send(message: string): void {
    this.sentMessages.push(message);
  }

  close(): void {
    this.onclose(new CloseEvent('close'));
  }

  // Override event handlers
  addEventListener(_type: string, _listener: (event: Event) => void): void {
    if (_type === 'open') {
      this.onOpenCallbacks.push(_listener);
    } else if (_type === 'close') {
      this.onCloseCallbacks.push(_listener);
    } else if (_type === 'error') {
      this.onErrorCallbacks.push(_listener);
    } else if (_type === 'message') {
      this.onMessageCallbacks.push(_listener);
    }
  }

  removeEventListener<T extends Event = Event>(_type: string, _listener: (event: T) => void): void {
    let callbacks: ((event: T) => void)[] | null = null;
    if (_type === 'open') {
      callbacks = this.onOpenCallbacks;
    } else if (_type === 'close') {
      callbacks = this.onCloseCallbacks as ((event: Event) => void)[];
    } else if (_type === 'error') {
      callbacks = this.onErrorCallbacks;
    } else if (_type === 'message') {
      callbacks = this.onMessageCallbacks as ((event: Event) => void)[];
    }

    if (callbacks) {
      const index = callbacks.indexOf(_listener);
      if (index >= 0) {
        callbacks.splice(index, 1);
      }
    }
  }
}

describe('NtkWebSocket', () => {
  let service: NtkWebSocketService;
  let originalWebSocket: typeof WebSocket;

  const ntkWebSocketConfig: NtkWebSocketConfig = {
    url: 'ws://localhost:8080/websocket',
    protocols: ['protocol1', 'protocol2'],
  };

  beforeAll(() => {
    // Mock the WebSocket global object
    originalWebSocket = (window as { WebSocket: typeof WebSocket }).WebSocket;
    (window as unknown as { WebSocket: typeof DummyWebSocket }).WebSocket = DummyWebSocket;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NtkWebSocketService,
        provideZonelessChangeDetection(),
        provideNtkWebSocket(ntkWebSocketConfig),
      ],
    });

    service = TestBed.inject(NtkWebSocketService);
  });

  afterEach(async () => {
    await service.close();
  });

  afterAll(() => {
    // Restore the original WebSocket global object
    (window as { WebSocket: typeof WebSocket }).WebSocket = originalWebSocket;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize WebSocket connection', async () => {
    const webSocket = (await service.whenReady()) as unknown as DummyWebSocket;
    expect(webSocket).toBeTruthy();
    expect(webSocket.url).toBe(ntkWebSocketConfig.url);
    expect(webSocket.protocol).toEqual((ntkWebSocketConfig.protocols as string[]).join(','));
  });

  it('should add message processor and process messages', async () => {
    const webSocket = (await service.whenReady()) as unknown as DummyWebSocket;
    let processedMessage: unknown = null;
    const processor = (event: MessageEvent) => (processedMessage = event.data);
    service.addProcessor(processor);

    const testData = JSON.stringify({ test: 'data' });
    webSocket.onmessage(new MessageEvent('message', { data: testData }));
    expect(processedMessage).toEqual(testData);
  });

  it('should send messages through WebSocket', async () => {
    const webSocket = (await service.whenReady()) as unknown as DummyWebSocket;
    const testMessage = 'Hello WebSocket';
    await service.send(testMessage);
    expect(webSocket.sentMessages).toContain(testMessage);
  });

  it('should close WebSocket connection', async () => {
    const webSocket = (await service.whenReady()) as unknown as DummyWebSocket;
    expect(webSocket.readyState).toBe(WebSocket.OPEN);
    await service.close();
    expect(webSocket.readyState).toBe(WebSocket.CLOSED);
  });

  it('should handle WebSocket errors', async () => {
    const webSocket = (await service.whenReady()) as unknown as DummyWebSocket;

    await new Promise<void>(resolve => {
      setTimeout(() => {
        webSocket.onerror(new Event('error'));
        resolve();
      });
    });

    expect(webSocket.inError).toBeTrue();
    expect(webSocket.readyState).toBe(WebSocket.CLOSED);
  });
});
