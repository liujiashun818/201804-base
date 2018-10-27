import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';
import { Provider } from './react-redux';
import store from './store';
//现在我们在最外面包了一个Provider,它的作用是向下层传送store
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Counter />
            <Counter2 />
        </div>
    </Provider>, document.querySelector('#root'));
