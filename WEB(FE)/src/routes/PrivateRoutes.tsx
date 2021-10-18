import React from 'react';
import { Redirect, Route } from 'react-router';
import { RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { accessTokenState } from '@/atoms';

interface IPrivateRoute extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IPrivateRoute) => {
  const token = useRecoilValue(accessTokenState);
  return (
    <Route
      {...rest}
      render={props =>
        !token ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
