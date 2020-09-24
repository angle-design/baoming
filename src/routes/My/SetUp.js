import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom'
import '../../static/css/setup.less';
import action from '../../store/action/index';
import ImgCrop from 'antd-img-crop';
import { Upload, Button, Modal, message } from 'antd'; //引入上传、按钮、弹窗等antd组件
import { imgload, setMyinfo, checkLoginOut } from '../../api/my';
const alert = Modal.alert;
class SetUp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pupflag: false,
            name: this.props.uinfo.a_uname,
            sex: 1,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            organCertUrl: '',
            isPrompt: true,
        }
    }

    beforeUpload = (file) => {
        const _this = this;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('您上传的图片格式不正确～');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2M,请重新上传～');
        }
        return isJpgOrPng && isLt2M;

    }
    async componentDidMount() {
        console.log(this.props.uinfo)
        let { queryInfo } = this.props;
        await queryInfo();
        this.setState({
            name: this.props.uinfo.a_uname,
            organCertUrl: this.props.uinfo.a_image,
        })
        if (parseFloat(this.props.uinfo.a_sex) === 1) {
            this.setState({
                sex: 1
            })
        } else {
            this.setState({
                sex: 2
            })
        }
    }
    componentWillUnmount() {
      
    }
    render() {
        document.title = "设置";
        if(this.props.uinfo&&this.props.uinfo=={}) return '';
  
        let { uinfo } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;

        const $this = this;
        const props = {
            ref: "upload",
            action: '/api/api/upload/uploadimage', //这块是将后台给你的接口地址需要改一下你自己的交互地址
            listType: 'picture',
            className: 'upload-list-inline',
            onChange({ file, fileList }) {//file,和fileList是组件自带的参数，根据你上面赋值过去的接口给你返回的内容，file是个对象，fileList是个数组，其实file对象就相当于你用axios方法返回的response对象差不多啦~
                if (file.status === 'done') {
                    $this.setState({
                        organCertUrl: file.response.data.src,//前面是我的存放地址的对象
                    })
                }
            }
        }
        const props1 = {
            aspect:1/1,
            width: 300,  //裁剪宽度
            height: 300, //裁剪高度
            // resize: false, //裁剪是否可以调整大小
            resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
            modalTitle: "上传图片", //弹窗标题
            modalWidth: 100, //弹窗宽度
            scale:60,
        };

        return (
            <div className="setup">
                <Prompt
                    when={this.state.isPrompt}
                    message={(location) => {
                        if(!this.state.isPrompt){
                            return true;
                        }
                        let _this=this;
                        let { a_image, a_sex, a_uname } = this.props.uinfo;
                       
                        if (this.state.organCertUrl != a_image || this.state.sex != a_sex || this.state.name != a_uname) {
                            Modal.confirm({
                                title: '即将离开当前页面，是否保存当前修改?',
                                content: '',
                                okText: '保存',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk: async () => {
                                    let result = await setMyinfo(this.state.organCertUrl, this.state.name, this.state.sex);
                                    if (result.code == 200) {
                                        this.props.queryInfo();
                                        _this.setState({
                                            isPrompt:false,
                                        },()=>{
                                            console.log(location)
                                            _this.props.history.push(location.pathname)
                                        })
                                    }
                                },
                                onCancel() { 
                                    _this.setState({
                                        isPrompt:false,
                                    },()=>{
                                        console.log(location)
                                        _this.props.history.push(location.pathname)
                                    })
                                 },
                            });
                            return false;
                        }else{
                            return true
                        }
                    }
                    }
                />

                <ImgCrop {...props1}>
                    <Upload
                        {...props}
                        beforeUpload={this.beforeUpload}
                    >
                        <p className="head">
                            {this.state.organCertUrl ? <img src={this.state.organCertUrl} /> : <img  src={require('../../static/image/mohead.png')}/>}
                            <span>更换头像</span>
                        </p>
                    </Upload>
                </ImgCrop>
                <p>
                    <font>用户名</font>
                    <input value={this.state.name || ''} onChange={(event)=>{
                        this.setState({
                            name:event.target.value
                        })
                    }} />
                    {/* <b>该账户已存在</b> */}
                </p>
                <p >
                    <font>性&nbsp;&nbsp;&nbsp;别</font>
                    <span className="sex" onClick={() => {
                        this.setState({
                            pupflag: true
                        })
                    }}>{parseFloat(this.state.sex) === 1 ? '男' : '女'}</span>
                </p>
                <button onClick={async () => {
                    let result = await checkLoginOut();
                    if (result.statu == 200) {
                        this.props.history.push("/my/login");
                        this.props.queryLoginFlag();
                        // this.props.queryInfo();
                        // this.props.uinfo={}
                    }
                }}>退出账户</button>
                {this.state.pupflag ? <div className="pup">
                    <div>
                        <ul>
                            <li onClick={() => {
                                this.setState({
                                    sex: 1,
                                    pupflag: false
                                })
                            }}>男</li>
                            <li onClick={() => {
                                this.setState({
                                    sex: 2,
                                    pupflag: false
                                })
                            }}>女</li>
                        </ul>
                    </div></div> : ''}
            </div>
        )
    }


}



export default connect(state => state.my, action.my)(SetUp)
