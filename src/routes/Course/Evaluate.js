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
            aIndex:0,
            data:[],
            inlist:['全部','好评','中评','差评']
        }
    }
    async componentWillMount() {
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
                <b>全部评价<font>（ {this.state.data.count}条 ）</font></b>
                <p>
                    {this.state.inlist.map((item,index)=>{
                        return <span key={index} className={this.state.aIndex==index?'active':''} onClick={ ()=>{
                            this.setState({
                                data:[],
                                aIndex:index
                            },async ()=>{
                                let result = await PingJia(this.props.item,index);
                                if (result.code == 200) {
                                   this.setState({
                                       data:result.list
                                   })
                                }
                            })
                        }}>{item}</span>
                    })}
                </p>
               
                {this.state.data && this.state.data.length !== 0 ? <div className="evallist">
                    {this.state.data.list.map((item,index)=>{
                        let {time,dianping,image,uinfo:{a_image,a_uname},zong}=item;
                        var arr=[];
                        if(image){
                            image=image.split('|');
                            image.pop()
                        }
                        return   <div className="evalitem" key={index}>
                        <div className="evaltop">
                            <p>
                                <img src={a_image} />
                    <span><font>{a_uname}</font><Star star={(parseInt(zong)*2)}></Star></span>
                            </p>
                    <font>{time}</font>
                        </div>
                    {dianping?<p>{dianping}</p>:''}
                    {image&&image.length!==0?<ul>
                        {image.map((item,index)=>{
                         return <li key={index}><img src={item} /></li>
                        })}
                        </ul>:''}
                    </div>
                    })}
                    <span className="more">更多评价</span>
                </div> : <Kong msg="暂无评价~"/>}

               
            </div>
        )
    }

}



export default connect()(Evaluate)
