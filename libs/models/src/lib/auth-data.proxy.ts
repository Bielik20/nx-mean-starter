// Stores the currently-being-typechecked object for error messages.
import { AuthData } from './auth-data.model';
import {
  checkBoolean,
  checkString,
  throwIsArray,
  throwNotObject,
  throwNull2NonNull,
} from './proxy-helpers';

export class AuthDataProxy {
  public readonly uid: string;
  public readonly isAnonymous: boolean;
  public static Parse(d: string): AuthData {
    return AuthDataProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): AuthData {
    if (!field) {
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.uid, false, field + '.uid');
    checkBoolean(d.isAnonymous, false, field + '.isAnonymous');

    return new AuthDataProxy(d);
  }
  private constructor(d: any) {
    this.uid = d.uid;
    this.isAnonymous = d.isAnonymous;
  }
}
