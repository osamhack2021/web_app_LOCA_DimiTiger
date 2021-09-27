import { getCookies } from './Cookies';

const isLogin = () => {
    return !!getCookies('access_token');
}

export default isLogin;