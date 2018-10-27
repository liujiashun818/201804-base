import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
ReactDOM.render(
<App/>, document.querySelector('#root'));
//当你启动了热更新之后，那么module.hot=true
if(module.hot){
    //会接收文件的改变，当文件发生改变后，会执行对应的回调函数
   module.hot.accept(['./App'],function(){
       let App = require('./App').default;
    ReactDOM.render(
        <App/>, document.querySelector('#root'));
   });
}