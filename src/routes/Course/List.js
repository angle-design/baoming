import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import {ListView, Toast,Tabs } from 'antd-mobile';
import {bannerList,typeList,logoList} from '../../api/course';
import CourseItem from './CourseItem';
import LoadPage from '../../component/LoadPage'
class List extends Component {
    constructor(props, context) {
        super(props, context);
         // 创建ListViewDataSource对象
         const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
        })
        this.state={
            id:0,
            bannerData:[],
            typedata:[],
            dataSource,
            datas: [],
            pageNo: 1,
            hasMore: true,
            refreshing: true,
            isLoading: true,
            dataArr: [],
        }
    }
    async componentWillMount(){ 
        // 获取轮播图
        let result=await bannerList();
        if(result.code==200){
           this.setState({
            bannerData:result.list
           })
        }
        let res=await typeList();
        if(res.code==200){
            this.setState({
                typedata:res.list,
            },()=>{
                this.scrollTabX()
            })
            this.setState({
                id:res.list[0].id
            },()=>{
                this.getData(true,this.state.id)
            })   
         }
        }
    async getData(ref = false,id) {
        //获取数据
        let result = await logoList(id,this.state.pageNo);
        const dataList = result.list;
        // const len = dataList.length;
        if(result.code==200){
            this.setState({
                isLoading:true
            })
        }
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
        // alert(1)
        this.setState({
            isLoading: true,
            pageNo: this.state.pageNo + 1, // 加载下一页
        }, () => {
            this.getData(false,this.state.id)
        })

    }
   
    render() {

        const row = (rowData, sectionID, rowID) => {
            return (
                <CourseItem item={rowData}></CourseItem>
                
            )
        }
        let {bannerData,typedata}=this.state;
        return (
            <div>
                <div className='searchBox' onClick={()=>{
                    this.props.history.push('/course/search')
                }}>
                    {/* 搜索框   */}
                    <img src={require('../../static/image/sou.jpg')}/>
                    {/* <SearchBar placeholder="搜索课程" ref={ref => this.autoFocusInst = ref} /> */}
                </div>
                <div className='topnav'>
                    <div className="nav">
                        <ul id="nav" ref="nav">
                            {typedata.map((item,index)=>{
                                return  <li className={this.state.id==item.id?'active':''} key={index} onClick={this.handleClick.bind(this,item.id)}>{item.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
                {/* 轮播图 */}
                {bannerData && bannerData.length !== 0 ? (<Carousel autoplay>
                    {bannerData.map((item, index) => {
                        let { image } = item;
                        return <div key={index}>
                            <img src={image} />
                        </div>
                    })}
                </Carousel>) : ''}
                {/* 机构排名 */}
                <div className="logotop">
                    <h3>机构排名</h3>
                    <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}
                            renderFooter={() => (<div className="footer" style={{ textAlign: 'center' }}>{this.state.isLoading ? <LoadPage/>: '暂无更多数据'}</div>)}
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
    // 列表切换
      handleClick = async (aid) => {
        this.setState({
            isLoading:true,
            pageNo:1,
            id:aid,
            datas:[],
            dataArr:[],
            dataSource: this.state.dataSource.cloneWithRows({}),
        },()=>{
            this.getData(true,this.state.id)
        })
    }
    scrollTabX = () => {
        var doc = document
        var WINDOW_OFFSETWIDTH = doc.documentElement.clientWidth;
        var liArr = doc.querySelectorAll('#nav > li')
        for (var i = 0; i < liArr.length; i++) {
            liArr[i].className = ''
            liArr[i].addEventListener('click', function (e) {
                for (var j = 0; j < liArr.length; j++) {
                    liArr[j].className = ''
                }
                this.className = 'active'
                var itemWidth = this.offsetWidth;
                var moveX = e.target.offsetLeft
                var left = moveX - (WINDOW_OFFSETWIDTH / 2) + (itemWidth / 2)
                doc.getElementById('nav').scrollLeft = left
            })
        }
    }
}



export default connect()(List)
