/*base */
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'

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
                    <CacheSwitch>
                        <CacheRoute  saveScrollPosition={true} path="/course" component={Home}></CacheRoute>
                        <Route path="/headline" component={Headline}></Route>
                        <Route path="/ask" component={Ask}></Route>
                        <Route path="/settlement" component={Settlement}></Route>
                        <Route path="/my" component={My}></Route>
                        <Redirect to="/course"></Redirect>
                    </CacheSwitch>
                </main>

                {/* footer */}
                <NavBottom/>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>, root)

