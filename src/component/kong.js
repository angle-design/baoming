import React, { Component } from 'react'


export class Kong extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="kong">
                <img src={require('../static/image/kong.png')} />
                <p>{this.props.msg}</p>
            </div>
        )
    }
}


export default Kong;
