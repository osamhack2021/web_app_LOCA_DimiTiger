import React from 'react';
import { Redirect, Route } from 'react-router';
import { useRecoilValue } from 'recoil';

import { accessTokenState } from '../atoms';

const PublicRoutes: React.FC<{
  component: any;
  restricted: boolean;
  path: any;
  exact: any;
}> = ({ component: Component, restricted, ...rest }) => {
  const token = useRecoilValue(accessTokenState);
  return (
    <Route
      {...rest}
      render={props =>
        token && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoutes;
