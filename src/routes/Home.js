import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

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
                <Switch>
                    <Route path="/course" exact component={List}/>
                    <Route path="/course/info" component={Info}/>
                    <Route path="/course/search" component={Search}/>
                    <Route path="/course/lessondetail/:id" component={LessonDetail}/>
                    <Route path="/course/singup/" component={Singup}/>
                </Switch>
           </section>
        )
    }
}

export default Home;
