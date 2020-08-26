import axios from './index';


//验证是否登录
export function checkLogin(){
    return axios.post('/api/api/my/checklogin')
}

//登陆
export function login(payload={}){
    return axios.post('/api/api/user/login',{
       ...payload
    })
}

//发送验证码
export function getCodeMa(phone){
    return axios.post('/api/user/send_SMS',{
        ...phone
    })
}

//验证码登陆
export function codeLogin(payload){
    return axios.post('/api/user/Ylogin',{
        ...payload
    })
}
