import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             提问   
            </div>
        )
    }
}



export default connect()(Question)
