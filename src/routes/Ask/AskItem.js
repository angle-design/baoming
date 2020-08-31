import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class AskItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let {id,h_title,h_title2,ishot,h_image,isnow,uinfo:{a_uname,a_image},tagname:{name},zan,huifu}=this.props.item;

        return (
                <div className="ask_item">
                     <Link to={{
                                    pathname: '/ask/detail',
                                    search: `?id=${id}`
                                }}>
                    <div className="ask_img">
                        <img src={h_image}/>
                        {ishot==2? <span>置顶</span>:''}
                        <div>
                            <dl>
                                <dt>
                                    {
                                        a_image?<img src={a_image}/>:<img src={require('../../static/image/mohead.png')}/>
                                    }
                        
                                    <font></font>
                                </dt>
                                <dd>{a_uname}</dd>
                            </dl>
                            <font>{name}</font>
                        </div>
                    </div>
                    <p>{h_title+','+h_title2}</p>
                    <div className="ask_text">
                        {isnow==1 ?<font>提问进行时</font>: <font>提问已关闭</font>}
                        <p>
                            <span>
                                <i></i>
                                <font>{zan}</font>
                            </span>
                            <span>
                                <i></i>
                                <font>{huifu}</font>
                            </span>
                        </p>
                    </div>
               </Link>
                </div>
        )
    }
}

export default connect()(AskItem)
