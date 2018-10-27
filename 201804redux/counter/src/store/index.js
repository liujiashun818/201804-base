import { createStore, combineReducers } from '../redux';
import counter from './counter';
import counter2 from './counter2';

//key是用来决定合并后的状态的属性名 value是一个reducer函数用来计算新的状态
let reducer = combineReducers({
    counter,
    counter2
});
let store = createStore(reducer);
window.store = store;
export default store;