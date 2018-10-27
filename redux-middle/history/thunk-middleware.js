let reduxThunk = (store)=>(dispatch)=>(action)=>{
    if(typeof action === 'object'){
      return dispatch(action);
    }
    // 将dispatch的权限交给你去操作
    if(typeof action === 'function'){
      return action(dispatch,store.getState);
    }
}