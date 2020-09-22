import React, { Component } from 'react'
import '../static/css/loading.less'
export class LoadPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="loader">
        <div className="loader-inner ball-clip-rotate">
          <div></div>
        </div>
      </div>
        )
    }
}


export default LoadPage;

