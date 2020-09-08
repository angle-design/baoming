import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchBar,ListView, Toast } from 'antd-mobile';
import {seaList} from '../../api/course';
import CourseItem from './CourseItem';

class Search extends Component {
    constructor(props, context) {
        super(props, context);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state={
            key:'',
            dataSource,
            datas: [],
            pageNo: 1,
            hasMore: true,
            isLoading: true,
            dataArr: [],
        }
    }
    componentDidMount() {
        this.autoFocusInst.focus();

      }
      async getData(ref = false,key) {
        //获取数据
        let result = await seaList(key,this.state.pageNo);
        if(result.code==404){
            this.setState({
                datas: [],
                pageNo: 1,
                dataArr: [],
                hasMore: true,
                isLoading: true,
            })
            Toast.info('无数据~', 1);
            return false;
        }
        const dataList = result.list;
        // const len = dataList.length;
        var len = dataList && dataList.length;
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
    if (this.state.isLoading || !this.state.hasMore) {
        
        return
    }
    this.setState({
        isLoading: true,
        pageNo: this.state.pageNo + 1, // 加载下一页
    }, () => {
        this.getData(false,this.setState.value)
    })

}
    render() {
      
        const row = (rowData, sectionID, rowID) => {
            return (
                <CourseItem item={rowData}></CourseItem>
                
            )
        }
        return (
           <div className="searchBox">
                  <SearchBar placeholder="搜索课程" ref={ref => this.autoFocusInst = ref} onChange={(value)=>{
                    this.setState({
                        key:value,
                        datas: [],
                        pageNo: 1,
                        dataArr: [],
                        hasMore: true,
                        isLoading: true,
                    },()=>{
                        this.getData(true,this.state.key)
                    })
                       
                  }
                      
                  }/>
                  <div className="logotop" style={{marginTop:'0.4rem'}}>
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
                        </div>
           </div>
        )
    }
}

export default connect()(Search)
