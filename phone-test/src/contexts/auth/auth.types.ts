import { LoginInput } from '../../interfaces/auth';
import { User } from '../../interfaces/user';

export type AuthContextProps = {
  login: (props: LoginInput) => Promise<void>;
  logout: () => void;
  user?: User;
};
