import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import List from './Course/List';
import Info from './Course/Info';

/*css */
import '../static/css/course.less';

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
                </Switch>
           </section>
        )
    }
}

export default Home;
