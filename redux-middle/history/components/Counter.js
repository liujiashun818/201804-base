import React from 'react';
// react想是实现页面刷新 setState
import actions from '../store/actions/counter';
import {bindActionCreators} from '../redux'
// 在组件中链接redux  
import {connect} from '../react-redux';
// 每个页面里都需要每次引入store  contextApi
// 每次都需要将store中的状态映射到组件的状态中 (高阶组件中)
// 订阅更新
class Counter extends React.Component{
  constructor(){
    super();
    // this.state = {
    //   number:store.getState().counter.number
    // }
  }
  // componentDidMount(){
  //   this.unsub = store.subscribe(()=>{
  //     this.setState({ number: store.getState().counter.number});
  //   })
  // }
  // componentWillUnmount(){
  //     this.unsub()
  // }
  render(){
    return <div>
      <button onClick={()=>{
        this.props.add(5);
      }}>+</button>
      <div>{this.props.counter.number}</div>
      <button onClick={()=>{
        this.props.minus(1);
      }}>-</button>
    </div>
  }
}
// {counter:{number:0},todo:[]}
let mapStateToProps = (state)=>({...state})

// let mapDispatchToProps = (dispatch)=>{ // store.dispatch
//   return {
//     add:(...args)=>dispatch(actions.add(...args)),
//     minus:(...args)=>dispatch(actions.minus(...args))
//   }
// }
// 两个函数
export default connect(mapStateToProps,actions)(Counter)