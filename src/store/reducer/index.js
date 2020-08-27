import { combineReducers } from 'redux';
import course from './course';
import headline from './headline';
import ask from './ask';
let reducer = combineReducers({
    course,
    headline,
    ask
})
export default reducer;
