import React from "react";
import { Redirect, Route } from "react-router";
import { useRecoilValue } from "recoil";

import { authState } from "../atoms";

const PrivateRoutes: React.FC<{ component: any; path: any; exact: any }> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated } = useRecoilValue(authState);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoutes;
/*https://cotak.tistory.com/108*/
