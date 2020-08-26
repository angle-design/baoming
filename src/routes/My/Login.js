import React, { Component } from 'react';
import { connect } from 'react-redux';

class My extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             登录   
            </div>
        )
    }
}



export default connect()(My)
