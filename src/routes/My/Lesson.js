import React, { Component } from 'react';
import { connect } from 'react-redux';

class Lesson extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
            <div>
             报名课程   
            </div>
        )
    }
}



export default connect()(Lesson)
