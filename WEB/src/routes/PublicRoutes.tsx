import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router";

const PublicRoutes: React.FC<{
  component: any;
  restricted: boolean;
  path: any;
  exact: any;
}> = ({ component: Component, restricted, ...rest }) => {
  const [cookies] = useCookies(["access_token"]);
  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.access_token && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoutes;
