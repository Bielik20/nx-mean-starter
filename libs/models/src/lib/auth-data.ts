export interface AuthData {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: null;
  isAnonymous: boolean;
  appName: string;
  authDomain: string;
  stsTokenManager: StsTokenManager;
  lastLoginAt: string;
  createdAt: string;
}

export interface StsTokenManager {
  apiKey: string;
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface UserInfo {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber?: null;
}
