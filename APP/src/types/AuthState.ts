interface AuthState {
  authenticated: boolean;
  refreshToken?: string;
}

export default AuthState;
