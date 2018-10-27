import * as Types from '../action-types';
// 将生成action的对象的方法叫actionCreator
let actions = {
  add(num){
    // reduxThunk允许你actionCreator 返回的是一个函数，如果是函数，会让函数执行 并且把dispatch的权利转交给你 ，你可以在想要的时机派发事件
    return {type:Types.INCREMENT,count:num}
    // (dispatch,getState)=>{
    //   setTimeout(function(){
    //     dispatch({type:Types.INCREMENT,count:num});
    //   },1000);
    // }
  },
  minus(num){
    // {type:Types.DECREMENT,payload:{count:3}}
    return {
      type:Types.DECREMENT,
      payload: new Promise((resolve,reject)=>{
          if(Math.random()>0.5){
            reject({count:3})
          }else{
            resolve({count:5})
          }
      })
    }
  }
}
export default actions