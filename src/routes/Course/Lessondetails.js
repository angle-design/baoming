import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {lessonInfo,toCollect,isCollect} from '../../api/course'
import {  Toast} from 'antd-mobile';
import '../../static/css/lessondetail.less'

class Evaluate extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            data:{},
            collectflag:false
        }
    }
   async componentWillMount() {
        let result=await lessonInfo(this.props.match.params.id);
        if(result.code==200){
            console.log(result.list)
            this.setState({
                data:result.list
            })
        }
        let res =await isCollect(2,this.props.match.params.id);
        // console.log(res)
        if(res.code==200){
            this.setState({collectflag:true})
        }
    }
    render() {
        if(!this.state.data) return '';
        let {name,price,content,image,features,objects,sid}=this.state.data;
        return (
            <div className="lessonBox">
                <div className="details_top">
                    <img src={image} />
                    <p>
                        <span>{name}
                            <span>￥<font>{price}</font><b>¥188</b></span>
                        </span>
                        <i onClick={this.handleCollect} className={this.state.collectflag?'active':''}></i>
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
                        <button><Link to={{
                    pathname:'/course/singup',
                    search:  `id=${sid}&&cid=${this.props.match.params.id}`
                }}>立即报名</Link></button>
                        {/* <button>已报名</button> */}
                    </div>
                </div>
        )
    }
    handleCollect=async ()=>{
        let result=await toCollect(2,this.props.match.params.id);
        if(result.code==205){
            this.props.history.push('/my/login');
            return false;
        }else if(result.code==200){
            if (result.list.status == 2) {
                this.setState({
                    collectflag:false
                })
                return false;
              } else if (result.list.status == 1) {
                this.setState({
                    collectflag:true
                })
                Toast.info('收藏成功')
              }
        }
    }

}



export default connect()(Evaluate)
