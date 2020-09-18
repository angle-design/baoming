import * as TYPES from '../action-types';
import { queryLine } from '../../api/headline';
let headline = {
    //课程头条
    queryHeadLine(p=1) {
        console.log(p);
        return async dispatch => {
            let result = await queryLine(p);
            dispatch({
                type: TYPES.COURSE_QUERY_HEADLINE,
                result
            });
        }
    },
     saveListState = (data) => {
        return () => {
            store.dispatch({
                type: LIST_STATE,
                ...data
            })
        }
    },
   
    clearListState = () => {
        return () => {
            store.dispatch({
                type: CLEAR_LIST_STATE
            })
        }
    }
}
export default headline;
