import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import List from './Ask/List';
import Detail from './Ask/Detail';

/*css */
import '../static/css/ask.less';

export class Ask extends Component {
    constructor(props,context) {
        super(props,context)
    }
   
    render() {
        return (
           <section className="askBox">
                <Switch>
                    <Route path="/ask" exact component={List}/>
                    <Route path="/ask/detail" component={Detail}/>
                </Switch>
           </section>
        )
    }
}

export default Ask;
