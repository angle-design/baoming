import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import '../../static/css/file.less';
const { Option } = Select;
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
                phone: ''
            }
        }
    }

    render() {
        return (
            <div className="FileBox">
                <div>
                    <p>
                        <font className="tit_text">话题：</font>
                        <span>大学</span>
                    </p>
                </div>
                <div>
                    <p>
                        <font>标题：</font>
                        <span><input type="text" placeholder="我是" />，</span>
                    </p>
                    <p>
                        <input type="text" placeholder="关于(35字以内)" maxlength="35" />，<font>问我吧！</font>
                    </p>
                </div>
                <div>
                    <p>
                        <font>内容：</font>
                        <textarea placeholder="请详细描述您的问题简介（400空以内)" maxlength="400"></textarea>
                    </p>
                </div>
                <div>
                    <p>
                        <span>
                            <i></i>
                            <font>点击上传封面（可选）</font>
                        </span>
                        <span className="img_big">
                            <img className="dapic" />
                            <i></i>
                        </span>
                    </p>
                </div>
                <div>
                    <p>
                        <font>姓名：</font>
                        <input type="text" />
                    </p>
                    <p>
                        <font >电话：</font>
                        <input type="number" />
                    </p>
                </div>

                <button>提交问吧</button>
            </div>
        )
    }
}



export default connect()(Fileload)
