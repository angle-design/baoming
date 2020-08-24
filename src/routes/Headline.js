import React, { Component } from 'react';
import { connect } from 'react-redux';

class Headline extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             课程头条   
            </div>
        )
    }
}



export default connect()(Headline)
