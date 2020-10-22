import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import lrz from 'lrz';
import {askCommit} from '../../api/ask'
import { ActionSheet, InputItem, TextareaItem, Toast } from 'antd-mobile';
import { Upload, Button, Modal, message } from 'antd'; //引入上传、按钮、弹窗等antd组件
import '../../static/css/file.less';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
class Fileload extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                tag: '',
                title: '',
                title2: '',
                content: '',
                image: '',
                name: '',
                phone: '',
            },
            clicked: '小学',
            organCertUrl: '',
            sendflag:false,
            fileList: [],
        }
    }
    showActionSheet = () => {
        const BUTTONS = ['初中', '高中', '小学', '大学', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            // title: 'title',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
            (buttonIndex) => {
                if (buttonIndex == BUTTONS.length - 1) {
                    return false
                }
                this.setState({ clicked: BUTTONS[buttonIndex] });
            });
    }
    onChange = ({fileList}) => {
        this.setState({ fileList });
    };
     beforeUpload=(file)=>{
         
        console.log('file', file);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大于2MB!');
        }
        return isLt2M;
    } 
    render() {
        document.title ='创建问吧';
        const $this = this;
        // const props = {
        //     ref: "upload",
        //     action: '/api/api/upload/uploadimage',
        //     listType: 'picture',
        //     className: 'upload-list-inline',
        //     onChange({ file, fileList }) {
        //         if (file.status === 'done') {
        //             $this.setState({ 
        //                 organCertUrl:  file.response.data.src
        //             })
        //         }
        //     }
        // }
        const props1 = {
            aspect: 375 / 124,
            width: document.body.clientWidth,
            height: parseInt(document.body.clientWidth) / 375 * 124,
            resize: false, //裁剪是否可以调整大小
            resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
            modalTitle: "上传图片", //弹窗标题
            modalWidth: 600, //弹窗宽度
        };
        let {sendflag,data}=this.state,
         {title,title2,content,image,name,phone}=this.state.data;
        return (
            <div className="FileBox">
                <div>
                    <p onClick={this.showActionSheet}>
                        <font className="tit_text">话题：</font>
                        <span>{this.state.clicked}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <font className={sendflag&&!title?'tit_text error':'tit_text'}>标题：</font>
                        <span style={{ display: 'flex' }}> <InputItem
                            placeholder="我是"
                            onChange={(e) => {
                                data.title = e;
                                this.setState({
                                    data
                                })
                            }}
                        ></InputItem>，</span>
                    </p>
                    <p>
                        <InputItem
                            placeholder="我是"
                            maxLength="35"
                            placeholder="关于(35字以内)"
                            onChange={(e) => {
                                data.title2 = e;
                                this.setState({
                                    data
                                })
                            }}
                        ></InputItem>，<font>问我吧！</font>
                    </p>
                </div>
                <div>
                    <p > 
                        <font  className={sendflag&&!content?'tit_text error':'tit_text'}>内容：</font>
                        <TextareaItem
                            placeholder="请详细描述您的问题简介（400空以内)"
                            data-seed="logId"
                            autoHeight
                            maxLength="400"
                            onChange={(e) => {
                                data.content = e;
                                this.setState({
                                    data
                                })
                            }}
                        ></TextareaItem>
                    </p>
                </div>
                <div>
                    <p>
                        <ImgCrop   {...props1}>
                            <Upload
                                name="file"
                                　  action="/api/api/upload/uploadimage"
                                    accept="image/*"
                                    listType="picture"
                                    fileList={this.state.fileList}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.onChange}
                            >
                                {!this.state.organCertUrl ? <span>
                                    <i></i>
                                    <font>点击上传封面（可选）</font>
                                </span> : <span className="img_big">
                                        <img className="dapic" src={this.state.organCertUrl } />
                                        <i onClick={this.close}></i>
                                    </span>}
                            </Upload>
                        </ImgCrop>
                    </p>
                </div>
                <div>
                    <p>
                        
                        <font  className={sendflag&&!name?'tit_text error':'tit_text'}>姓名：</font>
                        <InputItem
                            onChange={(e) => {
                                data.name = e;
                                this.setState({
                                    data
                                })
                            }}
                        ></InputItem>
                    </p>
                    <p>
                        <font  className={sendflag&&!phone?'tit_text error':'tit_text'}>电话：</font>
                        <InputItem
                            type="number"
                            onChange={(e) => {
                                data.phone = e;
                                this.setState({
                                    data
                                })
                            }}
                        ></InputItem>
                    </p>
                </div>

                <button onClick={this.handleToSend} className={title2&&title&&content&&name&&phone&&this.state.organCertUrl?'btnactive':''}>提交问吧</button>
            </div>
        )
    }
   
    handleToSend =async () => {
        this.setState({
            sendflag:true
        })
        const data = this.state.data;
        data.image = this.state.organCertUrl;
        data.tag = this.state.clicked;
        this.setState({
            data
        })
        if(!this.state.organCertUrl){
            Toast.info('你还没有上传图片哦~')
        }
        let result=await askCommit(this.state.data);
        if(result.code==200){
            Toast.info('管理员将在2个工作日内完成审核。')
        }else if(result.code==400){
            Toast.info('您已提交成功，请勿重复提交。')
        }
    };
  
    close=(ev)=>{
        ev.preventDefault
        this.setState({
            organCertUrl:''
        })
    }
}



export default connect()(Fileload)
