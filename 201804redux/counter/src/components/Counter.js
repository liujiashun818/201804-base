import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../store/actions/counter';
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
/**
 * connect里有二个东西需要定制
 * 1. 输入 把仓库中的状态树传递进组件，成为组件属性
 * 2. 输出 把在界面的中的操作通过dispatch派出给仓库，从而修改仓库中的状态
 */
export default connect(
    state => state.counter, // {number:0} 返回值会成为当前组件的属性对象
    actions
)(Counter);
