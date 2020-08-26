import React, { Component } from 'react';
import { connect } from 'react-redux';

class SetUp extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             设置   
            </div>
        )
    }
}



export default connect()(SetUp)
