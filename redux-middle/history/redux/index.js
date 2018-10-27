let createStore = (reducer,fn) => {
  let state;
  let listeners = [];
  let dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(fn => fn());
  }
  let subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(fn => fn != listener)
    }
  }
  immer
  let getState = () => state;
  // 将状态改成默认的内容 {number:1}
  dispatch({ type: '@INIT' });
  if(typeof fn === 'function'){
    // 如果是中间件 执行两次 返回一个store
    return fn(createStore)(reducer);
  }
  return {
    dispatch,
    subscribe,
    getState
  }
}

let combineReducers = (reducers) => {
  return (state = {}, action) => {
    let obj = {};
    for (let key in reducers) {
      // 让每一个reducer执行将执行后的结果作为新的状态
      obj[key] = reducers[key](state[key], action);
    }
    return obj;
  }
}
let bindActionCreators = (actions,dispatch)=>{
    let obj = {}
    for(let key in actions){
      obj[key] = (...args)=>{
        dispatch(actions[key](...args))
      }
    }
    return obj;
}
let compose = (...fns) => {
  if (fns.length === 1) {
    return fns[0];
  }
  // reduce的返回值是一个新的函数
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}
let applyMiddleware = (...middlewares) => (createStore) => (reducer) => {
  let store = createStore(reducer);
  let middles = middlewares.map(middleware => middleware(store));
  let dispatch = compose(...middles)(store.dispatch);
  return { ...store, dispatch };
}
export {
  createStore,
  combineReducers,
  bindActionCreators,
  compose,
  applyMiddleware
}


// compose  组合 reduce

// function len(str) {
//   return str.length;
// }
// function toUpperCase(str) {
//   return str.toUpperCase();
// }
// function sum(a, b) {
//   return a + b;
// }
// let compose = (...fns) => {
//   return fns.reduce((a, b) => (...args) => a(b(...args)));
// }
// // ()=>len(toUpperCase())
// // a= (...args)=>len(toUpperCase(...args)) b=sum
// // (a,b)=>()=>len(toUpperCase('ab'))
// let r = compose(len, toUpperCase, sum)('a', 'b');
// console.log(r);