import { IUser } from '../../../interfaces/user.interface';

export interface LoginResponse {
  user?: IUser;
  token?: string;
}
