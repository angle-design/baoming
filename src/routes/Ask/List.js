import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../../store/action/index';
import { ListView, Toast } from 'antd-mobile'
import { askLeft,MingShi } from '../../api/ask'
import { checkLogin } from '../../api/my';
import Item from './AskItem';
// import Like from './LikeBtn';
class List extends Component {
    constructor(props, context) {
        super(props, context);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            askLeftList: [],
            dataSource,
            pageNo: this.props.askListData.page,
            isLoading: true,
            dataArr: [],
            isLogin:false,
            fileflag:false
        }
    }
    componentWillMount(){
        document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
    }
    async componentDidMount() {
        let { queryAsk, askListData } = this.props;
        if (askListData.topList.length == 0) {
            await queryAsk(this.state.pageNo)
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.askListData.data),
            pageNo: this.props.askListData.page
        })
        let result = await askLeft();
        if (parseFloat(result.code) == 200) {
            this.setState({
                askLeftList: result.list
            })
        }
         let a=await checkLogin();
         if(a.code==200){
            this.setState({
                isLogin:true
            })
         }else if(a.code==205){
            this.setState({
                isLogin:false
            })
         }
         let b=await MingShi();
         if (parseFloat(b.code) == 200) {
            this.setState({
                fileflag: true
            })
        }
    }

    // 滑动到底部时加载更多
    onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        if (!this.props.askListData.flag) {
            return
        }
        this.setState({
            isLoading: true,
        }, async () => {
            let { queryAsk } = this.props;
            await queryAsk(this.state.pageNo)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.askListData.data),
                pageNo: this.props.askListData.page
            })
        })
    }

    render() {
        document.title ='问吧';
        let { askListData } = this.props,
            { topList, data } = askListData;
        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            return (
                <Item item={rowData} />
            )
        }
        return (
            <div className="askBox">
                {/* <Like/> */}
                {/* 前三条 */}
                <div className="askTop">
                    {
                        topList.map((item, index) => {
                            return <Item key={index} item={item} />
                        })
                    }
                </div>

                {/* 左右滑动问老师 */}
                <div className="swiperLeft">
                    <ul>
                        {
                            this.state.askLeftList.map((item, index) => {
                                let { hinfo: { acount, hcount, qcount ,hid}, uinfo: { a_title, a_uname, a_image } } = item;
                                return <li key={index} onClick={()=>{
                                        this.props.history.push({
                                            pathname:'/ask/detail/'+hid
                                          })
                                }}>
                                    <dl>
                                        <dt>
                                            {a_image ? <img src={a_image} /> : <img src={require('../../static/image/mohead.png')} />}
                                            <font></font>
                                        </dt>
                                        <dd>{a_uname}</dd>
                                        <dd>{a_title}</dd>
                                    </dl>
                                    <p>
                                        <span>
                                            <font>{hcount}</font>
                                            <font>话题</font>
                                        </span>
                                        <span>
                                            <font>{acount}</font>
                                            <font>提问</font>
                                        </span>
                                        <span>
                                            <font>{qcount}</font>
                                            <font>回答</font>
                                        </span>
                                    </p>
                                    <button>问他</button>
                                </li>
                            })
                        }
                    </ul>
                </div>
                {/* {后面的数据} */}
                <div className="askTop">
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div className="footer" style={{ textAlign: 'center' }}>{this.props.askListData.flag ? '加载中...' : '暂无更多数据'}</div>)}
                        renderRow={row}
                        useBodyScroll
                        onEndReachedThreshold={10}
                        onEndReached={this.onEndReached}
                    />
                </div>
             
                {this.state.fileflag?<p className="fileask" onClick={
                    ()=>{
                            this.props.history.push('/ask/fileload')
                    }
                }>
                    <img src={require('../../static/image/wen.png')}  />
                </p>:''}
            </div>
        )
    }
}



export default connect(state => state.ask, action.ask)(List)
