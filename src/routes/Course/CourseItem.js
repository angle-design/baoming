import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import Star from './Star'
import '../../static/css/courseitem.less'
class CourseItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let { name, cnum, logo, lever, courselist, star,bnum,id } = this.props.item;
        return (
            <div className="course-item">
                <Link to={{
                    pathname:'/course/info',
                    search: `?id=${id}`
                }}>
                {/* 左边内容 */}
                <p>
                    <font className="paiming"></font>
                    <img src={logo} />
                </p>
                {/* 右边内容 */}
                <div>
                    <h4><p>{name}<span></span></p></h4>
                    <p className="starbox"><Star star={star * 2}></Star><b>{star}</b><font>{cnum}条</font></p>
                    <p className="peobox">报名人数：{bnum?bnum:'0'}</p>
                    {courselist&&courselist.length!==0?<p className="lessona">优势课程：<font>{courselist}</font></p>:''}
                </div>
                </Link>
            </div>
        )
    }
}

export default withRouter(connect()(CourseItem)) 
