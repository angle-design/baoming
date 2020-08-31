import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import '../../static/css/listitem.less';

class ListItem extends Component {
    constructor(props, context) {
        super(props, context)
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
                  <span>
                    <i></i>
                    <font>{zan?zan:'0'}</font>
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
                <span>
                    <i></i>
                    <font>{qlist.zan?qlist.zan:'0'}</font>
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
    //点击进入详情
  handleToDetail=id=>{
    this.props.history.push({
      pathname:'/ask/replay/'+id
    })
  }
}

export default withRouter(connect()(ListItem))
