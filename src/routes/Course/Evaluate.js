import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PingJia } from '../../api/course'
import '../../static/css/evaluat.less'
import Star from './Star';
import Kong from '../../component/kong';
class Evaluate extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
    }
    async componentWillMount() {
        console.log(this.props.item)
        let result = await PingJia(this.props.item);
        if (result.code == 200) {
           this.setState({
               data:result.list
           })
        }
    }
    render() {
        
        return (
            <div className="evaluateBox">
                <b>全部评价<font>（ 5934条 ）</font></b>
                <p><span className="active">全部</span><span>好评</span><span>中评</span><span>差评</span></p>
                {this.state.data && this.state.data.length !== 0 ? <div className="evallist">
                    {this.state.data.list.map((item,index)=>{
                        let {time,dianping}=item;
                        return   <div className="evalitem" key={index}>
                        <div className="evaltop">
                            <p>
                                <img src={require('../../static/image/mohead.png')} />
                                <span><font>大男子主义</font><Star star={7}></Star></span>
                            </p>
                    <font>{time}</font>
                        </div>
                    <p>{dianping}</p>
                        <ul>
                            <li><img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg" /></li>
                            <li><img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg" /></li>
                            <li><img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg" /></li>
                        </ul>
                    </div>
                    })}
                    <span className="more">更多评价</span>
                </div> : <Kong msg="暂无评价~"/>}

               
            </div>
        )
    }

}



export default connect()(Evaluate)
