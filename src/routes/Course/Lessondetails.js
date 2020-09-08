import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../static/css/lessondetail.less'
import Star from './Star';
class Evaluate extends Component {

    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {

    }
    render() {

        return (
            <div className="lessonBox">
                <div className="details_top">
                    <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg" />
                    <p>
                        <span>一起学
                            <span>￥<font>555</font><b>¥188</b></span>
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
                            <p>我</p>
                        </div>
                        <div>
                            <h3>课程特色</h3>
                            <p>我</p>
                        </div>
                        <div>
                            <h3>课程简介</h3>
                            <p>我</p>
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
