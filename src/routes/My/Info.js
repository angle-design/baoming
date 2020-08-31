import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link,withRouter} from 'react-router-dom';
// import { checkLogin } from '../../api/my';
import action from '../../store/action/index';

export class Info extends Component {
    constructor(props, context) {
        super(props, context);
        this.myList = [
            { name: "提问", routeto: "/my/question" },
            { name: "评论", routeto: "/my/comment" },
            { name: "收藏", routeto: "/my/collection" },
            { name: "反馈", routeto: "/my/feedback" },
            { name: "设置", routeto: "/my/setup" }
        ]
    }
    //=>验证是否登录
    async componentWillMount() {
        let {queryLoginFlag,flag,queryInfo}=this.props;
        if(!flag){
            queryLoginFlag();
            queryInfo()
        }
    }

    async componentWillReceiveProps() {
        let {queryLoginFlag,flag,queryInfo}=this.props;
        if(!flag){
            queryLoginFlag()
            queryInfo()
        }
    }
    render() {
        let {flag,uinfo}=this.props;
        return (
            <section className="my">
                <p className="my_head">
                    {flag?<img src={uinfo.a_image} />:<img src={require('../../static/image/mohead.png')} />}
                    {!flag?<span>点击登录或注册</span>:<span>{uinfo.a_uname}</span>}
                </p>
                <div className="my_hua">
                    <p  onClick={this.handleTo.bind(this,'/my/topic')}><img src={require('../../static/image/hua.png')} />我的话题</p>
                    <p  onClick={this.handleTo.bind(this,'/my/lesson')}><img src={require('../../static/image/ke.png')} />已报名课程</p>
                </div>
                <ul className="my_list">
                    {this.myList.map((item, index) => {
                        let { name, routeto } = item
                        return <li key={index} onClick={this.handleTo.bind(this,routeto)}>
                                <p>
                                    <font></font>{name}
                                </p>
                        </li>
                    })}
                </ul>
            </section>
        )
    }
    handleTo=routepath=>{
        let {flag}=this.props;
        if(flag){
            this.props.history.push(routepath);
            return false;
        }
        this.props.history.push('/my/login');
    }
}

export default withRouter(connect(state=>state.my,action.my)(Info));
