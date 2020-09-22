import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Affix, Button } from 'antd';
import Zmage from 'react-zmage';
import { PingJia } from '../../api/course'
import '../../static/css/evaluat.less'
import Star from './Star';
import Kong from '../../component/kong';
import { compose } from 'redux';
class Evaluate extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            aIndex:0,
            data:[],
            inlist:['全部','好评','中评','差评'],
            top:0,
            isLoading:false,
            page:1,
            count:0,
            flag:true,
            idid:this.props.idid
        }
    }
  

    async componentWillMount() {
        let result = await PingJia(this.props.item,0,1);
        if (result.code == 200) {
           this.setState({
               data:result.list.list,
               count:result.list.count
           })
        }
    }
  async componentWillReceiveProps(nextProps) {
     if(this.state.idid!==nextProps.idid){
        let result = await PingJia(this.props.item,0,1);
        if (result.code == 200) {
           this.setState({
               data:result.list.list,
               count:result.list.count
           })
        }
     }
 }
    render() {
        return (
            <div className="evaluateBox" data-id={this.state.idid}>
                <b>全部评价<font>（ {this.state.count}条 ）</font></b>
                <Affix offsetTop={this.state.top}>
                <p className="tab_pingjia">
                    {this.state.inlist.map((item,index)=>{
                        return <span key={index} className={this.state.aIndex==index?'active':''} onClick={ ()=>{
                            this.setState({
                                data:[],
                                page:1,
                                aIndex:index,
                                flag:true,
                                isLoading:false
                            },async ()=>{
                                let result = await PingJia(this.props.item,index,1);
                                if (result.code == 200) {
                                   this.setState({
                                    count:result.list.count,
                                       data:result.list.list
                                   })
                                }else if(result.code == 404){
                                    this.setState({
                                        count:0
                                       })
                                }
                            })
                        }}>{item}</span>
                    })}
                </p>
               </Affix>
                {this.state.data && this.state.data.length !== 0 ? <div className="evallist">
                    {this.state.data.map((item,index)=>{
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
                         return <li key={index}><Zmage src={item} /></li>
                        })}
                        </ul>:''}
                    </div>
                    })}
                  {this.state.flag?(
                        <Button  onClick={this.loadMore} loading={this.state.isLoading} className="more">加载更多评价</Button>):<p style={{fontSize:'0.24rem',color:'#999',textAlign:'center',padding:'0 0 0.2rem'}}>没有更多数据</p>}
                </div> : <Kong msg="暂无评价~"/>}

               
            </div>
        )
    }
    loadMore = () => {

        //=>防止重复点击
        if (this.state.isLoading) return;
        this.setState({isLoading: true});
        this.setState({
            page:this.state.page+1
        },async ()=>{
            let result = await PingJia(this.props.item,this.state.aIndex,this.state.page);
            if (result.code == 200) {
                console.log(this.state.data)
                if(result.list.list&&result.list.list.length!==0){
                    this.setState({
                        isLoading:false,
                        data:this.state.data.concat(result.list.list)
                    })
                    if(result.list.list.length<3){
                        this.setState({
                            flag:false,
                            data:this.state.data.concat(result.list.list)
                        })
                        return false;
                    }
                }else{
                  this.setState({
                      flag:false
                  })
                }
             
            }else{
                this.setState({
                    flag:false  
                })
            }
        })
    };

}



export default connect()(Evaluate)
