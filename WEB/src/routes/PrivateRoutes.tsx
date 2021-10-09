import React from "react";
import { Redirect, Route } from "react-router";
import { useRecoilValue } from "recoil";

import { authState } from "../atoms";

const PrivateRoutes: React.FC<{ component: any; path: any; exact: any }> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated, loading } = useRecoilValue(authState);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoutes;
/*https://cotak.tistory.com/108*/
