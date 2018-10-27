import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../store/actions/counter2';
import store from '../store';
import { connect } from '../react-redux';
class Counter extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={() => this.props.add(1)}>+</button>
                <button onClick={() => this.props.minus(2)}>-</button>
            </div>
        )
    }
}

export default connect(
    state => state.counter2, // {number:0} 返回值会成为当前组件的属性对象
    actions
)(Counter);