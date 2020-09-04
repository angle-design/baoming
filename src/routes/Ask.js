import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import List from './Ask/List';
import Detail from './Ask/Detail';
import Replay from './Ask/replay';
import Fileload from './Ask/Fileload'
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
                    <Route path="/ask/detail/:id" component={Detail}/>
                    <Route path="/ask/replay/:id" component={Replay}/>
                    <Route path='/ask/fileload' component={Fileload} />
                </Switch>
           </section>
        )
    }
}

export default Ask;
