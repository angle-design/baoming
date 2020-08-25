import * as TYPES from '../action-types';
import { queryLine } from '../../api/headline';
let headline = {
    //课程头条
    queryHeadLine(p) {
        return {
            type:TYPES.COURSE_QUERY_HEADLINE,
            payload:queryLine(p)
        }
    }
}
export default headline;