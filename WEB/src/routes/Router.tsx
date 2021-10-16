import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { QueryParamProvider } from 'use-query-params';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

import { accessTokenState, settingsState, useLogout } from '@/atoms';
import useAxios from '@/hooks/useAxios';
import Beacons from '@/pages/Beacons';
import Home from '@/pages/Home';
import Init from '@/pages/Init';
import LocationLogs from '@/pages/LocationLogs';
import Locations from '@/pages/Locations';
import LocationDetail from '@/pages/Locations/LocationDetail';
import Login from '@/pages/Login';
import Settings from '@/pages/Settings';
import CurrentUsers from '@/pages/Users';
import UserDetail from '@/pages/Users/UserDetail';
import User from '@/types/User';

const Router = () => {
  const axios = useAxios();
  const logout = useLogout();
  const accessToken = useRecoilValue(accessTokenState);
  const setSettings = useSetRecoilState(settingsState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken || !loading) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get<User>('/users/me')
      .then(({ data }) => {
        if (!data.isAdmin) {
          logout();
        }
        return axios.get('/settings/current');
      })
      .then(({ data }) => {
        setSettings(data.data);
      })
      .finally(() => setLoading(false));
  }, [accessToken, axios, loading, logout, setSettings]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}></div>
    );
  }

  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <PublicRoutes
            path="/login"
            restricted={true}
            component={Login}
            exact
          />
          <PrivateRoutes path="/" component={Home} exact />
          <PrivateRoutes path="/init" component={Init} exact />
          <PrivateRoutes path="/location-logs" component={LocationLogs} exact />
          <PrivateRoutes path="/users" component={CurrentUsers} exact />
          <PrivateRoutes path="/users/:id" component={UserDetail} exact />
          <PrivateRoutes path="/locations" component={Locations} exact />
          <PrivateRoutes
            path="/locations/:id"
            component={LocationDetail}
            exact
          />
          <PrivateRoutes path="/beacons" component={Beacons} exact />
          <PrivateRoutes path="/settings" component={Settings} exact />
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default Router;
