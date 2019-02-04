// Stores the currently-being-typechecked object for error messages.
import { UserFromToken } from '@nx-mean-starter/models';
import {
  checkBoolean,
  checkString,
  throwIsArray,
  throwNotObject,
  throwNull2NonNull,
} from './proxy-helpers';

let obj: any = null;
export class UserFromTokenProxy {
  public readonly _id: string;
  public readonly email: string;
  public readonly emailVerified: boolean;
  public readonly name?: string;
  public readonly pictureUrl?: string;
  public readonly phoneNumber?: string;
  public static Parse(d: string): UserFromToken {
    return UserFromTokenProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): UserFromToken {
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
    checkString(d.email, false, field + '.email');
    checkBoolean(d.email_verified, false, field + '.email_verified');
    checkString(d.name, true, field + '.name');
    checkString(d.picture, true, field + '.picture');
    checkString(d.phoneNumber, true, field + '.phoneNumber');
    return new UserFromTokenProxy(d);
  }
  private constructor(d: any) {
    this._id = d.uid;
    this.email = d.email;
    this.emailVerified = d.email_verified;
    this.name = d.name;
    this.pictureUrl = d.picture;
  }
}
