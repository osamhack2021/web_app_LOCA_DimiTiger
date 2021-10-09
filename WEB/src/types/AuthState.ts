import User from "./User";

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  user?: User;
}

export default AuthState;
