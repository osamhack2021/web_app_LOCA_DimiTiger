import React, { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { QueryParamProvider } from "use-query-params";

import "./App.css";

import client from "./api/client";
import { useMe } from "./api/users";
import Home from "./pages/Home";
import LocationLogs from "./pages/LocationLogs";
import Login from "./pages/Login";
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
  }, [cookies, setAuthState]);

  useEffect(() => {
    if (me) {
      setAuthState({
        authenticated: true,
        loading: false,
        user: me,
      });
    }
  }, [me, setAuthState]);

  return (
    <div id="app">
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <PublicRoutes
              path="/login"
              restricted={true}
              component={Login}
              exact
            />
            <PrivateRoutes path="/" component={Home} exact />
            <PrivateRoutes path="/search" component={LocationLogs} exact />
          </Switch>
        </QueryParamProvider>
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
