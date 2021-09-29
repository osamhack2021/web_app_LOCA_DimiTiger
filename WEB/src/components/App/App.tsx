import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../../routes/Home";
import Login from "../Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import "./App.css";
import { CookiesProvider, useCookies } from "react-cookie";
import client from "../../api/client";
import { QueryClient, QueryClientProvider } from "react-query";

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
        </Switch>
      </Router>
    </div>
  );
};

const queryClient = new QueryClient();

const Root = () => (
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </CookiesProvider>
);

export default Root;
