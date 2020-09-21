import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListView, Toast } from 'antd-mobile';
import { askInfo, fuZan,toQuest } from '../../api/ask';
import Qs from 'qs';
import Listcon from './ListItem';
import action from '../../store/action/index';
import LoadPage from '../../component/LoadPage'
import Kong from '../../component/kong'
class Detail extends Component {
    constructor(props, context) {
        super(props, context);
        // 创建ListViewDataSource对象
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            activeIndex: '',
            data: {},
            height: 0,//=>字高度
            contentflag: true,//=>控制字展开收起
            questdata: [],
            dataSource,
            pageNo: this.props.askInfoList.page,
            isLoading: true,
            dataArr: [],
            zanflag: false,
            a: false,
            tivalue:'',
            wenflag:false,
            onflag:false,
            len:0,
        }
    }
    //=>验证是否登录
    async componentWillMount() {
        let { queryLoginFlag, flag } = this.props;
        if (!flag) {
            queryLoginFlag();
        }
    }
    async componentDidMount() {

        this.courseId = this.props.match.params.id;//=>挂载到实例上
        let result = await askInfo(this.courseId);

        if (result.code == 200) {
            this.setState({
                data: result.list
            })
        }
        let { conText } = this.refs;
        this.setState({
            height: conText.scrollHeight
        })

        if (this.state.height > 100) {
            this.setState({
                contentflag: true
            })
        }
        //获取问答列表
        if (this.state.questdata.length == 0) {
            await this.props.queryList({
                p: 1,
                id: this.courseId
            })
            
        }
        this.setState({
            onflag:this.props.askInfoList.data&&this.props.askInfoList.data.length!==0?true:false,
            dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
            pageNo: this.props.askInfoList.page
        })
    }
    async componentWillReceiveProps(newProps) {
        const id = newProps.match.params.id;
        if (id !== this.courseId) {
            this.setState({
                height: 0,//=>字高度
                contentflag: true,//=>控制字展开收起
            })
            this.courseId = id;//=>挂载到实例上
            let result = await askInfo(this.courseId);
            if (result.code == 200) {
                this.setState({
                    data: result.list
                })
            }
            let { conText } = this.refs;
            this.setState({
                height: conText.scrollHeight
            })
            if (this.state.height > 100) {
                this.setState({
                    contentflag: true
                })
            }
            //获取问答列表
              await this.props.queryList({
                    p: 1,
                    id: this.courseId
              })
    
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
                pageNo: this.props.askInfoList.page
            })
        
        }
    }

    // 滑动到底部时加载更多
    onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        if (!this.props.askInfoList.flag) {
            return
        }
      
        this.setState({
            isLoading: true,
        }, async () => {
            let { queryList } = this.props;
            await queryList({
                p: this.state.pageNo,
                id: this.courseId
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
                pageNo: this.props.askInfoList.page
            })
        })
    }
    render() {
        
        let { h_title, h_title2, h_etime, h_image, isnow, h_content, uinfo, hlist } = this.state.data;
        document.title =h_title? h_title+','+h_title2:'';
        if (h_etime) {
            h_etime = h_etime.split(" ")[0];
        }
        if (!uinfo) return '';

        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            return (
                <li>
                    <Listcon item={rowData}/>
                </li>
            )
        }

        return (
            <div className="detailsBox">
                <div className="details_top" style={{ background: 'url(' + h_image + ') no-repeat center center',backgroundSize:'100% 100%' }}>
                    <div>
                        <p>{h_title},{h_title2}</p>
                        <span>
                            {h_etime} | {isnow == 1 ?
                                <font>提问进行时</font>
                                : isnow == 2 ? <font className="cur">待审核</font>
                                    : <font className="cur">提问已关闭</font>
                            }
                        </span>
                    </div>
                </div>
                <div className="details_text">
                    <dl>
                        <dt>
                            {uinfo.a_image ? <img src={uinfo.a_image} /> : <img src={require('../../static/image/mohead.png')} />}
                            <font></font>
                        </dt>
                        <dd>
                            <font>{uinfo.a_uname}</font>
                            <span>{uinfo.a_title}</span>
                        </dd>
                    </dl>
                    <p>
                        <span className={this.state.contentflag ? 'heightauto' : ''} ref="conText">{h_content}</span>
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
                        </span>
                    </p >
                </div >
                {hlist && hlist.length !== 0 ? <div className="otherquestion">
                    <span>TA开设的其他话题：</span>
                    <div>
                        {hlist.map((item, index) => {
                            let { h_title, h_title2, id } = item;
                            return <p key={index} onClick={
                                () => {
                                    this.props.history.push({
                                        pathname: '/ask/detail/' + id
                                    })
                                }
                            }>{h_title},{h_title2}</p>
                        })}
                    </div>
                </div> : ''}

                {this.props.askInfoList.count ? (<div className="question">
                    <div className="question_tab">
                        <p>
                            <font>共{this.props.askInfoList.count.qcount?this.props.askInfoList.count.qcount:0}个回答</font>
                            <font>{this.props.askInfoList.count.acount?this.props.askInfoList.count.acount:0}个提问</font>
                        </p>
                        <p>
                            <span onClick={this.handleClick.bind(this, 1)} className={this.state.activeIndex == 1 ? 'active' : ''}>最新</span>
                            <span onClick={this.handleClick.bind(this, 2)} className={this.state.activeIndex == 2 ? 'active' : ''}>最热</span>
                        </p>
                    </div>
                    <div className="new">
                        {
                            this.state.onflag ? <ul>
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSource}
                                    renderFooter={() => (<div className="footer" style={{ textAlign: 'center',fontSize:'0.24rem' }}>{ this.props.askInfoList.flag? <LoadPage /> : '暂无更多数据'}</div>)}
                                    renderRow={row}
                                    useBodyScroll
                                    onEndReachedThreshold={10}
                                    onEndReached={this.onEndReached}
                                />
                            </ul> : <div style={{marginTop:'0rem'}}><Kong msg='暂无数据~'></Kong></div>
                        }

                    </div>
                </div>) : ''}
                <div className="fixed_bo">
                    <p onClick={()=>{
                          if(isnow==1){
                            let { flag } = this.props;
                            if (!flag) {
                                this.props.history.push('/my/login');
                                return false;
                            }
                            this.setState({
                                wenflag:true
                            })
                            return false;
                          }else if(isnow==2){
                            Toast.info('提问正在审核～');
                            return false;
                          }else{
                            Toast.info('提问已关闭');
                            return false;
                          }
                    }}><i></i>提问</p>
                    <p onClick={this.handleZan} ><i className={this.state.zanflag ? 'active' : ''}></i>点赞</p>
                </div>
                {/* 评论弹窗 */}
                {this.state.wenflag?<div className="ping_pup"  onClick={(e)=>{
                        if (e.target.className == "pup_con"||e.target.tagName=="TEXTAREA"||e.target.tagName=='P') {
                            this.setState({
                              wenflag: true
                            })
                            return false;
                        }
                        this.setState({
                            wenflag: false
                        })}}>
                    <div className="pup_con">
                        <textarea type="text"
                            placeholder="写评论"
                            maxLength="800"
                            value={this.state.tivalue} rows="7" 
                            onChange={(event) => {
                                this.setState({ tivalue: event.target.value ,len:event.target.value.length})}}
                        ></textarea>
                        <p>
                            <font>{this.state.len}/ 800</font>
                            <span onClick={async ()=>{
                                if(this.state.tivalue){
                                    let res=await toQuest(this.courseId,this.state.tivalue);
                                    if (res.code == 200) {
                                        //提问成功
                                        this.setState({
                                            wenflag:false
                                        })
                                        Toast.info("提问成功~");
                                        await  this.props.queryList({
                                            p: 1,
                                            id: this.courseId
                                        })
                                        this.setState({
                                            dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
                                            pageNo: this.props.askInfoList.page
                                        })
                                      }
                                      
                                }
                            }}>发表</span>
                        </p>
                    </div>
                </div>:''}
            </div >
        )
    }
    // 下面浮窗点赞
    handleZan = async () => {
        let { flag } = this.props;
        if (!flag) {
            this.props.history.push('/my/login');
            return false;
        }
        let result = await fuZan(this.courseId);
        if (result.code == 200) {
            this.setState({
                zanflag: true
            })
        }
    }
    // 最新最热切换
    handleClick = (order) => {
        this.props.askInfoList.flag = false;
        this.setState({
            pageNo: 1,
            questdata: [],
            activeIndex: order,
            dataArr: [],
            dataSource: this.state.dataSource.cloneWithRows({}),
        }, async () => {

            await this.props.queryList({
                p: 1,
                id: this.courseId,
                order: order
            })
            setTimeout(() => {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
                    pageNo: this.props.askInfoList.page
                })
            },30)


        })


    }
}

export default connect(state => ({ ...state.ask, ...state.my }), { ...action.ask, ...action.my })(Detail)
