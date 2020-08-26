import React, { Component } from 'react';
import { connect } from 'react-redux';

class Topic extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             话题   
            </div>
        )
    }
}



export default connect()(Topic)
