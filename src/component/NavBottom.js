import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';
import {Icon} from 'antd';

export class NavBottom extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <footer className="footerNavBox">
                <NavLink to="/course"><Icon type="home"/><span>首页</span></NavLink>
                <NavLink to="/headline"><Icon type="book"/><span>课程头条</span></NavLink>
                <NavLink to="/ask"><Icon type="file"/><span>问吧</span></NavLink>
                <NavLink to="/settlement"><Icon type="layout"/><span>机构入驻</span></NavLink>
                <NavLink to="/my"><Icon type="message"/><span>我的</span></NavLink>
            </footer>
        )
    }
}


export default withRouter(connect()(NavBottom));
