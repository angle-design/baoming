import React, { Component } from 'react';
import {connect} from 'react-redux'
import { ListView,Toast } from 'antd-mobile'
import action from '../store/action/index'

import '../static/css/headline.less';

class HeadLine extends Component {
    constructor(props) {
        super(props)
        // 创建ListViewDataSource对象
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state = {
            dataSource,
            pageNo: this.props.headLineData.page,
            isLoading: true,
            dataArr: [],
        }
    }

    async componentDidMount() {
        let {queryHeadLine,headLineData} = this.props;
        if (headLineData.data.length === 0) {
            await queryHeadLine(this.state.pageNo)
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.props.headLineData.data),
            pageNo:this.props.headLineData.page
        })
            
    }
    // 滑动到底部时加载更多
     onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        if (!this.props.headLineData.flag) {
            return
        }
        this.setState({
            isLoading: true,
        }, async () => {
            let { queryHeadLine,headLineData} = this.props;
            await queryHeadLine(this.state.pageNo)
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(this.props.headLineData.data),
                pageNo:this.props.headLineData.page
            })
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
                            <p  style={{"WebkitBoxOrient": "vertical"}}>{rowData.title}</p>
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
                        renderFooter={() => (<div className="footer" style={{textAlign:'center'}}>{this.props.headLineData.flag ? '加载中...' : '暂无更多数据'}</div>)}
                        renderRow={row}
                        useBodyScroll
                        onEndReachedThreshold={10}
                        onEndReached={this.onEndReached}
            
                    />
                </ul>
            </div>
        );
    }
}

export default connect(state => state.headline, action.headline)(HeadLine)
