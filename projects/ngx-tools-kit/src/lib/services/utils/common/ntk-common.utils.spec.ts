import { TestBed } from '@angular/core/testing';

import { NtkCommonUtils } from './ntk-common.utils';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CommonUtils', () => {
  let service: NtkCommonUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NtkCommonUtils, provideZonelessChangeDetection()],
    });

    service = TestBed.inject(NtkCommonUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pad number', () => {
    expect(service.padNumber(1, 2)).toEqual('01');
  });

  it('should pad number with custom padchar', () => {
    expect(service.padNumber(5, 3, 'a')).toEqual('aa5');
  });

  it('should verify if blank', () => {
    expect(service.isBlank('')).toBeTrue();
    expect(service.isBlank('   ')).toBeTrue();
    expect(service.isBlank(null)).toBeTrue();
    expect(service.isBlank(undefined)).toBeTrue();
    expect(service.isBlank('test')).toBeFalse();
  });

  it('should verify if not blank', () => {
    expect(service.isNotBlank('')).toBeFalse();
    expect(service.isNotBlank('   ')).toBeFalse();
    expect(service.isNotBlank(null)).toBeFalse();
    expect(service.isNotBlank(undefined)).toBeFalse();
    expect(service.isNotBlank('test')).toBeTrue();
  });

  it('should return default value', () => {
    expect(service.orDefault(null, 'default')).toEqual('default');
    expect(service.orDefault(undefined, 'default')).toEqual('default');
    expect(service.orDefault('value', 'default')).toEqual('value');
  });

  it('should check if array is empty', () => {
    expect(service.isEmpty(null)).toBeTrue();
    expect(service.isEmpty(undefined)).toBeTrue();
    expect(service.isEmpty([])).toBeTrue();
    expect(service.isEmpty([1, 2, 3])).toBeFalse();
  });

  it('should convert dto to HttpParams', () => {
    const params = service.toHttpParams({
      name: 'John',
      age: 30,
      isActive: true,
      tags: ['angular', 'typescript'],
      date: new Date('2024-01-01T00:00:00Z'),
    });

    expect(params.get('name')).toEqual('John');
    expect(params.get('age')).toEqual('30');
    expect(params.get('isActive')).toEqual('true');
    expect(params.get('tags')).toEqual('angular,typescript');
    expect(params.get('date')).toEqual('2024-01-01T00:00:00.000Z');
  });
});
