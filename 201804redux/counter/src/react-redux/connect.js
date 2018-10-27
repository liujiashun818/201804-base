import React from 'react';
import { bindActionCreator } from '../redux';
import { Consumer } from './context';
//把仓库和组件连接在一起
//1把状态映射为组件属性 2 把 dispatch方法映射为组件的属性
export default function (mapStateToProps, mapDispatchToProps) {
    return function (Comp) {
        class WrappedComponent extends React.Component {
            //把mapStateToProps的结果当成当前组件的状态对象
            state = mapStateToProps(this.props.store.getState());
            componentWillMount() {
                this.unsubscribe = this.props.store.subscribe(() => {
                    this.setState(mapStateToProps(this.props.store.getState()));
                });
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                //实现了动作对象和dispatch的绑定
                let newActions = bindActionCreator(mapDispatchToProps, this.props.store.dispatch);
                return <Comp {...this.state} {...newActions} />
            }
        }
        return () => (
            //通过consumer接收仓库并且
            <Consumer>
                {
                    ({ store }) => <WrappedComponent store={store} />
                }
            </Consumer>
        );
    }
}