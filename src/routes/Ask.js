import React, { Component } from 'react'
import { NavBar, Icon, ListView, PullToRefresh, Toast } from 'antd-mobile'

import { queryLine } from '../api/headline';
import '../static/css/ask.less';
class Ask extends Component {
    constructor(props) {
        super(props)
        // 创建ListViewDataSource对象
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            dataSource,
            datas: [],
            pageNo: 1,
            pageSize: 2,
            hasMore: true,
            refreshing: true,
            isLoading: true,
            dataArr: [],
        }
    }

    componentDidMount() {
        this.getData(true)
    }

    async getData(ref = false) {
        //获取数据
        var para = {}
        para.pageSize = this.state.pageSize;
        para.p = this.state.pageNo;
        let result = await queryLine(this.state.pageNo);
        const dataList = result.list;
        // const len = dataList.length;
        var len=dataList && dataList.length;
        console.log(dataList)
        if (len<=0) { // 判断是否已经没有数据了
            this.setState({
                refreshing: false,
                isLoading: false,
                hasMore: false
            })

            Toast.info('没有数据了~', 1)
            return false
        }

        // 这里表示上拉加载更多
        // 合并state中已有的数据和新增的数据
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
        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            return (
                <li>
                    <a href={rowData.url}>
                        <img src={rowData.image} alt={rowData.name} />
                        <div>
                            <h3>{rowData.name}</h3>
                            <p>{rowData.title}</p>
                        </div>
                    </a>
                </li>
            )
        }
        return (
            <div className="headline">
                <ul className="content-box">
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}

                        renderFooter={() => (<div className="footer">{this.state.isLoading ? '加载中...' : '暂无更多数据'}</div>)}
                        renderRow={row}
                        useBodyScroll
                        onEndReachedThreshold={10}
                        onEndReached={this.onEndReached}
                        pageSize={10}
                    />
                </ul>
            </div>
        );
    }
}

export default Ask