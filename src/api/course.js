import axios from './index';
import { func } from 'prop-types';

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

// 机构详情
export function LogoInfo(sid){
    return axios.get("/api/api/school/getSinfo", {
        params: {
            sid
          }
    })
}

// 判断用户是不是收藏了
// export function isCollect(){
//     return axios.get("/api/api/school/checkiscollect", {
//         params: {
//             sid
//           }
//     })
// }