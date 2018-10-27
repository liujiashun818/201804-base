export default function createStore(reducer) {
    let state;
    let listeners = [];
    function getState() {
        return JSON.parse(JSON.stringify(state));
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    //订阅 如果有人想要监听状态变化事件，可以把监听函数传过来,然后把这个监听函数放到数组中去
    function subscribe(listener) {
        listeners.push(listener);
        //每个订阅的函数都会返回一个取消订阅的函数
        return function () {
            listeners = listeners.filter(item => item != listener);
            // let index = listeners.indexOf(listener);
            // listeners.splice(index, 1);
        }
    }
    //要先在创建仓库的时候调用一下dispatch方法，然后指定type=@@INIT,为了给state赋初值
    dispatch({ type: '@@INIT' });
    return {
        getState,
        dispatch,
        subscribe
    }
}