import axios from './index';

// banner图接口
export function bannerList(){
    return axios.get('/api/api/index/getSlider')
}

// 首页分类
export function typeList(){
    return axios.get('/api/api/school/getScate')
}

//获取机构列表

export function logoList(cid,p){
    return axios.get('/api/api/school/getSlist',{
        params: {
            cid,
            p
          }
    })
}
// 搜索结果
export function seaList(key,p){
    return axios.get('/api/api/school/getSearchSchool',{
        params:{
            key,
            p
        }
    })
}