import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider as P} from './context.js';
// 只提供服务 将store 用于别人消费
export default class Provider extends Component{
   constructor(){
        super();
   }
   render(){
      return (<P value={{store:this.props.store}}>
        {this.props.children}
     </P>)
 }
}