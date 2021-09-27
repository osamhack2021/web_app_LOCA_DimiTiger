import React from 'react';
import { Redirect, Route } from 'react-router';
import isLogin from '../../utils/isLogin';


const PublicRoutes: React.FC<{component: any, restricted: boolean, path: any, exact: any}> = ({component: Component, restricted, ...rest}) => {
    return (
      <Route {...rest} render={
        props => ( isLogin() && restricted ?
            <Redirect to="/home" />  : <Component {...props} />
        )} 
      />
    );
}

export default PublicRoutes;