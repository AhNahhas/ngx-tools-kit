import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NtkCommonUtils {
  isNullOrEmpty(object: unknown | undefined | null): boolean {
    if (object == null) return true;
    if (Object.keys(object).length == 0) return true;
    return false;
  }

  padNumber(num: number, padlen: number, padchar = '0'): string {
    const pad = new Array(1 + padlen).join(padchar);
    return (pad + num).slice(-pad.length);
  }

  isBlank(str: string | undefined | null): boolean {
    return str == null || str.trim() === '';
  }

  isNotBlank(str: string | undefined | null): boolean {
    return !this.isBlank(str);
  }

  isEmpty<T>(array: T[] | undefined | null): boolean {
    return !array || array.length == 0;
  }

  orDefault<T>(entry: T | undefined | null, def: T): T {
    return entry != null ? entry : def;
  }

  toHttpParams<T>(dto: T | undefined | null): HttpParams {
    let queryParams = new HttpParams();

    if (dto == null) return queryParams;

    const keys = Object.keys(dto);

    for (const key of keys) {
      if (this.isNullOrEmpty(key)) continue;

      const data = dto[key as keyof T];

      if (data != null) {
        if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
          queryParams = queryParams.set(key, data);
        } else if (data instanceof Date) {
          queryParams = queryParams.set(key, data.toISOString());
        } else if (Array.isArray(data)) {
          queryParams = queryParams.set(key, data.join(','));
        } else {
          queryParams = queryParams.set(key, data.toString());
        }
      }
    }

    return queryParams;
  }
}
