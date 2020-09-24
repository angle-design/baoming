import React, { Component } from 'react'
import { Spin, Alert } from 'antd';

export class Loading extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
            <Spin tip="Loading...">
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin></div>
        )
    }
}


export default Loading;

