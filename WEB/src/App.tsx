import React, { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";

import "./App.css";

import client from "./api/client";
import { useMe } from "./api/users";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Init from "./pages/Init";
import SearchMover from "./pages/SearchMover";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { authState } from "./atoms";

const App = () => {
  const [cookies] = useCookies(["access_token"]);
  const setAuthState = useSetRecoilState(authState);
  const { data: me } = useMe();

  useEffect(() => {
    const { access_token } = cookies;
    if (access_token) {
      client.defaults.headers.Authorization = `Bearer ${access_token}`;
      queryClient.invalidateQueries(["users", "me"]);
    } else {
      setAuthState({
        authenticated: false,
        loading: false,
      });
    }
  }, [cookies]);

  useEffect(() => {
    if (me) {
      setAuthState({
        authenticated: true,
        loading: false,
        user: me,
      });
    }
  }, [me]);

  return (
    <div id="app">
      <Router>
        <Switch>
          <PublicRoutes
            path="/login"
            restricted={true}
            component={Login}
            exact
          />
          <PublicRoutes
            path="/init"
            restricted={true}
            component={Init}
            exact
          />
          <PrivateRoutes path="/" component={Home} exact />
          <PrivateRoutes path="/search" component={SearchMover} exact />
        </Switch>
      </Router>
    </div>
  );
};

export const queryClient = new QueryClient();

const Root = () => (
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </CookiesProvider>
);

export default Root;
