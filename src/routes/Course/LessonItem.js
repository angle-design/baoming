import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import '../../static/css/lessonitem.less';

class CourseItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            bmflag:true
        }
    }

    render() {
        // console.log(this.props.item)
        let { id, image, name, price, objects,sid,cid,num,oldprice} = this.props.item;
        return (
            <div className="lesson-item" >
                <a onClick={(e) => {
                    if (e.target.tagName == "BUTTON") {
                        if(this.props.item.num<=0){
                            return false;
                        }
                        e.stopPropagation();
                        this.props.history.push({pathname: '/course/singup',
                        search: `id=${sid}&&cid=${id}`})
                        return false;
                    }
                    this.props.history.push("/course/lessondetail/" + id)
                }}>
                    <p>
                        <img src={image} />
                    </p>
                    <div>
                        <h4>{name}</h4>
                        <p className="shumu">课程数量：{num?num:0}</p>
                        <p className="xue">{objects}</p>
                        <p className="price"><b>¥{price}</b><font>¥{oldprice}</font> <button onClick={() => {

                        }} className={num<=0?'sale':''}>立即注册</button></p>
                    </div>
                </a>
            </div>
        )
    }
}

export default withRouter(connect()(CourseItem)) 
