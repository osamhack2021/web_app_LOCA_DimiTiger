import axios, { AxiosInstance } from 'axios';
import { getCookies } from './Cookies';

const SERVER_URL: string = 'https://api.loca.kimjisub.me';

export const frameAxios: AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Authorization": 'Bearer ' + getCookies('access_token'),
        "Content-Type": "application/json",
        "accept": "application/json",
    },
});

/*https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0*/