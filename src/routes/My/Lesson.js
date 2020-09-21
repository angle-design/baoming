import React, { Component } from 'react';
import { connect } from 'react-redux';
import {lessonbao} from '../../api/my';
import Kong from '../../component/kong';
import LessonItem from '../Course/LessonItem';
// import '../../static/css/mylesson.less'
class Lesson extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
    }
   async componentWillMount() {
     let result =await lessonbao();
     if(result.code==200){
        this.setState({
            data:result.list
        })
     }
    }
    render() {
        document.title ='已报名课程';
        let {data}=this.state;
        if(!data) return false;
        return (
            <div className="myLesson">
                {data&&data.length!==0? <div>
                    {data.map((item,index)=>{
                        console.log(item)
                        return <LessonItem item={item} key={index}></LessonItem>
                    })}
                </div>: <div style={{marginTop:'2rem'}}><Kong msg='暂无报名课程~'></Kong></div>}
              
            </div>
        )
    }
  
}



export default connect()(Lesson)
