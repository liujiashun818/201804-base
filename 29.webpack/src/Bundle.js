import React, { Component } from 'react';
export default class Bundle extends Component {
    state = {
        Mod:null
    }
    componentWillMount(){
        this.props.load().then(mod=>{
            this.setState({Mod:mod.__esModule?mod.default:mod});
        });
    }
    render(){
        let Mod = this.state.Mod;
        return Mod?<Mod/>:null;
    }
}