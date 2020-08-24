import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchBar, Tabs } from 'antd-mobile'

class List extends Component {
    constructor(props, context) {
        super(props, context)
    }

    renderContent = tab =>
        (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            <p>Content of {tab.title}</p>
        </div>);
    render() {
        const tabs = [
            { title: '小学' },
            { title: '初中' },
            { title: '高中' },
            { title: '少儿英语' },
            { title: '少儿编程' },
            { title: '四六级' },
            { title: '雅思英语' }
        ];

        return (
            <div>
                <div className='searchBox'>
                    {/* 搜索框   */}
                    <SearchBar placeholder="搜索课程" ref={ref => this.autoFocusInst = ref} />
                </div>
                <div className='topnav'>
                    <Tabs tabs={tabs} renderTabBar={props =>  <Tabs.DefaultTabBar {...props} page={6} />}>
                       
                    </Tabs>
                </div>
            </div>
        )
    }
}



export default connect()(List)
