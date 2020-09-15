import React, { Component } from 'react';
import { connect } from 'react-redux';
import {lessonbao} from '../../api/my'
import LessonItem from '../Course/LessonItem'
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
        let {data}=this.state;
        if(!data) return false;
        return (
            <div className="myLesson">
                {data&&data.length!==0? <div>
                    {data.map((item,index)=>{
                        console.log(item)
                        return <LessonItem item={item} key={index}></LessonItem>
                    })}
                </div>:'22'}
              
            </div>
        )
    }
  
}



export default connect()(Lesson)
