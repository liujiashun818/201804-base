- actionCreator
- bindActionCreator
- combineReducers
contex api如何 用?
let context = React.createContext();
{Provider,Consumer}
<Provider value={{name:'zfpx'}}>
   这里放子组件
</Provider>

<Consumer>
{
   (value)=><div>{value.name}</div>
}
</Consumer>
