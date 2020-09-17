import React, { Component } from 'react'
import '../static/css/loading.less'
export class LoadPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="la-ball-pulse-sync">
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}


export default LoadPage;

