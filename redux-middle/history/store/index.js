import { createStore ,compose,applyMiddleware} from '../redux';
import reducer from './reducers';
let logger1 = (store) => (next) => (action) => {
  console.log('inner 1',store.getState());
  next(action);
  console.log('outer 1',store.getState())
}
let logger2 = (store) => (next) => (action) => {
  console.log('inner 2', store.getState());
  next(action);
  console.log('outer 2', store.getState())
}
let logger3 = (store) => (next) => (action) => {
  console.log('inner 3', store.getState());
  next(action);
  console.log('outer 3', store.getState())
}
// compose 会将第一次的执行结果传给下一个函数

// applyMiddleware(logger1, logger2,logger3)(createStore)(reducer);
// 默认applyMiddleware 调用三次中间件生效
export default createStore(reducer, applyMiddleware(logger1,logger2));