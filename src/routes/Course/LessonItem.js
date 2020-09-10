import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import '../../static/css/lessonitem.less';

class CourseItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        // console.log(this.props.item)
        let {id,image,name,price,objects}=this.props.item;
        return (
            <div className="lesson-item">
                <Link to={{
                    pathname:'/course/lessondetail',
                    search: `?id=${id}`
                }}>
                {/* 左边内容 */}
                <p>
                    <img src={image} />
                </p>
                {/* 右边内容 */}
                <div>
                    <h4>{name}</h4>
                    <p className="shumu">课程数量：20</p>
            <p className="xue">{objects}</p>
            <p className="price"><b>¥{price}</b><font>¥188</font> <button>立即注册</button></p>
                </div>
                </Link>
            </div>
        )
    }
}

export default withRouter(connect()(CourseItem)) 
