import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settlement extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             机构入驻   
            </div>
        )
    }
}



export default connect()(Settlement)
