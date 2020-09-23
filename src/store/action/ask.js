import * as TYPES from '../action-types';
import { askList,questList } from '../../api/ask';
let ask = {
    //问吧首页列表
    queryAsk(p=1) {
        console.log(p);
        return async dispatch => {
            let result = await askList(p);
            dispatch({
                type: TYPES.ASK_QUERY_LIST,
                result
            });
        }
    },
    //=>问吧详情列表
    queryList(payload = {}) {
        let {id,p=1, order='',flagA = 'push'} = payload;
        return async dispatch => {
            let result = await questList({
                id,
                p,
                order
            });
            dispatch({
                type: TYPES.ASK_LISTITEM_DETAIL,
                result,
                flagA
            });
        }
    },
}
export default ask;
