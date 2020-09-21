import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { ListView, Toast } from 'antd-mobile';
import { commentList } from '../../api/my';
import '../../static/css/question.less';
import Kong from '../../component/kong';
class Comment extends Component {
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
        let result = await commentList(this.state.pageNo);
        const dataList = result.list;
        var len = dataList && dataList.length;
        console.log(dataList)
        if (len <= 0) { // 判断是否已经没有数据了
            this.setState({
                isLoading: false,
                hasMore: false
            })
            Toast.info('没有数据了~', 1)
            return false;
        }

        // 这里表示上拉加载更多
        var dataArr = this.state.dataArr.concat(dataList) //关键代码
        this.setState({
            pageNo: this.state.pageNo,
            dataSource: this.state.dataSource.cloneWithRows(dataArr), // 数据源中的数据本身是不可修改的,要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
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
        document.title = "我的评论";
        const row = (rowData, sectionID, rowID) => {
            // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            let { content, hinfo,ctime} = rowData;
            return ( <li >
            <p className="title">
              <span>评论:</span>
              {content}
            </p>
            
            <div onClick={
                this.handleClick.bind(this,rowData.aid)
            }>
              <span>{hinfo.content}</span>
            </div>
            
            <p className="time">
              <font>{ctime}</font>
            </p>
          </li>)
        }
        return (
            <div className="comment">
                {this.state.dataArr&&this.state.dataArr.length!==0? <ul>
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
                </ul>:<Kong msg='暂无评论'/>}
            </div>
        )
    }
    handleClick=id=>{
        this.props.history.push({
            pathname:'/ask/replay/'+id
          })
    }
}



export default withRouter(connect()(Comment))
