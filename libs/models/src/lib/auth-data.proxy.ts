// Stores the currently-being-typechecked object for error messages.
import { AuthData } from './auth-data.model';
import {
  checkBoolean,
  checkNumber,
  checkString,
  throwIsArray,
  throwNotObject,
  throwNull2NonNull,
} from './proxy-helpers';

let obj: any = null;
export class AuthDataProxy {
  public readonly uid: string;
  public readonly displayName?: string;
  public readonly photoURL?: string;
  public readonly email: string;
  public readonly emailVerified: boolean;
  public readonly phoneNumber?: string;
  public readonly isAnonymous: boolean;
  public readonly appName: string;
  public readonly authDomain: string;
  public readonly stsTokenManager: StsTokenManagerProxy;
  public readonly lastLoginAt: string;
  public readonly createdAt: string;
  public static Parse(d: string): AuthData {
    return AuthDataProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): AuthData {
    if (!field) {
      obj = d;
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
    checkString(d.displayName, true, field + '.displayName');
    checkString(d.photoURL, true, field + '.photoURL');
    checkString(d.email, false, field + '.email');
    checkBoolean(d.emailVerified, false, field + '.emailVerified');
    checkString(d.phoneNumber, true, field + '.phoneNumber');
    checkBoolean(d.isAnonymous, false, field + '.isAnonymous');
    checkString(d.appName, false, field + '.appName');
    checkString(d.authDomain, false, field + '.authDomain');
    d.stsTokenManager = StsTokenManagerProxy.Create(d.stsTokenManager, field + '.stsTokenManager');
    checkString(d.lastLoginAt, false, field + '.lastLoginAt');
    checkString(d.createdAt, false, field + '.createdAt');
    return new AuthDataProxy(d);
  }
  private constructor(d: any) {
    this.uid = d.uid;
    this.displayName = d.displayName;
    this.photoURL = d.photoURL;
    this.email = d.email;
    this.emailVerified = d.emailVerified;
    this.phoneNumber = d.phoneNumber;
    this.isAnonymous = d.isAnonymous;
    this.appName = d.appName;
    this.authDomain = d.authDomain;
    this.stsTokenManager = d.stsTokenManager;
    this.lastLoginAt = d.lastLoginAt;
    this.createdAt = d.createdAt;
  }
}

export class StsTokenManagerProxy {
  public readonly apiKey: string;
  public readonly refreshToken: string;
  public readonly accessToken: string;
  public readonly expirationTime: number;
  public static Parse(d: string): StsTokenManagerProxy {
    return StsTokenManagerProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): StsTokenManagerProxy {
    if (!field) {
      obj = d;
      field = 'root';
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.apiKey, false, field + '.apiKey');
    checkString(d.refreshToken, false, field + '.refreshToken');
    checkString(d.accessToken, false, field + '.accessToken');
    checkNumber(d.expirationTime, false, field + '.expirationTime');
    return new StsTokenManagerProxy(d);
  }
  private constructor(d: any) {
    this.apiKey = d.apiKey;
    this.refreshToken = d.refreshToken;
    this.accessToken = d.accessToken;
    this.expirationTime = d.expirationTime;
  }
}
