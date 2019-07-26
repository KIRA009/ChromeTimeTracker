import axios from 'axios';
import {ROOT_URL} from './settings'
import urls from './urls'

axios.defaults.baseURL = ROOT_URL;
axios.defaults.timeout = 4000;

const getToken = () => JSON.parse(window.localStorage.getItem('Token')) || ''

const requests = {
    'auth': false,
    setToken: resp => window.localStorage.setItem('Token', JSON.stringify(resp.headers.token)),
    get: (url, params=null) =>  axios.get(`${url}`, {
        params: params,
        headers: {
            'Token': getToken()
        }
    }),
    post: (url, body) => axios({
        method: 'post',
        url: url,
        data: body,
        headers: requests.auth ? {Token: getToken()} : {}
    }),
    redirect: () => {
        window.localStorage.removeItem('Token');
        window.location.href = urls.signin.url
    }
};


export default requests