import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Toast } from 'antd-mobile';
import action from '../../store/action/index';
import { Link, withRouter } from 'react-router-dom';
import { querytop, fuList ,replyList} from '../../api/ask';
import { checkLogin } from '../../api/my';
import ListItem from './ListItem';
class List extends Component {
    constructor(props, context) {
        super(props, context);
        // 创建ListViewDataSource对象
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            data: {},
            fulist: [],
            dataSource,
            datas: [],
            pageNo: 1,
            hasMore: true,
            refreshing: true,
            isLoading: true,
            dataArr: [],
            flagreply: false,
            isLogin: false,//验证是否登录
            replaydata: [],//回复提交的参数
            msg:''//回复的内容
        }

    }
    async componentWillMount() {
        let res = await checkLogin(),
            isLogin = parseFloat(res.code) === 200 ? true : false;
        this.setState({ isLogin });
        this.getData(true)
        let result = await querytop(this.props.match.params.id, this.props.match.params.id);
        if (result.code == 200) {
            this.setState({
                data: result.list
            })
        }
    }
    async componentWillReceiveProps() {
        let res = await checkLogin(),
            isLogin = parseFloat(res.code) === 200 ? true : false;
        this.setState({ isLogin });
    }
    async getData(ref = false) {
        //获取数据
        let result = await fuList(this.props.match.params.id, this.state.pageNo);
        const dataList = result.list;
        // const len = dataList.length;
        var len = dataList && dataList.length;
        console.log(dataList)
        if (len <= 0) { // 判断是否已经没有数据了
            this.setState({
                refreshing: false,
                isLoading: false,
                hasMore: false
            })
            Toast.info('没有数据了~', 1)
            return false
        }

        // 这里表示上拉加载更多
        var dataArr = this.state.dataArr.concat(dataList) //关键代码
        this.setState({
            pageNo: this.state.pageNo,
            dataSource: this.state.dataSource.cloneWithRows(dataArr), // 数据源中的数据本身是不可修改的,要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
            refreshing: false,
            isLoading: false,
            dataArr: dataArr // 保存新数据进state
        })

    }



    // 滑动到底部时加载更多
    onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        console.log(this.state.pageNo)
        if (this.state.isLoading || !this.state.hasMore) {
            return
        }
        this.setState({
            isLoading: true,
            pageNo: this.state.pageNo + 1, // 加载下一页
        }, () => {
            this.getData(false)
        })

    }
    render() {
        if (!this.state.data) return '';
        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            let { uinfo, zan, countr, ctime, relist, content,id,aid,uid} = rowData;
            return (
                <li>
                    <div className="list_item">
                        <div>
                            <dl>
                                <dt>
                                    {uinfo.a_image ? <img src={uinfo.a_image} /> : <img src={require('../../static/image/mohead.png')} />}
                                    <font></font>
                                </dt>
                                <dd>
                                    <font>{uinfo.a_uname}</font>
                                    <span>{ctime}</span>
                                </dd>
                            </dl>
                            <p>
                                <span>
                                    <i></i>
                                    <font>{zan ? zan : '0'}</font>
                                </span>
                                <span  onClick={ev=>{
                                        if(this.state.isLogin){
                                            this.setState({
                                                flagreply:true,
                                                replaydata:[aid, id, id, uid]
                                            })
                                        }else{
                                            this.props.history.push('/my/login')
                                        }
                                       
                                    }}>
                                    <i></i>
                                    <font>{countr}</font>
                                </span>
                            </p>
                        </div>
                        <p className="new_text new_text_ask">{content}</p>
                    </div>
                    {(relist || []).map((item, index) => {
                        let { u_, fu } = item;
                        return <div className="list_item list_itemleft" key={index}>
                            <div>
                                <dl>
                                    <dt>
                                        {uinfo.a_image ? <img src={uinfo.a_image} /> : <img src={require('../../static/image/mohead.png')} />}
                                        <font></font>
                                    </dt>
                                    <dd>
                                        <font>
                                            <font>{item.u_}</font>回复
                                <font>{item.fu}</font>
                                        </font>
                                        <span>{ctime}</span>
                                    </dd>
                                </dl>
                                <p>
                                    <span>
                                    </span>
                                    <span onClick={ev=>{
                                        if(this.state.isLogin){
                                            this.setState({
                                                flagreply:true,
                                                replaydata:[item.aid, item.id, id, item.uid]
                                            })
                                        }else{
                                            this.props.history.push('/my/login')
                                        }
                                       
                                    }}>
                                        <i></i>
                                    </span>
                                </p>
                            </div>
                            <p className="new_text new_text_ask">{item.content}</p>
                        </div>
                    })}
                </li>
            )
        }
        return (
            <div className="replayBox">
                <div style={{ padding: '0 0.3rem', borderBottom: '0.1rem solid #f4f4f4' }}>
                    <ListItem item={this.state.data} />
                </div>
                {this.state.fulist ? <div className="new_bottom">
                    <ul>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}
                            renderFooter={() => (<div className="footer" style={{ textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : '暂无更多数据'}</div>)}
                            renderRow={row}
                            useBodyScroll
                            onEndReachedThreshold={10}
                            onEndReached={this.onEndReached}
                            pageSize={10}
                        />
                    </ul>
                </div> : ''}
                {
                    this.state.flagreply ? <div className="fixed_bottom">
                        <div>
                            <textarea type="text" placeholder="一起讨论吧"  value={this.state.msg} onChange={this.changeHandle}></textarea>
                            <p onClick={this.toSend} className={this.state.msg?'lv':''}>发表</p>
                        </div>
                    </div> : ''
                }

            </div>
        )

    }
    changeHandle=(e)=>{
        this.setState({
            msg:e.target.value
        })
    };
    // 发表
     toSend=async ()=>{
         let {msg,replaydata}=this.state;
        if(msg){
            this.setState({
                flagreply:false
            })
            let payLoad={};
            payLoad.aid=replaydata[0];
            payLoad.rid=replaydata[1];
            payLoad.ffid=replaydata[2];
            payLoad.fuid=replaydata[3];
            payLoad.content=msg;
            let result=await replyList(payLoad);
            if(result.code==200){
                Toast.info('提交成功~', 1);
            }
        }
    }
}



export default withRouter(connect(state => state.ask, action.ask)(List))
