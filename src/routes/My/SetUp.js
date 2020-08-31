import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import '../../static/css/setup.less';
import action from '../../store/action/index';
import ImgCrop from 'antd-img-crop';
import { Upload, Button, Modal, message } from 'antd'; //引入上传、按钮、弹窗等antd组件
import {imgload} from '../../api/my'
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
            organCertUrl:''
        }
    }
    //上传文件改变时的状态，详情可以参考antd的Upload组件API参数
    // onChange = ({fileList}) => {
    //     this.setState({ fileList });
    // };
    // onChange = info => {
    //     if (info.file.status === 'uploading') {
    //         // this.setState({ loading: true });
    //         console.log(info.file)
    //         return;
    //     }
    //     if (info.file.status === 'uploading') {
    //         imgload(info.file.response.file_url);
    //         console.log(info.file)
    //         // this.setState({
    //         //     imageUrl: info.file.response.file_url,
    //         //     loading: false,
    //         // })
    //     }
 
    // }

    beforeUpload = (file)=> {
        const _this = this;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
 
    }
    async componentDidMount() {
        let { queryInfo } = this.props;
        await queryInfo();
        this.setState({
            name: this.props.uinfo.a_uname
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
    render() {
        let { uinfo } = this.props;
    
        const { previewVisible, previewImage, fileList } = this.state;
        const $this=this;
        const props = {
            ref:"upload",
            action: '/api/api/upload/uploadimage', //这块是将后台给你的接口地址需要改一下你自己的交互地址
            listType: 'picture',
            className: 'upload-list-inline',
            onChange({ file, fileList }) {//file,和fileList是组件自带的参数，根据你上面赋值过去的接口给你返回的内容，file是个对象，fileList是个数组，其实file对象就相当于你用axios方法返回的response对象差不多啦~
                if (file.status === 'done') {
                    console.log(1)
                    console.log(file)
                  $this.setState({
                    organCertUrl:file.response.result,//前面是我的存放地址的对象
                  })
                }
             }
          }
    
        return (
            <div className="setup">
                  <ImgCrop grid>
                    <Upload
                        {...props}
                        beforeUpload={this.beforeUpload}
                    >
                        {/* {fileList.length >= 1 ? null : (<Button>添加图片</Button>)}　 */}
                 
                <p className="head">
                    {uinfo.a_image ? <img src={uinfo.a_image} /> : <img src="../../assets/mohead.png" />}
                    <span>更换头像</span>
                </p>
                </Upload>
                </ImgCrop>
                <p>
                    <font>用户名</font>
                    <input value={this.state.name || ''} onChange={this.handleChange} />
                    <b>该账户已存在</b>
                </p>
                <p >
                    <font>性&nbsp;&nbsp;&nbsp;别</font>
                    <span className="sex" onClick={() => {
                        this.setState({
                            pupflag: true
                        })
                    }}>{parseFloat(this.state.sex) === 1 ? '男' : '女'}</span>
                </p>
                <button >退出账户</button>
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
    handleChange = e => {
        this.setState({ name: e.target.value });
    }

}



export default connect(state => state.my, action.my)(SetUp)
