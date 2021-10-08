import React, { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RecoilRoot } from 'recoil';

import "./App.css";

import client from "./api/client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchMover from "./pages/SearchMover";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

const App = () => {
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const { access_token } = cookies;
    if (access_token) {
      client.defaults.headers.Authorization = `Bearer ${access_token}`;
    } else {
      delete client.defaults.headers.Authorization;
    }
  }, [cookies]);

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
          <PrivateRoutes path="/" component={Home} exact />
          <PrivateRoutes path="/search" component={SearchMover} exact />
        </Switch>
      </Router>
    </div>
  );
};

const queryClient = new QueryClient();

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
