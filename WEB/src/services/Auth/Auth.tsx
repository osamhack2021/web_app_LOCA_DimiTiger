import { frameAxios } from '../../utils/Axios';
import { setCookies } from '../../utils/Cookies';

const LOGIN = '/auth/token';

class Auth {
    access_token: String = "";

    login = async(data: object) => {
        try {
            const res = await frameAxios.post(LOGIN, data);
            this.set(res.data.access_token, res.data.refresh_token);
            return res;
        }
        catch(e: any) {
            switch(e.response.data.statusCode) {
                case 400:
                    alert('관리자 아이디 또는 비밀번호를 입력해주세요.');
                    break;
                case 401:
                    alert(e.response.data.message);
                    break;
            }
            return e.response;
        }
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
    }

    remove = () => {
        // access_token 삭제
    }
}

export default new Auth();