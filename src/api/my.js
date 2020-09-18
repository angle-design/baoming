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
    },{headers:{'isLoading':false}})
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
    // /api/api/my/setMyinfo
    //设置头像修改用户名
    export function setMyinfo(image,auname,sex){
        return axios.post("/api/api/my/setMyinfo",{
            image,
            auname,
            sex
        })
    }

    // 退出登陆
    export function checkLoginOut(){
        return axios.get('/api/api/user/logout')
    }

    //修改密码
    export function savepassword(phone,code,passwd1,passwd2){
        return axios.post('/api/api/user/Cpasswd',{
            phone,code,passwd1,passwd2
        })
    }

    // 注册
     export function register(phone,passwd,code){
        return axios.post(' /api/api/user/register',{
            phone,passwd,code
        })
       
     }

    //  获取已报名课程
    export function lessonbao(){
        return axios.get('/api/api/my/getMycourse')
    }

    // 搜藏机构
    export function logoList(type){
        return axios.get('/api/api/my/getMycollect',{
            params: {
                type
              }
        })
    }

    // 删除话题
    export function deletTotic(id){
        return axios.post('/api/api/my/delmyhuati',{
                id
        })
    }