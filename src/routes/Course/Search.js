import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchBar, ListView, Toast } from 'antd-mobile';
import { seaList } from '../../api/course';
import CourseItem from './CourseItem';
import Kong from '../../component/kong';
class Search extends Component {
    constructor(props, context) {
        super(props, context);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            dataSource,
            pageNo: 1,
            hasMore: true,
            isLoading: true,
            dataArr: []
        }
    }
    componentDidMount() {
        this.autoFocusInst.focus();

    }
    async getData(ref = false, key) {
        alert(1)
        //关键代码
        var dataArr;
        //获取数据
        let result = await seaList(key, this.state.pageNo);
        if (result.code == 200) {
            if (result.list && result.list.length !== 0) {
                dataArr = this.state.dataArr.concat(result.list)
                this.setState({
                    pageNo: this.state.pageNo,
                    dataSource: this.state.dataSource.cloneWithRows(dataArr),
                    refreshing: false,
                    isLoading: false,
                    dataArr: dataArr // 保存新数据进state
                })
            } else {
                this.setState({
                    hasMore: false,
                    pageNo: 1,
                    dataSource: this.state.dataSource.cloneWithRows({}),
                    isLoading: false,
                    dataArr: [] // 保存新数据进state
                })
            }

        } else if (result.code == 404) {
            this.setState({
                hasMore: false,
                pageNo: 1,
                dataSource: this.state.dataSource.cloneWithRows({}),
                isLoading: false,
                dataArr: [] // 保存新数据进state
            })
        }
    }
    onEndReached = (event) => {
        if (!this.state.hasMore) {
            return false;
        }
        this.setState({
            isLoading: true,
            pageNo: this.state.pageNo + 1, // 加载下一页
        }, () => {
            this.getData(false, this.state.key)
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
                <SearchBar placeholder="搜索课程" ref={ref => this.autoFocusInst = ref} onChange={(value) => {
                    this.setState({
                        key: value,
                        pageNo: 1,
                        dataArr: [],
                        hasMore: true,
                        isLoading: false,
                        dataSource: this.state.dataSource.cloneWithRows({}),
                    })
                    this.getData(true, value)
                }}
                    onCancel={() => {
                        this.props.history.push('/course')
                    }} />
                <div className="logotop" style={{ marginTop: '0.4rem' }}>
                    {this.state.dataArr && this.state.dataArr.length !== 0 ? <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div className="footer" style={{ textAlign: 'center' }}>{this.state.hasMore ? '' : '暂无更多数据'}</div>)}
                        renderRow={row}
                        useBodyScroll
                        onEndReachedThreshold={10}
                        onEndReached={this.onEndReached}
                        pageSize={10}
                    /> : <Kong msg="暂无数据"></Kong>}

                </div>
            </div>
        )
    }
}

export default connect()(Search)
