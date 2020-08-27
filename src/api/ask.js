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
