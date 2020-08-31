import * as TYPES from '../action-types';

let INIT_STATE = {
    askListData: {
        flag: true,//=>有无数据
        topList: [],
        data: [],//=>数据
        page: 1
    },
    askInfoList: {
        page: 1,
        data: [],
        flag: true,
        count: {}
    }
};
export default function headline(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.ASK_QUERY_LIST:
            let { result: { code, list } } = action;
            // console.log(p,1111)
            if (parseFloat(code) === 200 && list) {
                state.askListData.topList = list.slice(0, 3);
                if (list.length < 10) {
                    state.askListData.data = list.slice(3);
                    state.askListData.flag = false;
                } else {
                    state.askListData.page++;
                    state.askListData.data = state.askListData.data.concat(list);
                }

            } else {
                state.askListData.flag = false;
            }
            break;
        case TYPES.ASK_LISTITEM_DETAIL:
            if (parseFloat(action.result.code) === 200 && action.result.list) {
                if (action.result.list.length < 10) {
                    state.askInfoList.count = action.result.count;
                    state.askInfoList.data =action.result.list;
                    state.askInfoList.flag = false;
                }else{
                    state.askInfoList.count = action.result.count;
                    state.askInfoList.data = state.askInfoList.data.concat(action.result.list);
                    state.askInfoList.page++
                }
            } else {
                state.askInfoList.flag = false;
            }
            break;
    }
    return state;
}