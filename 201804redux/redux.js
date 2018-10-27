


//现在规定，如果想修改state,只能通过dispatch,而不是直接修改
//规定里面只能改title.text content.color
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';//修改标题的文本
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';//修改内容的颜色
//

///通过此方法可以创建一个仓库
function createStore(reducer) {
    let state;
    let listeners = [];
    function getState() {
        return JSON.parse(JSON.stringify(state));
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    //订阅 如果有人想要监听状态变化事件，可以把监听函数传过来,然后把这个监听函数放到数组中去
    function subscribe(listener) {
        listeners.push(listener);
        //每个订阅的函数都会返回一个取消订阅的函数
        return function () {
            listeners = listeners.filter(item => item != listener);
            // let index = listeners.indexOf(listener);
            // listeners.splice(index, 1);
        }
    }
    //要先在创建仓库的时候调用一下dispatch方法，然后指定type=@@INIT,为了给state赋初值
    dispatch({ type: '@@INIT' });
    return {
        getState,
        dispatch,
        subscribe
    }
}
let initState = {
    title: {
        text: '标题',
        color: 'red'
    },
    content: {
        text: '内容',
        color: 'green'
    }
}
//处理器，接收二个参数 ，接收老状态和action，返回新状态 
function reducer(state = initState, action) {
    //判断动作的类型
    switch (action.type) {
        case UPDATE_TITLE_TEXT: //{type:UPDATE_TITLE_TEXT,text:'新标题'}
            return { ...state, title: { ...state.title, text: action.text } };
        case UPDATE_CONTENT_TEXT: //{type:UPDATE_CONTENT_COLOR,color:'blue'}
            return { ...state, content: { ...state.content, text: action.text } };
        default:
            return state;
    }
}
let store = createStore(reducer);
function renderTitle() {
    let state = store.getState();
    let titleEle = document.querySelector('#title');
    titleEle.innerHTML = state.title.text;
    titleEle.style.color = state.title.color;
}
function renderContent() {
    let state = store.getState();
    let titleEle = document.querySelector('#content');
    titleEle.innerHTML = state.content.text;
    titleEle.style.color = state.content.color;
}
let unRenderTitle = store.subscribe(renderTitle);
let unRenderContent = store.subscribe(renderContent);
renderTitle();
//希望内容只监听5秒
renderContent();
setTimeout(function () {
    unRenderContent();
}, 5000);
setInterval(function () {
    //appState.title.color = 'blue';
    store.dispatch({ type: UPDATE_TITLE_TEXT, text: '新标题' + Date.now() });
    store.dispatch({ type: UPDATE_CONTENT_TEXT, text: '新内容' + Date.now() });
}, 1000)