import User from "./User";

interface AuthState {
  authenticated: boolean;
  user?: User;
}

export default AuthState;
