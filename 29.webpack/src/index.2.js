import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Bundle from './Bundle';
const Home = () => <div>Home</div>
const DynamicAbout = ()=><Bundle load={()=>import(/* webpackChunkName: "about" */'./About')}/>
ReactDOM.render(
    <Router>
        <React.Fragment>
            <Link to="/">首页</Link>
            <Link to="/about">关于我们</Link>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={DynamicAbout} />
        </React.Fragment>
    </Router>
    , document.querySelector('#root'));