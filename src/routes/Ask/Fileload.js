import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImgCrop from 'antd-img-crop';
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
    render() {
        const data = this.state.data;
        const $this = this;
        const props = {
            ref: "upload",
            action: '/api/api/upload/uploadimage', //这块是将后台给你的接口地址需要改一下你自己的交互地址
            listType: 'picture',
            className: 'upload-list-inline',
            onChange({ file, fileList }) {//file,和fileList是组件自带的参数，根据你上面赋值过去的接口给你返回的内容，file是个对象，fileList是个数组，其实file对象就相当于你用axios方法返回的response对象差不多啦~
                if (file.status === 'done') {
                    console.log(1)
                    console.log(file)
                    $this.setState({
                        organCertUrl: file.response.data.src,//前面是我的存放地址的对象
                    })
                }
            }
        }
        const props1 = {
            width: 500,  //裁剪宽度
            height: 300, //裁剪高度
            resize: false, //裁剪是否可以调整大小
            resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
            modalTitle: "上传图片", //弹窗标题
            modalWidth: 600, //弹窗宽度
        };
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
                        <font>标题：</font>
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
                    <p>
                        <font>内容：</font>
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
                        <ImgCrop grid  {...props1}>
                            <Upload
                                {...props}
                                beforeUpload={this.beforeUpload}
                            >
                                <span>
                                    <i></i>
                                    <font>点击上传封面（可选）</font>
                                </span>
                              </Upload>
                              </ImgCrop>
                                        {/* <span className="img_big">
                            <img className="dapic" />
                            <i></i>
                        </span> */}
                        
                    </p>
                </div>
                                <div>
                                    <p>
                                        <font>姓名：</font>
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
                                        <font >电话：</font>
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

                                <button onClick={this.handleToSend}>提交问吧</button>
            </div>
        )
    }
    handleToSend = () => {
                                console.log(this.state.data)
                            }
}



export default connect()(Fileload)
