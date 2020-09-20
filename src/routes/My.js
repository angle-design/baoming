import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Info from './My/Info';//我的首页
import Login from './My/Login';//登录
import Register from './My/Register';//注册
import Question from './My/Question';//注册
import FeedBack from './My/FeedBack';
import SetUp from './My/SetUp';
import Collection from './My/Collection';
import Comment from './My/Comment';
import Lesson from './My/Lesson';
import Topic from './My/Topic';
import Forgot from './My/Forgot';
import Teacher from './My/Teacher'
/*css */

import '../static/css/my.less';


export class My extends Component {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <section>
                <Switch>
                    <Route path='/my/info' component={Info} />
                    <Route path='/my/login' component={Login} />
                    <Route path='/my/register' component={Register} />
                    <Route path='/my/question' component={Question} />
                    <Route path='/my/feedback' component={FeedBack} />
                    <Route path='/my/setup' component={SetUp} />
                    <Route path='/my/comment' component={Comment} />
                    <Route path='/my/collection' component={Collection} />
                    <Route path='/my/topic' component={Topic} />
                    <Route path='/my/lesson' component={Lesson} />
                    <Route path='/my/forgot' component={Forgot} />
                    <Route path='/my/teacher' component={Teacher} />
                    <Redirect from='/my' to='/my/info' />
                </Switch>
            </section>
        )
    }
}

export default connect()(My);
