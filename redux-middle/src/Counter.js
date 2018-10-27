import React from 'react';
import _ from 'lodash'
// PureComponent 引用空间发生变化后才去更新状态
// PureComponent自己实现了shouldComponentUpdate 比较的不是空间里的内容
import  {fromJS,is} from 'immutable';
class Counter extends React.Component {
  state = {
    count:fromJS({number:0})
  }
  // 自己实现的PureComponent 比较空间引用地址后 还可以比较地址中的内容

  // redux-immutable  combainReducers 
  

  shouldComponentUpdate(nextProps ={},nextState ={}){
    //return !_.isEqual(this.state,nextState);
    // {count:Map({number:1})}
    // {count:Map({number:1})}
    if(Object.keys(this.state).length != Object.keys(nextState).length ){
      return true;
    }
    for(let key in nextState){
      // 先拿出新的状态来
      // 先比较属性的空间 如果空间一样 那就不更新了
      if((nextState[key] != this.state[key]) && !is(nextState[key],this.state[key])){
          return true;
      }
    }
    return false;
  }
  render(){
    console.log('render');
    return <div>
      {this.state.count.get('number')}
      <button onClick={()=>{
        this.setState({
          count:this.state.count.update('number',(n)=>n+1)
        })
      }}>+</button>
    </div>
  }
}

export default Counter