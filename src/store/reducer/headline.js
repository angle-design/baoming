import * as TYPES from '../action-types';

let INIT_STATE = {
    headLineData:{
        flag:true,//=>有无数据
        data:[],//=>数据
        page:1
    }
};
export default function headline(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.COURSE_QUERY_HEADLINE:
            let { result:{code, list} } = action;
            if (parseFloat(code) === 200 && list) {
                state.headLineData.data=state.headLineData.data.concat(list);
                state.headLineData.page++;
                if(list.length<10){
                    state.headLineData.flag = false;
                }
            }else{
                state.headLineData.flag = false;
            }
            break;
    }
    return state;
}