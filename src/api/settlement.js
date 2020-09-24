import axios from './index';

//=>机构入驻
export function querySettlement(payLoad={}){
    return axios.post('/api/api/index/addJg',{
        ...payLoad
    });
}