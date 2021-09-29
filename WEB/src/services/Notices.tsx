import { frameAxios } from '../utils/Axios';

const NOTICE = '/notices';

class Notices {
    getNotices = async () => {
        try {
            const res = await frameAxios.get(NOTICE);
            return res;
        }
        catch(e: any) {
            switch(e.response.data.statusCode) {
                case 400:
                    alert('');
                    break;
                case 401:
                    alert(e.response.data.message);
                    break;
                default :
                    alert(e.response.data.message);
                    break;
            }
            return e.response;
        }
    }

    addNotices = async (data: object) => {
        try {
            const res = await frameAxios.get(NOTICE, data);
            return res;
        }
        catch(e: any) {
            switch(e.response.data.statusCode) {
                case 400:
                    alert('');
                    break;
                case 401:
                    alert(e.response.data.message);
                    break;
                default :
                    alert(e.response.data.message);
                    break;
            }
            return e.response;
        }
    }
}

export default new Notices();