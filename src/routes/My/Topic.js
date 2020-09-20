import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListView, Toast, ActionSheet } from 'antd-mobile';
import { topicList, deletTotic } from '../../api/my';
import '../../static/css/question.less';
import Kong from '../../component/kong';
// import {  Empty} from 'antd';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
class Topic extends Component {
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
            clicked: 0
        }
    }
    async componentWillMount() {
        this.getData(true)
    }
    async getData(ref = false) {
        //获取数据
        let result = await topicList(this.state.pageNo);
        const dataList = result.list;
        var len = dataList && dataList.length!==0;
        console.log(dataList);
      if(!len){
        this.setState({
            isLoading: true,
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
        if ( !this.state.isLoading || !this.state.hasMore) {
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
            let { content, time, hinfo, status } = rowData;
            return (<div className="listitem">
                <p onClick={() => {
                    this.props.history.push({
                        pathname: '/ask/detail/' + rowData.id
                    })
                }}>{rowData.h_title},{rowData.h_title2}</p>
                <div>
                    <font>{rowData.h_ctime}</font>
                    <p>
                        {rowData.h_status == 1 ? <span style={{ color: '#36b937' }}>进行中</span> :
                            rowData.h_status == 2 ? <span style={{ color: '#f1a91f' }}>待审核</span> :
                                <span style={{ color: '#999' }}>>已关闭</span>}
                        <i onClick={
                            this.showActionSheet.bind(this, rowData.id)
                        }>删除</i>
                    </p>
                </div></div>)
        }
        return (
            <div className="topic">
                {this.state.dataSource && this.state.dataSource.length !== 0 ? <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div className="footer" style={{ textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : '暂无更多话题'}</div>)}
                    renderRow={row}
                    useBodyScroll
                    onEndReachedThreshold={10}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                /> : <div style={{ marginTop: '2rem' }}><Kong msg='暂无话题'></Kong></div>}


            </div>
        )
    }
    showActionSheet = (id) => {
        const BUTTONS = ['删除话题', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            // title: 'title',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    this.remove(id)
                }
            });
    }
    remove = async (id) => {
        let result = await deletTotic(id);
        if (result.code == 200) {
            let dataList = this.state.dataArr.filter(item => item.id != id);
            this.setState({
                dataArr: dataList
            })
        }
    }
}



export default connect()(Topic)
