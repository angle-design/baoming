import * as TYPES from '../action-types';

let INIT_STATE = {
    flag: false,
    uinfo: {}
};
export default function course(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    let payload;
    switch (action.type) {
        case TYPES.MY_LOGIN_FLAG:
            payload = action.payload;
            parseFloat(payload.code) === 200 ? state.flag = true : false
            break;
        case TYPES.MY_LOGIN_INFO:
            let { code, list } = action.result;
            if (parseFloat(code) === 200) {
                state.uinfo = list
            }
            break;
    }
    return state;
}