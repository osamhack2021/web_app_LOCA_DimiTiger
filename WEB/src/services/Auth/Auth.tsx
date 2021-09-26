import { frameAxios } from '../../api/Axios';
import { setCookies } from '../../api/Cookies';

const LOGIN = '/auth/token';

class Auth {
    access_token: String = "";

    login = async(data: object) => {
        const res = await frameAxios.post(LOGIN, data);
        this.set(res.data.access_token, res.data.refresh_token);
        return res.data;
    }

    get = () => {
        return this.access_token;
    }

    set = (access_token: string, refresh_token: string) => {
        // access_token 저장 처리
        if(access_token) {
            setCookies('access_token', access_token, {
                path: '/',
                secure: true,
                sameSite: 'none',
            })
            setCookies('refresh_token', refresh_token, {
                path: '/',
                secure: true,
                sameSite: 'none',
            })
        }
        console.log(access_token);
    }

    remove = () => {
        // access_token 삭제
    }
}

export default new Auth();