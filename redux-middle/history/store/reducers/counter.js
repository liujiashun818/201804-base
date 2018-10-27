import * as Types from'../action-types';
function counter(state = Map({ number: 1 }), action) {
  switch (action.type) {
    case Types.INCREMENT:
    // {type:Types.DECREMENT,payload:{count:3}}
      return state.update('number',(n)=>n+1);
      break;
    case Types.DECREMENT:
      console.log(action)
      return state.update('number',(n)=>n-1);
      break;
  }
  return state;
}
export default counter;

// Map {counter:Map {number:1}, todo:List []}


// this.state.getIn([counter,number])

// mobx 版本 todoList
// saga 版本 todoList
// react-redux 版本 immutable
// webpack 