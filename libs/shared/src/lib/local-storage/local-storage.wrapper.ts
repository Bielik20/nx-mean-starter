import { Dictionary } from '@nx-mean-starter/models';

export class LocalStorage {
  private fallbackStorage: Dictionary = {};

  // isAvailable(): boolean {
  //   try {
  //     window.localStorage.setItem('local-storage-test', '1');
  //     window.localStorage.getItem('local-storage-test');
  //     window.localStorage.removeItem('local-storage-test');
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  keys(): string[] {
    try {
      return Object.keys(window.localStorage);
    } catch (e) {
      return Object.keys(this.fallbackStorage);
    }
  }

  getItem<T>(key: string): T {
    try {
      let value = window.localStorage.getItem(key);
      try {
        value = JSON.parse(value);
      } catch {}
      return value as any;
    } catch (e) {
      return this.fallbackStorage[key];
    }
  }

  setItem(key: string, input: {} | string): void {
    const value: string = input instanceof Object ? JSON.stringify(input) : input;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      this.fallbackStorage[key] = value;
    }
  }

  removeItem(key: string): void {
    try {
      return window.localStorage.removeItem(key);
    } catch (e) {
      delete this.fallbackStorage[key];
    }
  }

  clear(): void {
    try {
      window.localStorage.clear();
    } catch (e) {
      this.fallbackStorage = {};
    }
  }
}
