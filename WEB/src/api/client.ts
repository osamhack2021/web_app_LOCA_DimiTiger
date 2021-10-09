import axios from 'axios';

const SERVER_URL: string = 'https://api.loca.kimjisub.me';

const client = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default client;
