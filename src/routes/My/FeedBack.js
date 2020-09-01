import React, { Component } from 'react';
import { connect } from 'react-redux';
import {feedBack} from '../../api/my'
import {Toast } from 'antd-mobile';
class FeefBack extends Component {
    constructor(props,context) {
        super(props,context);
        this.state={
            msg:''
        }
    }
    
    render() {
        return (
            <div className="feedback">
            <textarea placeholder="老师认真负责" value={this.state.msg} onChange={this.changeHandle}></textarea>
            <button onClick={this.toSend}>提交</button>
          </div>
        )
    }
    changeHandle = (e) => {
        this.setState({
            msg: e.target.value
        })
    };
    toSend=async ()=>{
        if(this.state.msg){
            let result =await feedBack(this.state.msg);
            if(result.code==200){
                Toast.info('提交成功~', 1)
            }
        }else{
            Toast.info('内容不能为空哦~', 1)
        }
    }
}



export default connect()(FeefBack)
