import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../static/css/evaluat.less'
import Star from './Star';
class Evaluate extends Component {

    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
      
    }
    render() {
    
        return (
          <div className="evaluateBox">
              <b>全部评价<font>（ 5934条 ）</font></b>
              <p><span className="active">全部</span><span>好评</span><span>中评</span><span>差评</span></p>
            <div className="evallist">
                <div className="evalitem">
                    <div className="evaltop">
                    <p>
                        <img src={require('../../static/image/mohead.png')}/>
                        
                            <span><font>大男子主义</font><Star star={7}></Star></span>
                            
                        </p>
                        <font>2020-10-08</font>
                    </div>
                    <p>这个垫非常好呢这个垫非常好呢，这个垫非常好呢，这个垫非常好呢这个垫非常好呢这个垫非常好呢这个垫非常好呢这个垫非常好呢，这个垫非常好呢</p>
                    <ul>
                        <li><img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg"/></li>
                        <li><img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg"/></li>
                        <li><img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg"/></li>
                    </ul> 
                </div>
            </div>
            <span className="more">更多评价</span>
          </div>
        )
    }
  
}



export default connect()(Evaluate)
