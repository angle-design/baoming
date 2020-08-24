/*base */
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

/*redux store */
import { Provider } from 'react-redux';
import store from './store';

/*antd */
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

/*import css */
import './static/css/common.less';
import './static/css/reset.min.css';
// import component
import NavBottom from './component/NavBottom';
import Home from './routes/Home';
import My from './routes/My';
import Settlement from './routes/Settlement';
import Headline from './routes/Headline';
import Ask from './routes/Ask';

/*render*/
render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <div>
                {/* main=>route */}
                <main className='container'>
                    <Switch>
                        <Route path="/course" component={Home}></Route>
                        <Route path="/headline" component={Headline}></Route>
                        <Route path="/ask" component={Ask}></Route>
                        <Route path="/settlement" component={Settlement}></Route>
                        <Route path="/my" component={My}></Route>
                        <Redirect to="/course"></Redirect>
                    </Switch>
                </main>

                {/* footer */}
                <NavBottom/>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>, root)

