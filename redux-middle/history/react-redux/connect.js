import React from 'react';
import { Consumer } from './context';
import { bindActionCreators } from '../redux'
let connect = (mapStateToProps, mapDispatchToProps) => (Comp) => {
  // connect执行两次后 返回的是一个新的组件，渲染后的结果就是老组件
  // 封装更新的功能
  class Proxy extends React.Component {
    constructor(props) {
      super();
      this.state = mapStateToProps(props.store.getState());
    }
    componentDidMount() {
      this.props.store.subscribe(() => {
        this.setState(mapStateToProps(this.props.store.getState()))
      })
    }
    render() {
      let stateProps = this.state;
      let dipatchProps;
      // 如果是对象 调用 bindActionCreators进行包装即可
      if (typeof mapDispatchToProps === 'object') {
        dipatchProps = bindActionCreators(mapDispatchToProps, this.props.store.dispatch);
      } else {
        dipatchProps = mapDispatchToProps(this.props.store.dispatch);
      }
      return <Comp {...stateProps} {...dipatchProps}></Comp>
    }
  }
  return () => <Consumer>
    {({ store }) => {
      return <Proxy store={store}></Proxy>
    }}
  </Consumer>
}
export default connect;