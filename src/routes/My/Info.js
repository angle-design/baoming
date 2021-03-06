import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link,withRouter} from 'react-router-dom';
// import { checkLogin } from '../../api/my';
import action from '../../store/action/index';
import Star from '../../component/star';
import {MingShi } from '../../api/ask'
export class Info extends Component {
    constructor(props, context) {
        super(props, context);
        this.myList = [
            { name: "提问", routeto: "/my/question" },
            { name: "评论", routeto: "/my/comment" },
            { name: "收藏", routeto: "/my/collection" },
            { name: "反馈", routeto: "/my/feedback" },
            { name: "设置", routeto: "/my/setup" }
        ],
        this.state={
            one:0,
            two:0,
            three:0,
            shi:0
        }
    }
    //=>验证是否登录
    async componentWillMount() {
        let {queryLoginFlag,flag,queryInfo}=this.props;
        if(!flag){
            queryLoginFlag();
            queryInfo()
        }
        let result=await MingShi();
        if(result.code==200){
            this.setState({
                shi:1
            })
        }else if(result.code==206){
            this.setState({
                shi:2
            })
        }else if(result.code==207){
            this.setState({
                shi:3
            })
        }
    }
    render() {
        document.title = "我的";
        let {flag,uinfo}=this.props;
        return (
            <section className="my">
                <p className="my_head">
                    {flag&&uinfo.a_image?<img src={uinfo.a_image} />:<img src={require('../../static/image/mohead.png')} />}
                    {!flag?<span onClick={()=>{
                          this.props.history.push('/my/login');
                    }}>点击登录或注册</span>:<span>{uinfo.a_uname}</span>}
                    {this.state.shi>1?<font  onClick={this.handleTo.bind(this,'/my/teacher')}>{this.state.shi==2?'名师申请中':'申请名师'}</font>:''}
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
