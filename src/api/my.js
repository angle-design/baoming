import axios from './index';


//验证是否登录
export function checkLogin(){
    return axios.post('/api/api/my/checklogin')
}