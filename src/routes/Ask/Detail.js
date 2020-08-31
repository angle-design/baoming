import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Toast } from 'antd-mobile';
import { askInfo } from '../../api/ask';

import Qs from 'qs';
import Listcon from './ListItem';
import action from '../../store/action/index';

class Detail extends Component {
    constructor(props, context) {
        super(props, context);
          // 创建ListViewDataSource对象
          const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            data: {},
            height: 0,//=>字高度
            contentflag: true,//=>控制字展开收起
            questdata:[],
            dataSource,
            pageNo: this.props.askInfoList.page,
            isLoading: true,
            dataArr: [],
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
            dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
            pageNo: this.props.askInfoList.page
        })
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
       
        if (h_etime) {
            h_etime = h_etime.split(" ")[0];
        }
        if (!uinfo) return '';
        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            return (
                <li>
                    <Listcon item={rowData} />
                </li>
            )
        }
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
                            {this.state.height>100?
                                this.state.contentflag?
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
                                    :''}
                        </span>
                    </p >
                </div >
                {hlist&&hlist.length!==0?<div className="otherquestion">
                    <span>TA开设的其他话题：</span>
                    <div>
                        {hlist.map((item, index) => {
                            let { h_title, h_title2 } = item;
                            return <p key={index}>{h_title},{h_title2}</p>
                        })}
                    </div>
                </div>:''}
              
                {this.props.askInfoList.count ? (<div className="question">
                    <div className="question_tab">
                        <p>
                            <font>共{this.props.askInfoList.count.qcount}个回答</font>
                            <font>{this.props.askInfoList.count.acount}个提问</font>
                        </p>
                        <p>
                            <span onClick={this.handleClick.bind(this,1)}>最新</span>
                            <span onClick={this.handleClick.bind(this,2)}>最热</span>
                        </p>
                    </div>
                    <div className="new">
                        <ul>
                            <ListView
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}
                                renderFooter={() => (<div className="footer" style={{ textAlign: 'center' }}>{this.props.askInfoList.flag ? '加载中...' : '暂无更多数据'}</div>)}
                                renderRow={row}
                                useBodyScroll
                                onEndReachedThreshold={10}
                                onEndReached={this.onEndReached}
                            />
                        </ul>
                    </div>
                </div>) : ''}
            </div >
        )
    }
       // 最新最热切换
       handleClick=async (order)=>{
        this.setState({
            questdata:[]
        })
        if (this.state.questdata.length == 0) {
            await this.props.queryList({
                p: 1,
                id: this.courseId,
                order:order
            })
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.askInfoList.data),
            pageNo: this.props.askInfoList.page
        })
    }
}



export default connect(state => state.ask, action.ask)(Detail)
