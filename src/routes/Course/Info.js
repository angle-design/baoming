import React, { Component } from 'react';
import { connect } from 'react-redux';
import Qs from 'qs';

import { Rate } from 'antd';
import { ListView, Toast, Tabs, ImagePicker } from 'antd-mobile';
import lrz from 'lrz';
import { LogoInfo, isCollect, toCollect, lessonList, baseUpload, toPing } from '../../api/course';

import '../../static/css/courseinfo.less';
import Star from './Star';
import LessonItem from './LessonItem';
import Evaluate from './Evaluate';
import action from '../../store/action/index';
import LoadPage from '../../component/LoadPage'
import {ao} from "../../unti";
import StarRatingComponent from 'react-star-rating-component';
const desc = ['差评', '差评', '中评', '好评', '好评'];

class Info extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            activeid: '',
            valueData: {
                'sid': 0,
                'zong': 0,
                'pinpai': 0,
                'kecheng': 0,
                'jiaoxue': 0,
                'fuwu': 0,
                'shizi': 0,
                'dianping': "",
                'images': ''
            },
            files: [],
            multiple: false,
            lesson: {},
            collectflag: false,
            leList: [],
            isLogin: false,
            imlist: [],
            videoflag: false,
            src: '',
            zilength:200,
            height: 0,//=>字高度
            contentflag: true,//=>控制字展开收起
            idid:0,
            ii:false,
            rating:1
        }
    }
    async componentWillMount() {
        ao();
        document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部

        // 验证是否登陆
        let { queryLoginFlag, flag } = this.props;
        this.setState({
            isLogin: flag
        })
        // if (!flag) {
        //     queryLoginFlag();
        // }
        // console.log(this.state.isLogin,22222)
        let { location: { search } } = this.props,
            { id = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;//=>挂载到实例上
        // 获取详情
        let result = await LogoInfo(this.id);
        if (result.code == 200) {
            console.log(result.list.clist)
            if (result.list.clist && result.list.clist.length !== 0) {
                this.setState({ lesson: result.list, activeid: result.list.clist[0].id });
                let lessonresult = await lessonList(this.id, result.list.clist[0].id);
                if (lessonresult.code == 200) {
                    this.setState({ leList: lessonresult.list })
                }
            } else {
                this.setState({ lesson: result.list })
            }
            let { conText } = this.refs;
            this.setState({
                height: conText.scrollHeight
            },()=>{
                if (this.state.height > 105) {
                    this.setState({
                        contentflag: true
                    })
                }
            })
            
            
        }
        let res = await isCollect(1, this.id);
        // console.log(res)
        if (res.code == 200) {
            this.setState({ collectflag: true })
        }

    }
    componentWillReceiveProps(nextProps){
        if(this.props.flag !== nextProps.flag){
            this.setState({
                isLogin:nextProps.flag
           })
    }
}
    //  shouldComponentUpdate(newProps) {
    //   return newProps.flag!==this.state.isLogin
    //  }
    render() {
        document.title = this.state.lesson.name?this.state.lesson.name:'';
        const { zong, pinpai, kecheng, jiaoxue, fuwu, shizi, dianping, address } = this.state.valueData;
        const { rating } = this.state;
        const { files } = this.state;
        if (!this.state.lesson) return '';
        let { name, star, cnum, bnum, piclist, content, clist } = this.state.lesson;
        return (
            <div className="infoBox">
                <div className="infotop">
                    <h3>{name}<img src={require('../../static/image/jin.png')} /> <span onClick={this.shoucang} className={this.state.collectflag ? 'active' : ''}></span></h3>
                    <p className="starcon">{star ? <Star star={parseInt(star) * 2}></Star> : ''}<b>{star}</b>{cnum}条</p>
                    <p className="peoson">报名人数：<font>{bnum}</font></p>
                    <p className="address">{address}</p>
                </div>
                {piclist && piclist.length !== 0 ? <div className="swiperLeft">
                    <ul className="cont" >
                        {piclist.map((item, index) => {
                            let { image, mp4 } = item;
                            return <li key={index}>
                                <p><img src={image} />{mp4 ? <span onClick={this.playvideo.bind(this, mp4)}><img src={require('../../static/image/bo.png')} /></span> : ''}</p>
                            </li>
                        })}
                    </ul>
                </div> : ''}
                {clist && clist.length !== 0 ? <div className='topnav'>
                    <div className="nav">
                        <ul id="nav" ref="nav">
                            {clist.map((item, index) => {
                                return <li onClick={this.handleClick.bind(this, item.id)} key={index} className={this.state.activeid == item.id ? 'active' : ''}>{item.name}</li>
                            })}
                        </ul>
                    </div>
                </div> : ''}
                {this.state.leList && this.state.leList.length !== 0 ? <div className="lessonCon">
                    {
                        this.state.leList.map((item, index) => {
                            return <LessonItem item={item} key={index} />
                        })
                    }
                </div> : ''}

                <div className="jianjie">
                    <b>机构简介</b>
                   <p> <span className="neirong" className={this.state.contentflag ? 'neirong heightauto' : 'neirong'} ref="conText">{content}</span>
                        <span>
                            {this.state.height > 100 ?
                                this.state.contentflag ?
                                    <font onClick={() => {
                                        this.setState({
                                            contentflag: false
                                        })
                                    }}>查看完整简介</font>
                                    : <font onClick={() => {
                                        this.setState({
                                            contentflag: true
                                        })
                                    }}>收起内容</font>
                                : ''}
                        </span></p>
                </div>
                <div className="pingjia">
                    <b>我要评价</b>
                    <ul>
                        <li><font>总体评价</font> <span>

                             <StarRatingComponent
                             className="rateing"
                                 name="zong"
                                 starCount={5}
                                 value={zong}
                                 onStarClick={this.onStarClick.bind(this)}
                                 renderStarIcon={(index, value) => {
                                    return (
                                      <span>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                             />
                            {zong ? <span className="ant-rate-text">{desc[zong - 1]}</span> : ''}
                        </span></li>
                        <li><font>品牌指数</font><span>
                            <StarRatingComponent
                        className="rateing"
                                name="pinpai"
                                starCount={5}
                                value={pinpai}
                                onStarClick={this.onStarClick.bind(this)}
                                renderStarIcon={(index, value) => {
                                    return (
                                      <span>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                            />
                            {pinpai ? <span className="ant-rate-text">{desc[pinpai - 1]}</span> : ''}
                        </span></li>
                        <li><font>课程体系</font><span>
                             <StarRatingComponent
                             className="rateing"
                                 name="kecheng"
                                 starCount={5}
                                 value={kecheng}
                                 onStarClick={this.onStarClick.bind(this)}
                                 renderStarIcon={(index, value) => {
                                    return (
                                      <span>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                             />
                            {kecheng ? <span className="ant-rate-text">{desc[kecheng - 1]}</span> : ''}
                        </span></li>
                        <li><font>教学成果</font><span>
                             <StarRatingComponent
                             className="rateing"
                                 name="jiaoxue"
                                 starCount={5}
                                 value={jiaoxue}
                                 onStarClick={this.onStarClick.bind(this)}
                                 renderStarIcon={(index, value) => {
                                    return (
                                      <span>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                             />
                            {jiaoxue ? <span className="ant-rate-text">{desc[jiaoxue - 1]}</span> : ''}
                        </span></li>
                        <li><font>师资力量</font><span>
                            <StarRatingComponent
                            className="rateing"
                                name="shizi"
                                starCount={5}
                                value={shizi}
                                onStarClick={this.onStarClick.bind(this)}
                                renderStarIcon={(index, value) => {
                                    return (
                                      <span>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                            />
                            {shizi ? <span className="ant-rate-text">{desc[shizi - 1]}</span> : ''}
                        </span></li>
                        <li><font>服务质量</font><span>
                            <StarRatingComponent
                            className="rateing"
                                name="fuwu"
                                starCount={5}
                                value={fuwu}
                                onStarClick={this.onStarClick.bind(this)}
                                 renderStarIcon={(index, value) => {
                                    return (
                                      <span>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                            />
                            {fuwu ? <span className="ant-rate-text">{desc[fuwu - 1]}</span> : ''}
                        </span></li>
                    </ul>
                    <div className="sayping" onClick={()=>{
                          if(!this.state.isLogin){
                            this.props.history.push('/my/login');
                            return false;
                        }
                    }

                    }>
                        <textarea placeholder="老师认真负责" value={dianping}  rows="7" maxLength="200" readOnly={this.state.isLogin?false:true} onChange={(event) => {
                          
                            const { valueData } = this.state;
                            valueData.dianping = event.target.value;
                            this.setState({ valueData ,zilength:200-event.target.value.length})
                        }}>
                        </textarea>
                        <div className="imgBox">
                            <ImagePicker
                                files={files}
                                onChange={this.onImageChange01}
                                // onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 3}
                                multiple={this.state.multiple}
                                onAddImageClick = {this.onImageChange02}
                            />
                        </div>
                    <span>还剩<font>{this.state.zilength}</font>字～</span>
                    </div>
                    <button onClick={this.toping}>提交</button>
                </div>
                <Evaluate item={this.id} idid={this.state.idid}/>
                {/* 视频弹窗 */}
                {
                    this.state.videoflag ? <div className="video_pup">
                        <video controls="controls" src={this.state.src} autoPlay>您的浏览器不支持 video 标签。</video>
                        <span onClick={() => {
                            this.setState({
                                videoflag: false,
                                src: ''
                            })
                        }

                        }><i></i></span>
                    </div> : ''
                }
                {this.state.ii?<div className="loadload"><LoadPage></LoadPage></div>:''}
            </div>
        )
    }
    onStarClick(nextValue, prevValue, name) {
        // if(!this.state.isLogin){
        //     this.props.history.push('/my/login');
        //     return false;
        // }
        const { valueData } = this.state;
        valueData[name] = nextValue;
        this.setState({ valueData },()=>{
            console.log(this.state.valueData)
        })

    }
    toLogin=()=>{
        if(!this.state.isLogin){
            this.props.history.push('/my/login');
            return false;
        }
    }
    // 播放视频
    playvideo = (mp4) => {
        this.setState({
            videoflag: true,
            src: mp4
        })
    }
    toping = async () => {
        let {zong,pinpai,kecheng,jiaoxue,fuwu,shizi}=this.state.valueData;
        if(zong==0||pinpai==0||kecheng==0||fuwu==0||shizi==0||jiaoxue==0){
            Toast.info('请为商家评分哦~',1);
            return false;
        }

        this.setState({
            ii:true
        })
        let str='',
            imgList = [];
        for (var i = 0; i < this.state.imlist.length; i++) {
            let result = await baseUpload(this.state.imlist[i]);
            if (result.code == 200) {
                imgList.push(result.data.src)
            }
        }
        console.log(imgList)
        for (var i = 0; i < imgList.length; i++) {
            str += imgList[i] + '|'
        }
        const { valueData } = this.state;
        valueData.sid = this.id;
        valueData.images = str;
        this.setState({ valueData })
       
        let result =await toPing(this.state.valueData);
        if(result.code==200){
            this.setState({
                idid:this.state.idid+1,
                ii:false
            })
            Toast.info('提交成功～',1,()=>{
               this.setState({
                valueData: {
                    'sid': 0,
                    'zong': 0,
                    'pinpai': 0,
                    'kecheng': 0,
                    'jiaoxue': 0,
                    'fuwu': 0,
                    'shizi': 0,
                    'dianping': "",
                    'images': ''
                },
                files: [],
               })
            });
        }else if(result.code==205){
            this.props.history.push('/my/login');
        }

    }
    handleClick = async (cid) => {
        this.setState({ leList: '', activeid: cid })
        let lessonresult = await lessonList(this.id, cid);

        if (lessonresult.code == 200) {
            this.setState({ leList: lessonresult.list })
        }
    }


    shoucang = async () => {
        let result = await toCollect(1, this.id);
        console.log(result)
        // if(!this.state.isLogin){
        //     this.props.history.push('/my/login');
        //     return false;
        // }
        if (result.code == 205) {
            this.props.history.push('/my/login');
            return false;
        } else if (result.code = 200) {
            if (result.list.status == 2) {
                this.setState({
                    collectflag: false
                })
                return false;
            } else if (result.list.status == 1) {
                this.setState({
                    collectflag: true
                })
                Toast.info('收藏成功',1)
            }
        }
    }
    onImageChange02 = (e)=>{
        if(!this.state.isLogin){
            e.preventDefault();
            this.props.history.push('/my/login');
        }

    }
    onImageChange01 = (files, type, index) => {
        if(!this.state.isLogin){
            this.props.history.push('/my/login');
            return false;
        }
        this.setState({
            files,
        });
        const { imlist } = this.state;
        if (type === 'add') {
            lrz(files[files.length-1].url, { quality: 0.5 }).then(async (rst) => {
                imlist.push(rst.base64)
                this.setState({
                    imlist
                })
            })

        } else {
            for (var i = 0; i < imlist.length; i++) {
                if (i == index) {
                    imlist.splice(i - 1, 1);
                }
            }
            this.setState({
                imlist
            })
        }
        this.setState({
            files,
        });

    }

    // onChange = async (files) => {
    //     let result =await baseUpload(files[files.length-1].url);
    //     if(result.code==200){
    //         const {imlist}=this.state;
    //         imlist.push(result.data.src);
    //         this.setState({imlist})
    //         console.log(this.state.imlist)
    //     }
    //     this.setState({
    //         files,
    //     });
    // }
}



export default connect(state => state.my, action.my)(Info)
