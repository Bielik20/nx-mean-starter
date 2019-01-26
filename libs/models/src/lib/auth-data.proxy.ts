// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class AuthDataProxy {
  public readonly uid: string;
  public readonly displayName: string;
  public readonly photoURL: string;
  public readonly email: string;
  public readonly emailVerified: boolean;
  public readonly phoneNumber: null;
  public readonly isAnonymous: boolean;
  public readonly appName: string;
  public readonly authDomain: string;
  public readonly stsTokenManager: StsTokenManagerProxy;
  public readonly lastLoginAt: string;
  public readonly createdAt: string;
  public static Parse(d: string): AuthDataProxy {
    return AuthDataProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): AuthDataProxy {
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
    checkString(d.displayName, false, field + '.displayName');
    checkString(d.photoURL, false, field + '.photoURL');
    checkString(d.email, false, field + '.email');
    checkBoolean(d.emailVerified, false, field + '.emailVerified');
    checkNull(d.phoneNumber, field + '.phoneNumber');
    if (d.phoneNumber === undefined) {
      d.phoneNumber = null;
    }
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

function throwNull2NonNull(field: string, d: any): never {
  return errorHelper(field, d, 'non-nullable object', false);
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, 'object', nullable);
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, 'object', nullable);
}
function checkNumber(d: any, nullable: boolean, field: string): void {
  if (typeof d !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, 'number', nullable);
  }
}
function checkBoolean(d: any, nullable: boolean, field: string): void {
  if (typeof d !== 'boolean' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, 'boolean', nullable);
  }
}
function checkString(d: any, nullable: boolean, field: string): void {
  if (typeof d !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, 'string', nullable);
  }
}
function checkNull(d: any, field: string): void {
  if (d !== null && d !== undefined) {
    errorHelper(field, d, 'null or undefined', false);
  }
}
function errorHelper(field: string, d: any, type: string, nullable: boolean): never {
  if (nullable) {
    type += ', null, or undefined';
  }
  throw new TypeError(
    'Expected ' +
      type +
      ' at ' +
      field +
      ' but found:\n' +
      JSON.stringify(d) +
      '\n\nFull object:\n' +
      JSON.stringify(obj),
  );
}
