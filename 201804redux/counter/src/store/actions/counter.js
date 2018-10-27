// actionCreator 其实就是指提用来创建action的函数
import * as actionTypes from '../action-types';
export default {
    add(payload) {
        return { type: actionTypes.ADD, payload };
        // dispatch({ type: actionTypes.ADD });
    },
    minus(payload) {
        return { type: actionTypes.MINUS, payload };
        // dispatch({ type: actionTypes.MINUS });
    }
}