import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import './Login.css';

import {
  accessTokenState,
  refreshTokenState,
  settingsState,
} from '../../atoms';
import useAxios from '../../hooks/useAxios';

type LoginData = {
  serial: string;
  password: string;
};

const Login = () => {
  const axios = useAxios();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const setSettings = useSetRecoilState(settingsState);
  const { register, handleSubmit } = useForm();

  const signIn = async ({ serial, password }: LoginData) => {
    const { access_token, refresh_token } = (
      await axios.post('/auth/token', { serial, password })
    ).data;
    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    const settings = (await axios.get('/settings/current')).data;
    setSettings(settings);
  };

  return (
    <div id="login">
      <div id="loginComponent">
        <div id="logo">
          <img src="./icons/loca_icon.svg" alt="" />
        </div>
        <div id="loginContainer">
          <form id="login_form" onSubmit={handleSubmit(signIn)}>
            <div className="caption">관리자 아이디</div>
            <input
              type="text"
              id="manager_id"
              placeholder={'00-000000'}
              {...register('serial')}
            />
            <div className="caption">비밀번호</div>
            <input type="password" id="manager_pw" {...register('password')} />
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
