import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import '../../static/css/lessonitem.less';

class CourseItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        // console.log(this.props.item)
        let { id, image, name, price, objects } = this.props.item;
        return (
            <div className="lesson-item" >
                <a onClick={(e) => {
                    if (e.target.tagName == "BUTTON") {
                        e.stopPropagation();
                        this.props.history.push(  {pathname: '/course/singup',
                        search: `id=${id}&&a=2`})

                        // this.props.history.push("/course/singup/" + id)
                        // 真正的处理过程在这里
                        return false;
                    }
                    this.props.history.push("/course/lessondetail/" + id)
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
                        <p className="price"><b>¥{price}</b><font>¥188</font> <button onClick={() => {

                        }}>立即注册</button></p>
                    </div>
                </a>
            </div>
        )
    }
}

export default withRouter(connect()(CourseItem)) 
