import React from 'react';
import { Provider } from './context';
/**
 * 高阶组件
 * context api
 */
export default class BaseComponent extends React.Component {
    render() {
        //接收仓库并向下传递store
        return (
            <Provider value={{ store: this.props.store }}>
                {this.props.children}
            </Provider>
        )
    }
}