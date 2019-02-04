export interface UserFromToken {
  _id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  pictureUrl?: string;
  phoneNumber?: string;
}
