///把二个reducer合并成一个reducer来处理
//把二个reducer里各自维护的状态也合并成一个大状态
export default function combineReducers(reducers) {
    //这个函数就是最终的合并后的reducer
    //reducer是用来接收action并计算新状态 
    return function (state = {}, action) {
        let newState = {};//先声明一个空的合并后的新状态对象
        for (let key in reducers) {//[a,b]
            //先得到这个key对应的reducer,然后传入这个key对应的子状态和动作，返回新状态 
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}
/**
 * {
 *    a:{number:0}.
 *    b:{number:0}
 * }
 */