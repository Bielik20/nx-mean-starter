import { User } from './user.model';

export class AuthResponse {
  jwt: string;
  user: User;
}
