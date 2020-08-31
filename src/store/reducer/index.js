import { combineReducers } from 'redux';
import course from './course';
import headline from './headline';
import ask from './ask';
import my from './my';
let reducer = combineReducers({
    course,
    headline,
    ask,
    my
})
export default reducer;
