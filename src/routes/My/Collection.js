import React, { Component } from 'react';
import { connect } from 'react-redux';

class Collection extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             收藏   
            </div>
        )
    }
}



export default connect()(Collection)
