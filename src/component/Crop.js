import React from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

class UserCropper extends React.Component {
  constructor(props) {
    super(props)
  }

  confirm = () => { // 确认生成
    return this.cropper.getCroppedCanvas().toDataURL()
  }
  toBlob = name => { // 转换为blob，以便上传
    const code = this.confirm()
    return this.base64ToBlob(code, name)
  }

  /**
   * base64转blob
   * @param {String} code base64数据
   * @param {String} name 文件名
   * @return {blob}
   */
  base64ToBlob(code, name) {
    let parts = code.split(';base64,')
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new window.Blob([uInt8Array], { type: contentType, name: name })
  }

  render() {
    return (
      <div style={containerStyle}>
        <div style={cropperContainer}>
          <Cropper
            ref={cropper => {
              this.cropper = cropper
            }}
            src={this.props.file} // 文件
            style={{ height: 328, width: 260 }} // 自定义样式
            aspectRatio={65 / 82} // 设置图片长宽比
            guides={false} // 是否显示九宫格
            preview=".cropper-preview" // 设置预览的dom
          />
          <div className="preview-container">
            <div className="cropper-preview" style={previewStyle} />
          </div>
        </div>
      </div>
    )
  }
}

const containerStyle = {}
const cropperContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end'
}

const previewStyle = {
  width: 130,
  height: 164,
  overflow: 'hidden',
  border: '1px solid #383838'
}

export default UserCropper;
// import React, { Component, useState } from 'react';
// import { connect } from 'react-redux';
// import '../../static/css/setup.less';
// import action from '../../store/action/index';
// import ImgCrop from 'antd-img-crop';
// import { Upload, Button, Modal, message } from 'antd'; //引入上传、按钮、弹窗等antd组件

// class SetUp extends Component {
//     constructor(props, context) {
//         super(props, context);
//         this.state = {
//             pupflag: false,
//             name: this.props.uinfo.a_uname,
//             sex: 1,
//             previewVisible: false,
//             previewImage: '',
//             fileList: [],
//         }
//     }
//     //上传文件改变时的状态，详情可以参考antd的Upload组件API参数
//     onChange = ({fileList}) => {
//         this.setState({ fileList });
//     };
    
//     async componentDidMount() {
//         let { queryInfo } = this.props;
//         await queryInfo();
//         this.setState({
//             name: this.props.uinfo.a_uname
//         })
//         if (parseFloat(this.props.uinfo.a_sex) === 1) {
//             this.setState({
//                 sex: 1
//             })
//         } else {
//             this.setState({
//                 sex: 2
//             })
//         }
//     }
//     render() {
//         let { uinfo } = this.props;
    
//         const { previewVisible, previewImage, fileList } = this.state;
//         const props = {
//             width: 600,  //裁剪宽度
//             height: 600, //裁剪高度
//             // resize: false, //裁剪是否可以调整大小
//             resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
//             modalTitle: "上传图片", //弹窗标题
//             modalWidth: 300, //弹窗宽度
//         };
        
//         return (
//             <div className="setup">
//                   <ImgCrop grid>
//                     <Upload
//                         name="file"
//                     　  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                         accept="image/*"
//                         listType="picture"
//                         fileList={fileList}
//                         // onPreview={this.handlePreview}
//                         onChange={this.onChange}
//                     >
//                         {/* {fileList.length >= 1 ? null : (<Button>添加图片</Button>)}　 */}
                 
//                 <p className="head">
//                     {uinfo.a_image ? <img src={uinfo.a_image} /> : <img src="../../assets/mohead.png" />}
//                     <span>更换头像</span>
//                 </p>
//                 </Upload>
//                 </ImgCrop>
//                 <p>
//                     <font>用户名</font>
//                     <input value={this.state.name || ''} onChange={this.handleChange} />
//                     <b>该账户已存在</b>
//                 </p>
//                 <p >
//                     <font>性&nbsp;&nbsp;&nbsp;别</font>
//                     <span className="sex" onClick={() => {
//                         this.setState({
//                             pupflag: true
//                         })
//                     }}>{parseFloat(this.state.sex) === 1 ? '男' : '女'}</span>
//                 </p>
//                 <button >退出账户</button>
//                 {this.state.pupflag ? <div className="pup">
//                     <div>
//                         <ul>
//                             <li onClick={() => {
//                                 this.setState({
//                                     sex: 1,
//                                     pupflag: false
//                                 })
//                             }}>男</li>
//                             <li onClick={() => {
//                                 this.setState({
//                                     sex: 2,
//                                     pupflag: false
//                                 })
//                             }}>女</li>
//                         </ul>
//                     </div></div> : ''}
                  
//             </div>
//         )
//     }
//     handleChange = e => {
//         this.setState({ name: e.target.value });
//     }
// }



// export default connect(state => state.my, action.my)(SetUp)
