import React from "react";
import { Redirect, Route } from "react-router";
import { useRecoilValue } from "recoil";

import { authState } from "../atoms";

const PublicRoutes: React.FC<{
  component: any;
  restricted: boolean;
  path: any;
  exact: any;
}> = ({ component: Component, restricted, ...rest }) => {
  const { authenticated } = useRecoilValue(authState);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoutes;
