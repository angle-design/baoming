import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { ao } from '../../unti.js'
import { getCodeMa, register } from '../../api/my';
import action from '../../store/action/index';

function loginFail() {
    const modal = Modal.error({
        title: '注册失败',
        content: '请稍后重新尝试',
    });
    setTimeout(() => modal.destroy(), 2000);
}
class Register extends Component {
    constructor(props, context) {
        super(props, context);
        // 切换验证码登陆和用户名密码登录
        this.state = {
            count: 60,
            liked: true,
            flag:false
        }
    }
    componentDidMount() {
        ao()
    }
    handleSubmit = ev => {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { phonename, password, codeMa } = values;
                // userPass = md5(userPass);
                let result = await register(
                    phonename, password, codeMa
                );
                if (parseFloat(result.statu) === 200) {
                    this.props.history.push('/my/login')
                    return;
                }
                loginFail();
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className="loginBox register">
            <h2>欢迎注册</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('phonename', {
                        rules: [
                            { required: true, message: '请输入手机号!' }
                        ]
                    })(
                        <Input
                            prefix={<i className="phone_icon"></i>}
                            placeholder="手机号"
                        />

                    )}
                    <p className="huoqu" onClick={this.getCode}>{this.state.liked ? '获取验证码' : this.state.count + '秒后重发'}</p>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('codeMa', {})(
                        <Input
                            prefix={<i className="ma_icon"></i>}
                            placeholder="请输入验证码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入密码!' },
                            { message: '输入的密码格式不正确', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/ }
                        ]
                    })(
                        <Input
                            prefix={<i className="pass_icon"></i>}
                            placeholder="密码由6-12位数字和字母组合形式"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <p className="forgot"><Link to="/my/forgot">忘记密码？</Link></p>
                </Form.Item>
                <Form.Item>
                    <p className="xieyi">
                        <i ></i>阅读并同意
                        <font onClick={()=>{
                            this.setState({
                                flag:true
                            })
                        }}>《报名大厅服务协议》</font>
                    </p>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确定
                </Button>
                </Form.Item>
            </Form>
            {/* <!-- 协议弹窗 --> */}
            {this.state.flag?<div className="pup">
                <div className="agreement_con">
                <i className="fa fa-times-circle"  onClick={()=>{
                            this.setState({
                                flag:false
                            })
                        }}>关闭</i>
                    <h3>报名大厅服务协议</h3>
                    <p>国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。</p>
                </div>
            </div>:''}
        </div>
    }
    //获取验证码
    getCode = ev => {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {

            if (!err) {
                let { phonename } = values;
                let result = await getCodeMa({
                    phone: phonename
                });
                console.log(result)
                if (parseFloat(result.statu) === 200) {
                    this.setState({
                        count: 60,
                        liked: false,
                    })
                    this.countDown()
                    return;
                }
            }
        });
    }
    //倒计时
    countDown() {
        const { count } = this.state
        if (count === 1) {//当为0的时候，liked设置为true，button按钮显示内容为 获取验证码
            this.setState({
                count: 60,
                liked: true,
            })
        } else {
            this.setState({
                count: count - 1,
                liked: false,
            })
            setTimeout(() => this.countDown(), 1000)//每一秒调用一次
        }
    }
    //发送验证码是否成功
    getSendCodeStatus = async (status, theme) => {
        if (status.success === false) {//若发送失败，提示客户信息发送失败，不进行倒计时
            // sendCodeError(theme)
        } else {
            // sendCodeSuccess(theme)//若发送成功，liked设为false，意味着发送验证码的按钮将被会禁用
            this.setState({
                authCode: '',
                email: '',
                liked: false,
            })
            this.countDown()//调用倒计时
        }
    }
}


export default Form.create()(connect(null, action.my)(Register));
