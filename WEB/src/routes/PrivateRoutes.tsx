import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router";

const PrivateRoutes: React.FC<{ component: any; path: any; exact: any }> = ({
  component: Component,
  ...rest
}) => {
  const [cookies] = useCookies(["access_token"]);
  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.access_token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoutes;
/*https://cotak.tistory.com/108*/
