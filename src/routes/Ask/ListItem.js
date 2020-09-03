import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {wenZan} from '../../api/ask.js'
import action from '../../store/action/index';
import '../../static/css/listitem.less';

class ListItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
          wendazan:0,
          huifuzan:0,
          wenflag:false,
          huiflag:false,
        }
    }
    async componentWillMount() {
      console.log(this.props.item)
      this.setState({
        wendazan:this.props.item.zan,
        huifuzan:this.props.item.qlist?this.props.item.qlist.zan:0,
      })
      let {queryLoginFlag,flag}=this.props;
      if(!flag){
          queryLoginFlag();
      }
  }
  async componentWillUpdate(nextProps, nextState) {
    if (nextState.wendazan||nextState.huifuzan) {
        console.log('new')
    }
}
    render() {
      let {uinfo,isvip,time,zan,huifu,content,qlist,id,isq}=this.props.item;

        return (
          <div className="new">
            <div className="list_body" style={{padding:'0.3rem 0 0.1rem',border:'none'}}>
            <div className="list_item">
              <div>
              {uinfo?
                <dl>
                  <dt>
                    {uinfo.a_image?<img src={uinfo.a_image} />:<img src={require('../../static/image/mohead.png')} />}
                    {isvip?<font></font>:''}
                  </dt>
                  <dd>
                    <font>{uinfo.a_uname}</font>
                    <span>{time}</span>
                  </dd>
                </dl>:''}
                <p>
                  <span onClick={this.handlewenzan.bind(this,this.state.wendazan)}>
                    <i  className={this.state.wenflag?'active':''}></i>
                    <font>{this.state.wendazan?this.state.wendazan:'0'}</font>
                  </span>
                  <span onClick={this.handleToDetail.bind(this,id)}>
                    <i></i>
                    <font>{huifu}</font>
                  </span>
                </p>
              </div>
              <p className="new_text" onClick={this.handleToDetail.bind(this,id)}>{content}</p>
            </div>
            {isq?<div className="jieda"> <img src={require('../../static/image/bi.png')}/>解答问题</div>:''}
            {qlist?<div className="list_item list_answer">
              <div>
                <dl>
                  <dt>
                  {qlist.uinfo.a_image?<img src={qlist.uinfo.a_image} />:<img src={require('../../static/image/mohead.png')} />}
                  {isvip?<font></font>:''}
                  </dt>
                  <dd>
                  <font>{qlist.uinfo.a_uname}</font>
                    <span>{time}</span>
                  </dd>
                </dl>
                <p>
                <span  onClick={this.handlehuizan.bind(this,this.state.huifuzan)}>
                    <i   className={this.state.huiflag?'active':''}></i>
                    <font>{this.state.huifuzan?this.state.huifuzan:'0'}</font>
                  </span>
                  <span onClick={this.handleToDetail.bind(this,id)}>
                    <i></i>
                    <font>{qlist.huifu}</font>
                  </span>
                </p>
              </div>
            <p className="new_text new_text_ask" onClick={this.handleToDetail.bind(this,id)}>{qlist.content}</p>
            </div>:''}
          </div>
        </div>
        )
    }
    // 问点赞
    handlewenzan=async (a)=>{
      if (this.state.wenflag) return '';
      let {flag}=this.props;
      if(!flag){
          this.props.history.push('/my/login');
          return false;
      }
      var c=parseInt(a)+1;
      let result=await wenZan(this.props.item.id);
      if (result.code==200){
          this.setState({
            wenflag:true,
            wendazan:c
        })
      }
    }
    // 回点赞
    handlehuizan=async (a)=>{
      if (this.state.huiflag) return '';
      let {flag}=this.props;
      if(!flag){
          this.props.history.push('/my/login');
          return false;
      }
      var c=parseInt(a)+1;
      let result=await wenZan(this.props.item.qlist.id);
      if (result.code==200){
          this.setState({
            huiflag:true,
            huifuzan:c
        })
      }
    }
    //点击进入详情
  handleToDetail=id=>{
    this.props.history.push({
      pathname:'/ask/replay/'+id
    })
  }
}

export default withRouter(connect(state => ({...state.ask,...state.my}), {...action.ask,...action.my})(ListItem))
