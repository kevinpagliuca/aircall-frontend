import { User } from './user';

export interface LoginInput {
  username: String;
  password: String;
}

export interface AuthResponseType {
  access_token: String;
  refresh_token: String;
  user: User;
}

export interface RefreshTokenResponseType {
  refreshTokenV2: AuthResponseType;
}

export interface GetMeResponseType {
  me: User;
}
