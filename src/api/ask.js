import axios from './index';

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
export function questList(p,id){
  return axios.get("/api/api/Ask/getAlist",{
    params:{
      p,
      id
    }
  })
}