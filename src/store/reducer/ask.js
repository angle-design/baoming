import * as TYPES from '../action-types';

let INIT_STATE = {
    askListData:{
        flag:true,//=>有无数据
        topList:[],
        data:[],//=>数据
        page:1
    }
};
export default function headline(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.ASK_QUERY_LIST:
            let { result:{code, list} } = action;
            // console.log(p,1111)
            if (parseFloat(code) === 200 && list) {
                state.askListData.topList =list.slice(0,3);
                state.askListData.data=list.slice(3);
                state.askListData.data=state.askListData.data.concat(list);
                state.askListData.page++
            }else{
                state.askListData.flag = false;
            }
            break;
    }
    return state;
}