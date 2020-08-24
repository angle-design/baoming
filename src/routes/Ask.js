import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ask extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             问吧   
            </div>
        )
    }
}



export default connect()(Ask)
