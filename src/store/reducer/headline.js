import * as TYPES from '../action-types';

let INIT_STATE = {
    headLineData:{
        page: 1,
        data:[]
    }
};
export default function headline(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.COURSE_QUERY_HEADLINE:
            let { code, list } = action.payload;
            if (parseFloat(code) === 200) {
                state.headLineData.data=list;
            }
            break;
    }
    return state;
}