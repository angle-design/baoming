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

//登陆存info
export function infoUser(){
    return axios.get('/api/api/my/getUinfo')
}


// 上传图片的接口
export function imgload(formData){
    return axios.post('/api/api/upload/uploadimage', formData, {
        contentType: false,
        processData: false,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

//获取提问接口
export function questionList(p){
    return axios.get('/api/api/my/getmyask',{
        params:{p}
      })
}

// 评论接口
export function commentList(p){
    return axios.get('/api/api/my/getmyreply',{
        params:{p}
      })
}

// 反馈接口
export function feedBack(content){
    return axios.post("/api/api/My/fankui",{
        content
    })
}

// 话题接口
export function topicList(p){
    return axios.get("/api/api/my/getmyhuati", {
        params: {
          p
        }
      })
    }