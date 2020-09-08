import * as TYPES from '../action-types';

let INIT_STATE = {
 logoData:{
     page:1,
     data:[],
     flag: true,
 }
};
export default function course(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // case TYPES.COURSE_LOGO_LIST:
        //     let { result: { code, list } } = action;
        //     if (parseFloat(code) === 200 && list) {
        //         if (list.length < 10) {
        //             state.logoData.data =list;
        //             state.logoData.flag = false;
        //         }else{
        //             state.logoData.data = state.logoData.data.concat(list);
        //             state.logoData.page++
        //         }
        //     } else {
        //         state.logoData.flag = false;
        //     }
        //     break;
    }
    return state;
}