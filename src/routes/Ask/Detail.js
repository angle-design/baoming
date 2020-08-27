import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
                问吧详情   
            </div>
        )
    }
}



export default connect()(Detail)
