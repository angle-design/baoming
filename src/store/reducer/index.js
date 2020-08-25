import { combineReducers } from 'redux';
import course from './course';
import headline from './headline';

let reducer = combineReducers({
    course,
    headline
})
export default reducer;
