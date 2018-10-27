let logger = (store) => (dispatch) => (action) => {
  console.log(store.getState());
  dispatch(action);
  console.log(store.getState())
}
let applyMiddleware = (middleware) => (createStore) => (reducer) => {
  let store = createStore(reducer); // 创建store
  let middle = middleware(store);
  // dispatch代表的是新的dispatch
  let dispatch = middle(store.dispatch);  // 执行第二层函数传递原有的dispatch
  // 用新的dispatch覆盖掉老的dispatch,用户调用我们自己些的dispatch,自己可以在自己想派发的地方调用原来的dispatch进行派发动作
  return { ...store, dispatch };
}