import counter from './counter';
import todo from  './todo';
import {combineReducers} from  '../../redux';
// 合并的是状态 状态管理的特点 就是一个store
export default combineReducers({ counter, todo });