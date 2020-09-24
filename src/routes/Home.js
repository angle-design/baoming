import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import List from './Course/List';
import Info from './Course/Info';
import Search from './Course/Search';
import Singup from './Course/Singup';

/*css */
import '../static/css/course.less';
import LessonDetail from './Course/Lessondetails';

export class Home extends Component {
    constructor(props,context) {
        super(props,context)
    }
    
    render() {
        return (
           <section className="courseBox">
                <CacheSwitch>
                    <CacheRoute  saveScrollPosition={true} path="/course" exact component={List}/>
                    <Route path="/course/info" component={Info}/>
                    <CacheRoute  saveScrollPosition={true}  path="/course/search" component={Search}/>
                    <Route path="/course/lessondetail/:id" component={LessonDetail}/>
                    <Route path="/course/singup/" component={Singup}/>
                </CacheSwitch>
           </section>
        )
    }
}

export default Home;
