import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoList } from '../../api/my'
import Kong from '../../component/kong';
import LessonItem from '../Course/LessonItem';
import CourseItem from '../Course/CourseItem';
class Collection extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            num: 1,
            data: [],
            lessondata: []
        }
    }
    async componentWillMount() {
        let result = await logoList(1);
        if (result.code == 200) {
            this.setState({
                data: result.list
            })
        }
        let res = await logoList(2);
        if (res.code == 200) {
            this.setState({
                lessondata: res.list
            })
        }
    }
    render() {
        let { data, num, lessondata } = this.state;
        return (
            <div className="mycollect">
                <p className="collect_top">
                    <span className={num == 1 ? 'active' : ''} onClick={() => {
                        this.setState({ num: 1 })
                    }}>机构</span>
                    <span className={num == 2 ? 'active' : ''} onClick={() => {
                        this.setState({ num: 2 })
                    }}>课程</span>
                </p>
                {num == 1 ? <div className="collect_con">
                    {data && data.length !== 0? <div>{data.map((item, index) => {
                        return <CourseItem item={item} key={index}></CourseItem>
                    })}</div> : <div style={{marginTop:'2rem'}}><Kong msg='暂无收藏机构~'></Kong></div>}
                </div> : <div className="collect_con">
                        {lessondata && lessondata.length !== 0 ? <div>{lessondata.map((item, index) => {
                            return <LessonItem item={item} key={index}></LessonItem>
                        })}</div> :<div style={{marginTop:'2rem'}}><Kong msg='暂无收藏课程~'></Kong></div>}
                    </div>
                }
            </div>
        )

    }
}



export default connect()(Collection)
