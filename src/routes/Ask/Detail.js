import React, { Component } from 'react';
import { connect } from 'react-redux';
import { askInfo,questList } from '../../api/ask'
import Qs from 'qs';
class Detail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {},
            height: 0,//=>字高度
            contentflag: true,//=>控制字展开收起
            questdata:{}
        }
    }
    async componentDidMount() {
        let { location: { search } } = this.props,
            { id = 0 } = Qs.parse(search.substr(1)) || {};
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
        let quest=await questList(1,this.courseId);
        if (quest.code == 200) {
            this.setState({
                questdata: quest
            })
        }
       
        if (this.state.height > 100) {
            this.setState({
                contentflag: true
            })
        }
    }
    render() {
        let { h_title, h_title2, h_etime, h_image, isnow, h_content, uinfo, hlist } = this.state.data;
        
        if (h_etime) {
            h_etime = h_etime.split(" ")[0];
        }
        if (!uinfo) return '';
        return (
            <div className="detailsBox">
                <div className="details_top" style={{ background: 'url(' + h_image + ') no-repeat center center' }}>
                    <div>
                        <p>{h_title},{h_title2}</p>
                        <span>
                            {h_etime} | {isnow == 1 ?
                                <font v-if="hinfo.isnow==1">提问进行时</font>
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
                            {
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
                            }
                        </span>
                    </p >
                </div >
                <div className="otherquestion">
                    <span>TA开设的其他话题：</span>
                    <div>
                        {hlist.map((item, index) => {
                            let { h_title, h_title2 } = item;
                            return <p key={index}>{h_title},{h_title2}</p>
                        })}
                    </div>
                </div>
                {
                    this.state.questdata.count?(<div className="question">
                    <div className="question_tab">
                        <p>
                           <font>共{this.state.questdata.count.qcount}个回答</font>
                            <font>{this.state.questdata.count.acount}个提问</font> 
                        </p>
                        <p>
                            <span>最新</span>
                            <span>最热</span>
                        </p>
                    </div>
                    <div className="new">
                        <ul>
                            <li >
                                {/* <Listcon  /> */}
                            </li>
                        </ul>
                    </div>
                </div>):''
                }
                
                {/* <!-- 提问 -->
          <div class="question">
            <!-- tab -->
            <div class="question_tab">
              <p>
                <font>共{{count.qcount}}个回答</font>
                <font>{{count.acount}}个提问</font>
              </p>
              <p>
                <span @tap="toNew" :class="order==1?'active':''">最新</span>
                <span @tap="toHot" :class="order==2?'active':''">最热</span>
              </p>
            </div>
            <!-- 内容 -->
            <!-- 全部 -->
            <div class="new">
              <ul>
                <li v-for="(listitem,index) in ListInfo" :key="index">
                  <Listcon :listtop="listitem" @toComment="toComment" @toaswer="toaswer" />
                </li>
              </ul>
              <!-- 展开更多 -->
               <p :class="cl?'more aa':'more'" v-if="pullflag" >{{pullDownMsg}}</p>
              <!-- <p :class="more {'aa',ListInfo}" v-if="pullflag" >{{pullDownMsg}}</p> -->
            </div>
          </div> */}
            </div >
        )
    }
}



export default connect()(Detail)
