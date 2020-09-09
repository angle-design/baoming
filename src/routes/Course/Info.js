import React, { Component } from 'react';
import { connect } from 'react-redux';
import Qs from 'qs';
import { Rate } from 'antd';
import { ListView, Toast, Tabs, ImagePicker } from 'antd-mobile';
import {LogoInfo} from '../../api/course';

import '../../static/css/courseinfo.less';
import Star from './Star';
import LessonItem from './LessonItem';
import Evaluate from './Evaluate';

const desc = ['一级', '二级', '三级', '四级', '五级'];
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

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
            files: data,
            multiple: false,
            lesson:{}
        }
    }
    async componentWillMount() {
        let { location: { search } } = this.props,
            { id = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;//=>挂载到实例上
        // 获取详情
        let result =await LogoInfo(this.id);
        if(result.code==200){
            this.setState({lesson:result.list})
            console.log(this.state.lesson)
        }
    }
    render() {
        const { value } = this.state;
        const { files } = this.state;
        if (!this.state.lesson) return '';
        let {name,lever,cnum,bnum,piclist,content}=this.state.lesson;
        return (
            <div className="infoBox">
                <div className="infotop">
                    <h3>{name}<img src={require('../../static/image/jin.png')} /> <span></span></h3>
                    <p className="starcon"><Star star={lever*2}></Star><b>4.0</b>634条</p>
                    <p className="peoson">报名人数：<font>{cnum}</font></p>
                    <p className="address">朝阳区红应南路天乐园1号楼</p>
                </div>
                {piclist&&piclist.length!==0?<div className="swiperLeft">
                    <ul className="cont" >
                        {piclist.map((item,index)=>{
                            let {image,mp4}=item;
                            return  <li key={index}>
                            <p><img src={image} />{mp4?<span><img src={require('../../static/image/bo.png')} /></span>:''}</p>
                        </li>
                        })}
                    </ul>
                </div>:''}
                
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
                    <p>{content}</p>
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
                    <div className="sayping">
                        <textarea placeholder="" value="老师认真负责" rows="7" maxLength="200">
                        </textarea>
                        <div className="imgBox">
                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 3}
                                multiple={this.state.multiple}
                            />
                        </div>
                        <span>还剩<font>200</font>字～</span>
                    </div>
                    <button>提交</button>
                </div>
                <Evaluate />
            </div>
        )
    }
    handleChange = value => {
        this.setState({ value });
        return false
    };
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
}



export default connect()(Info)
