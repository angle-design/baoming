import React, { Component } from 'react';
import { connect } from 'react-redux';
import Qs from 'qs';
import { Rate } from 'antd';
import { ListView, Toast, Tabs } from 'antd-mobile';

import '../../static/css/courseinfo.less';
import Star from './Star';
import LessonItem from './LessonItem';

const desc = ['一级', '二级', '三级', '四级', '五级'];
class Info extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            typedata: [
                { title: '小学' },
                { title: '初中' },
                { title: '大学' },
                { title: '小学' },
                { title: '小学' },
                { title: '初中' },
                { title: '大学' }
            ],
            value: 3,
        }
    }
    componentWillMount() {
        let { location: { search } } = this.props,
            { id = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;//=>挂载到实例上
    }
    render() {
        const { value } = this.state;
        return (
            <div className="infoBox">
                <div className="infotop">
                    <h3>尚德教育（北苑分校）<img src={require('../../static/image/jin.png')} /> <span></span></h3>
                    <p className="starcon"><Star star={8}></Star><b>4.0</b>634条</p>
                    <p className="peoson">报名人数：<font>5000</font></p>
                    <p className="address">朝阳区红应南路天乐园1号楼</p>
                </div>
                <div className='topnav'>
                    <Tabs tabs={this.state.typedata} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5.6} />}>
                    </Tabs>
                </div>
                <div className="lessonCon">
                    <LessonItem />
                    <LessonItem />
                    <LessonItem />
                </div>
                <div className="jianjie">
                    <b>机构简介</b>
                    <p>哦我哦我哦我哦我哦我我哦我哦我哦我哦我哦我哦我哦我哦我我哦借卡小卡马克摩卡出门开车开车开车没开车吗课程可是每次开车慢课程卡车看卡每次看每次卡每次卡每次卡每次卡车</p>
                    <span>更多全部</span>
                </div>
                <div className="pingjia">
                    <b>我要评价</b>
                    <ul>
                        <li><font>总体评价</font> <span>
                            <Rate tooltips={desc} onChange={this.handleChange} value={value} />
                            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                        </span></li>
                        <li><font>品牌指数</font></li>
                        <li><font>课程体系</font></li>
                        <li><font>教学成果</font></li>
                        <li><font>师资力量</font></li>
                        <li><font>服务质量</font></li>
                    </ul>
                </div>
            </div>
        )
    }
    handleChange = value => {
        this.setState({ value });
        return false
    };
}



export default connect()(Info)
