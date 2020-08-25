import axios from './index';

//=>头条
export function querySettlement(payLoad){
    return axios.post('/api/api/index/addJg',{
        payLoad
    });
}