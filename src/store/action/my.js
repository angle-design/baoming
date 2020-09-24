import * as TYPES from '../action-types';
import { checkLogin,infoUser } from '../../api/my';
let ask = {
    //存储登陆状态
    queryLoginFlag(){
        return {
            type:TYPES.MY_LOGIN_FLAG,
            payload:checkLogin()
        }
    },

    //存储用户信息
    queryInfo(){
        return async dispatch => {
            let result = await infoUser();
            dispatch({
                type: TYPES.MY_LOGIN_INFO,
                result
            });
        }
    }
}
export default ask;
