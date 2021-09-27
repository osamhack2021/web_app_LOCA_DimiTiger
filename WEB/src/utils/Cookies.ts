import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookies = (name: string, value: string, opiton?: any) => {
    return cookies.set(name, value, { ...opiton });
}

export const getCookies = (name: string) => {
    return cookies.get(name);
}