import React,{Component} from 'react';
import ReactDOM from 'react-dom'
class ChildCounter extends Component{
  state = {q:0}
  // componentWillMount(){
  //   console.log(`child componentWillMount`);
  // }
  render(){
    return <h1>儿子 {this.state.q}</h1>
  }
  // 默认就会执行 好处 再也不需要用户手动调用setState
  static getDerivedStateFromProps(newProps){ // 属性衍生状态
    return  {q:100}
  }
  // 组件接收到新的属性 会触发此函数 第一次不执行
  // componentWillReceiveProps(newProps){ 
  //   // 可以操作状态
  // }
  componentDidMount() {
    console.log(`child componentDidMount`);
  }
  shouldComponentUpdate() { // 可以判断shouldComponentUpdate方法只有状态变化时才会更新
    return true
  }
}
export default class Counter extends Component{
  static defaultProps = { // 默认属性
    name:'zs'
  }
  constructor(props){
    super();
    console.log(props)
    this.state = { number: 0 }
  }
  // componentWillMount(){
  //   console.log('parent componentWillMount');
  // }
   render(){
     console.log('parent render');
      return (<div>
        <button onClick={()=>{
          ReactDOM.unmountComponentAtNode(window.root)
        }}>销毁</button>
         <button onClick={()=>{
           this.setState({number:this.state.number+1}
           )
         }}>+</button>
         {this.state.number}
        <button onClick={() => {
          this.setState({ number: this.state.number -1 }
          )
        }}>-</button>
        <button onClick={()=>{
          this.forceUpdate();
        }}>强制刷新(不用)</button>
        <ChildCounter n={this.state.number} ></ChildCounter>
     </div>)
  }
  // 阻断视图是否渲染
  shouldComponentUpdate(nextProps,nextState){
    console.log('parent shouldComponentUpdate')
    return true
  }
  getSnapshotBeforeUpdate(){
    return {n:1}
  }
  // componentWillUpdate(){
  //   console.log('parent componentWillUpdate');
  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot)
    console.log('parent componentDidUpdate');
  }
  componentDidMount(){
    console.log('parent componentDidMount')
  }
  componentWillUnmount(){ // 取消监听 定时器
    console.log('parent componentWillUnmount')
  }
}