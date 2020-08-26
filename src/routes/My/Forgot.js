import React, { Component } from 'react';
import { connect } from 'react-redux';

class Forgot extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             忘记密码   
            </div>
        )
    }
}



export default connect()(Forgot)
