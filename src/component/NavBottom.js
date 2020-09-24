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
                <NavLink to="/course"><span>首页</span></NavLink>
                <NavLink to="/headline"><span>课程头条</span></NavLink>
                <NavLink to="/ask"><span>问吧</span></NavLink>
                <NavLink to="/settlement"><span>机构入驻</span></NavLink>
                <NavLink to="/my"><span>我的</span></NavLink>
            </footer>
        )
    }
}


export default withRouter(connect()(NavBottom));
