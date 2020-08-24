import React, { Component } from 'react';
import { connect } from 'react-redux';

class Info extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             课程详情   
            </div>
        )
    }
}



export default connect()(Info)
