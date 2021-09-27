import React from 'react';
import { Redirect, Route } from 'react-router';
import isLogin from '../../utils/isLogin';


const PrivateRoutes: React.FC<{component: any, path: any, exact: any}> = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={
        props => ( isLogin() ?
          <Component {...props} /> : <Redirect to="/" /> 
        )} 
      />
    );
}

export default PrivateRoutes;
/*https://cotak.tistory.com/108*/