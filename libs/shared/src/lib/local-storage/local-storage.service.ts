import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private storage = localStorage;

  get length(): number {
    return this.storage.length;
  }

  constructor() {}

  clear(): void {
    return this.storage.clear();
  }

  getItem<T = string>(key: string): T {
    let value = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch {}
    return value as any;
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: Object | string): void {
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    return this.storage.setItem(key, value as string);
  }
}
