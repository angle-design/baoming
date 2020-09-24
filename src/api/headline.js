import axios from './index';

//=>头条
export function queryLine(p){
    return axios.get('/api/Api/index/getNewlist',{
        params:{
            p
        }
    });
}