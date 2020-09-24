import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { ListView, Toast } from 'antd-mobile';
import { questionList } from '../../api/my';
import Kong from '../../component/kong';
import '../../static/css/question.less'
class Question extends Component {
    constructor(props, context) {
        super(props, context);
        // 创建ListViewDataSource对象
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            dataSource,
            datas: [],
            pageNo: 1,
            hasMore: true,
            isLoading: true,
            dataArr: [],
        }
    }
    async componentWillMount() {
        this.getData(true)
    }
    async getData(ref = false) {
        //获取数据
        let result = await questionList(this.state.pageNo);
        const dataList = result.list;
        var len = dataList && dataList.length;
        // console.log(dataList)

        if (len <= 0) { // 判断是否已经没有数据了
            this.setState({
                isLoading: false,
                hasMore: false
            })
            Toast.info('没有数据了~', 1)
            return false
        } else {
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


    }

    // 滑动到底部时加载更多
    onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        console.log(this.state.pageNo)
        if (!this.state.isLoading || !this.state.hasMore) {
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
        document.title = "我的提问";
        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            let { content, time, hinfo, status } = rowData;
            return (<li>
                <p className="title">
                    <span>提问:</span>
                    {content}
                </p>
                    <div onClick={()=>{
                          this.props.history.push({
                            pathname:'/ask/detail/'+hinfo.id
                          })
                    }}>
                        <p>
                            {hinfo.a_image ? <img src={hinfo.a_image} /> : <img src={require('../../static/image/mohead.png')} />}
                        </p>
                        <span>{hinfo.h_title},{hinfo.h_title2}</span>
                    </div>
                <p className="time">
                    <font>{time}</font>
                    {status === 1 ? <span style={{ color: '#36b937' }}>专家已答</span> : <span style={{ color: '#f1a91f' }}>待回答</span>}
                </p>
            </li>)
        }
        return (
            <div className="questionBox">
                {this.state.dataArr && this.state.dataArr.length !== 0 ? <ul>
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
                </ul> : <div style={{ marginTop: '2rem' }}><Kong msg='暂无提问~'></Kong></div>}
            </div>
        )
    }
}



export default connect()(Question)
