import * as TYPES from '../action-types';
import { askList } from '../../api/ask';
let ask = {
    //课程头条
    queryAsk(p=1) {
        console.log(p);
        return async dispatch => {
            let result = await askList(p);
            dispatch({
                type: TYPES.ASK_QUERY_LIST,
                result
            });
        }
    }
}
export default ask;
