import React, { Component } from 'react';
import { connect } from 'react-redux';
import Qs from 'qs';
import { Rate } from 'antd';
import { ListView, Toast, Tabs, ImagePicker } from 'antd-mobile';
import {LogoInfo,isCollect,toCollect,lessonList,baseUpload,toPing} from '../../api/course';

import '../../static/css/courseinfo.less';
import Star from './Star';
import LessonItem from './LessonItem';
import Evaluate from './Evaluate';
import action from '../../store/action/index';

const desc = ['差评', '差评', '中评', '好评', '好评'];

class Info extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            typedata: [
                { title: '小学' },
                { title: '初中初中' },
                { title: '大学' },
                { title: '小学' },
                { title: '小学初中' },
                { title: '初中' },
                { title: '大学' }, 
                { title: '小学' },
                { title: '初中' },
                { title: '大学初中' },
                { title: '小学' },
                { title: '小学' },
                { title: '初中初中' },
                { title: '大学' }
            ],
            valueData: {
                'sid':0,
                'zong':0,
                'pingpai':0,
                'kecheng':0,
                'jiaoxue':0,
                'fuwu':0,
                'shizi':0,      
                'dianping':"老师认真负责",
                'images':''
            },
            files: [],
            multiple: false,
            lesson:{},
            collectflag:false,
            leList:[],
            isLogin:false,
            imlist:[]
        }
    }
    async componentWillMount() {
        // 验证是否登陆
        let {queryLoginFlag,flag}=this.props;
        this.setState({
            isLogin:flag
        })
        if(!flag){
            queryLoginFlag();
        }
        console.log(1)
        
        let { location: { search } } = this.props,
            { id = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;//=>挂载到实例上
        // 获取详情
        let result =await LogoInfo(this.id);
        if(result.code==200){
            // console.log(result.list)
            this.setState({lesson:result.list})
        }
        let res =await isCollect(1,this.id);
        // console.log(res)
        if(res.code==200){
            this.setState({collectflag:true})
        }
        let lessonresult = await lessonList(this.id,18);
        if(lessonresult.code==200){
            this.setState({leList:lessonresult.list})
        }
    }
    
    render() {
        const { zong,pinpai,kecheng,jiaoxue,fuwu,shizi,dianping } = this.state.valueData;
        const { files } = this.state;
        if (!this.state.lesson) return '';
        let {name,lever,cnum,bnum,piclist,content}=this.state.lesson;
        return (
            <div className="infoBox">
                <div className="infotop">
                    <h3>{name}<img src={require('../../static/image/jin.png')} /> <span onClick={this.shoucang} className={this.state.collectflag?'active':''}></span></h3>
                    <p className="starcon"><Star star={parseInt(lever*2)}></Star><b>4.0</b>634条</p>
                    <p className="peoson">报名人数：<font>{bnum}</font></p>
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
                    <Tabs tabs={this.state.typedata} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}>
                    </Tabs>
                </div>
                <div className="lessonCon">
                    {
                        this.state.leList.map((item,index)=>{
                            return <LessonItem item={item} key={index}/>
                        })
                    }
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
                            <Rate tooltips={desc} value={zong} onChange={(value)=>{
                                const {valueData}= this.state;
                                valueData.zong=value;
                                this.setState({valueData})
                            }} />
                            {zong ? <span className="ant-rate-text">{desc[zong - 1]}</span> : ''}
                        </span></li>
                        <li><font>品牌指数</font><span>
                            <Rate tooltips={desc} onChange={(value)=>{
                                const {valueData}= this.state;
                                valueData.pinpai=value;
                                this.setState({valueData})
                            }} value={pinpai} />
                            {pinpai ? <span className="ant-rate-text">{desc[pinpai - 1]}</span> : ''}
                        </span></li>
                        <li><font>课程体系</font><span>
                            <Rate tooltips={desc} onChange={(value)=>{
                                const {valueData}= this.state;
                                valueData.kecheng=value;
                                this.setState({valueData})
                            }}  value={kecheng} />
                            {kecheng ? <span className="ant-rate-text">{desc[kecheng - 1]}</span> : ''}
                        </span></li>
                        <li><font>教学成果</font><span>
                            <Rate tooltips={desc} onChange={(value)=>{
                                const {valueData}= this.state;
                                valueData.jiaoxue=value;
                                this.setState({valueData})
                            }}  value={jiaoxue} />
                            {jiaoxue ? <span className="ant-rate-text">{desc[jiaoxue - 1]}</span> : ''}
                        </span></li>
                        <li><font>师资力量</font><span>
                            <Rate tooltips={desc} onChange={(value)=>{
                                const {valueData}= this.state;
                                valueData.shizi=value;
                                this.setState({valueData})
                            }}  value={shizi} />
                            {shizi ? <span className="ant-rate-text">{desc[shizi - 1]}</span> : ''}
                        </span></li>
                        <li><font>服务质量</font><span>
                            <Rate tooltips={desc} onChange={(value)=>{
                                const {valueData}= this.state;
                                valueData.fuwu=value;
                                this.setState({valueData})
                                console.log(valueData)
                            }}  value={fuwu} />
                            {fuwu ? <span className="ant-rate-text">{desc[fuwu - 1]}</span> : ''}
                        </span></li>
                    </ul>
                    <div className="sayping">
                        <textarea placeholder="" value={dianping} rows="7" maxLength="200" onChange={(event)=>{
                              const {valueData}= this.state;
                              valueData.dianping=event.target.value;
                              this.setState({valueData})
                        }}>
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
                    <button onClick={this.toping}>提交</button>
                </div>
                <Evaluate />
            </div>
        )
    }
     toping=async ()=>{
        //  let a={...this.state.imlist};
   
        const {valueData}= this.state;
         let str;
         this.state.imlist.map((item,index)=>{
             str=item+'|'
         })
         valueData.sid=this.id;
         valueData.images=str;
         this.setState({valueData})
        //  console.log(this.state.valueData)
        let result =await toPing(this.state.valueData);
        if(result.code==200){
            Toast.info('提交成功～')
        }
    }
    // handleChange = (value,id) => {
    //     console.log(id)
    //     const {valueData}= this.state;
    //     valueData[id]=value;
    //     this.setState({valueData})
    //     console.log(valueData)
    // };
    onChange = async (files) => {
        let result =await baseUpload(files[files.length-1].url);
        if(result.code==200){
            const {imlist}=this.state;
            imlist.push(result.data.src);
            this.setState({imlist})
            console.log(this.state.imlist)
        }
        this.setState({
            files,
        });
    }
    shoucang=async ()=>{
        let result=await toCollect(1,this.id);
        // if(!this.state.isLogin){
        //     this.props.history.push('/my/login');
        //     return false;
        // }
        if(result.code=200){
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



export default connect(state=>state.my,action.my)(Info)
