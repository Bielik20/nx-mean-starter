import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage.wrapper';

const APP_PREFIX = 'NX-MEAN-STARTER-';
const STORAGE = new LocalStorage();

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  static loadInitialState() {
    return STORAGE.keys().reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0 ? token : token.charAt(0).toUpperCase() + token.slice(1),
              )
              .join(''),
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = STORAGE.getItem(storageKey);
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  clear(): void {
    return STORAGE.clear();
  }

  getItem<T = string>(key: string): T {
    return STORAGE.getItem<T>(`${APP_PREFIX}${key}`);
  }

  removeItem(key: string): void {
    return STORAGE.removeItem(`${APP_PREFIX}${key}`);
  }

  setItem(key: string, value: Object | string): void {
    return STORAGE.setItem(`${APP_PREFIX}${key}`, value);
  }
}
