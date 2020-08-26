import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeefBack extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             反馈   
            </div>
        )
    }
}



export default connect()(FeefBack)
