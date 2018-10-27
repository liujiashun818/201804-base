function reduxPromise(store) {
  return (dispatch) => {
    return (action) => {
      if (typeof action.then === 'function') {
        return action.then(dispatch);  // 成功
      }
      if (typeof action.payload.then === 'function') {
        action.payload.then(data => {
          // 把结果作为新的action 发送出去
          return dispatch({ ...action, payload: data });
        }).catch(err => {
          return dispatch({ ...action, payload: err });
        });
        return; // 否则会继续向下执行
      }
      return dispatch(action);
    }
  }
}