import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import '../../static/css/lessonitem.less';

class CourseItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="lesson-item">
                {/* <Link to={{
                    pathname:'/course/info',
                    search: `?id=${id}`
                }}> */}
                {/* 左边内容 */}
                <p>
                    <img src="https://zgnstatic.oss-cn-beijing.aliyuncs.com/zgnimage/20200608/6dde45203a5c95fcfd1d1b1e4150883e.jpg" />
                </p>
                {/* 右边内容 */}
                <div>
                    <h4>小学数学思维训练</h4>
                    <p className="shumu">课程数量：20</p>
                   <p className="xue">小学 | 初级阶段 ｜ 小班</p>
                   <p className="price"><b>¥188</b><font>¥188</font> <button>立即注册</button></p>
                </div>
                {/* </Link> */}
            </div>
        )
    }
}

export default withRouter(connect()(CourseItem)) 
