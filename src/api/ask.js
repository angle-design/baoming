import axios from './index';
import { func } from 'prop-types';

//=>问吧列表
export function askList(p=1){
    return axios.get('/api/api/Ask/Glist', {
      params:{
        p
      }
  });
}
// 问吧左滑列表
export function askLeft(){
  return axios.get('/api/api/Ask/Guser')
}

//获取详情
export function askInfo(id){
  return axios.get("/api/api/Ask/Hinfo", {
    params: {
      id
    }
  })
}

///=>获取问答列表
export function questList(payload){
  return axios.get("/api/api/Ask/getAlist",{
    params:payload,
    headers:{'isLoading':false}
  })
}
// getreplyinfo
// 回复详情
export function querytop(aid){
  return axios.get("/api/api/Ask/getreplyinfo",{
    params:{
      aid:aid
    }
  })
}

//回复
export function fuList(aid,p){
  return axios.get("/api/api/Ask/getreply", {
    params: {
      aid: aid,
      p:p
    }
  })
}

// 提交回复
export function replyList(payLoad){
  return axios.post('/api/api/Ask/addreply',payLoad)
}


// 提交问吧
export function askCommit(payLoad){
  return axios.post('/api/api/Ask/addhuati',payLoad)
}

// /api/api/Ask/haddzan

// 详情浮窗点赞
export function fuZan(aid){
  return axios.post('/api/api/Ask/haddzan',{aid})
}


// 问答的点赞
export function wenZan(aid){
  return axios.post('/api/api/Ask/addzan',{aid})
}

// 三次点赞
export function readZan(aid){
  return axios.post('/api/api/Ask/readdzan',{aid})
}
