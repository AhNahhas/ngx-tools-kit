import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ntkTokenInterceptor } from './token-interceptor.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ntkTokenInterceptor', () => {
  const tokenGetter = () => 'test-token';
  const interceptor = ntkTokenInterceptor(tokenGetter);

  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([interceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token is provided', () => {
    httpClient.get('/data').subscribe();

    const request = httpController.expectOne('/data');
    request.flush({});

    expect(request.request.headers.get('Authorization')).toBe('Bearer test-token');
  });
});
