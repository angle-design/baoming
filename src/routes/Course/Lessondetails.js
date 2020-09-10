import React, { Component } from 'react';
import { connect } from 'react-redux';
import Qs from 'qs';
import {lessonInfo} from '../../api/course'

import '../../static/css/lessondetail.less'
import Star from './Star';

class Evaluate extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            data:{}
        }
    }
   async componentWillMount() {
        let { location: { search } } = this.props,
            { id = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;//=>挂载到实例上
        let result=await lessonInfo(this.id);
        if(result.code==200){
            console.log(result.list)
            this.setState({
                data:result.list
            })
        }
    }
    render() {
        if(!this.state.data) return '';
        let {name,price,content,image,features,objects}=this.state.data;
        return (
            <div className="lessonBox">
                <div className="details_top">
                    <img src={image} />
                    <p>
                        <span>{name}
                            <span>￥<font>{price}</font><b>¥188</b></span>
                        </span>
                        <i></i>
                    </p>
                    <ul>
                        <li>
                            <img src={require('../../static/image/a_01.jpg')}/>
                            <span>适用人群</span>
                            <p>3-6岁</p>
                        </li>
                        <li>
                            <img src={require('../../static/image/a_02.jpg')}/>
                            <span>适合基础</span>
                            <p>3-6岁</p>
                        </li>
                        <li>
                            <img src={require('../../static/image/a_03.jpg')}/>
                            <span>班型</span>
                            <p>3-6岁</p>
                        </li>
                        <li>
                            <img src={require('../../static/image/a_04.jpg')}/>
                            <span>课时数</span>
                            <p>3-6岁</p>
                        </li>
                    </ul>
                </div>
                    <div className="details_con">
                        <div>
                            <h3>适用对象</h3>
                            <p>{objects}</p>
                        </div>
                        <div>
                            <h3>课程特色</h3>
                            <p>{features}</p>
                        </div>
                        <div>
                            <h3>课程简介</h3>
                            <p  dangerouslySetInnerHTML={{__html: content}}></p>
                        </div>
                    </div>
                    <div className="fix_bottom">
                        <button>立即报名</button>
                        {/* <button>已报名</button> */}
                    </div>
                </div>
        )
    }

}



export default connect()(Evaluate)
