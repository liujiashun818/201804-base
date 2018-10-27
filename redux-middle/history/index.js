import React,{Component} from 'react'
import {render} from 'react-dom'
import Counter from './components/Counter'
import Todo from './components/Todo'
// Provider这个是自己实现的组件
import {Provider} from './react-redux'

import store from './store'; // 引入store
render(<Provider store={store}>
  <React.Fragment>
    <Counter></Counter>
    <Todo></Todo>
  </React.Fragment>
</Provider>,window.root);