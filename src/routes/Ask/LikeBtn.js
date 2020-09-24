import React from 'react'
import { Icon } from 'antd';
// import ReactDOM from 'react-dom'
// import './Changeinfo.css';
// import { Icon } from 'antd';
 class LikeBtn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            like:100,
            liked:'null',
        };
    }
    islike =()=>{
        let liked=this.state.liked;
        if(liked){
            if(liked==='like'){
            this.setState({liked:null}) 
            this.setState({like:this.state.like-1});
        }
            else
            {
                this.setState({liked:'like'});
                this.setState({ like:this.state.like+1,});
                
            }     
    }
    else {
        this.setState({
            like:this.state.like+1,
        });
        this.setState({liked:'like'});
    }
};
     render(){
        
         return(
               <div style={{width:60,float:"left"}}>
                <Icon onClick={this.islike} type='like' theme={this.state.liked==='like' ?'filled':''}/>{this.state.like}
                </div> 
         );
     }
 }
 export default LikeBtn;