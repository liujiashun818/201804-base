// redux - createStore reducer action
import { createStore } from './redux';
import $ from 'jquery';
// 所有的动作都有一个{type:'DECREMENT',count:1}
// action-types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT'
function reducer(state = { number: 1 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + action.count };
      break;
    case DECREMENT:
      return { number: state.number - action.count };
      break;
  }
  return state;
}
let store = createStore(reducer);
// 获取容器中的状态
$('#count').html(store.getState().number);
let unsub = store.subscribe(function(){
  $('#count').html(store.getState().number);
});
$('#add').on('click',function () {
  store.dispatch({ type: INCREMENT,count:5})
  unsub();
})
$('#minus').on('click', function () {
  store.dispatch({ type: DECREMENT, count: 3 })
})
