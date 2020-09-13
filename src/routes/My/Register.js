import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { Link } from 'react-router-dom';
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
            liked: true
        }
    }
 
    handleSubmit = ev => {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { phonename, password,codeMa} = values;
                // userPass = md5(userPass);
                let result = await register(
                    phonename,password,codeMa
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
                                prefix={<Icon type="user" />}
                                placeholder="手机号"
                            />

                        )}
                        <p className="huoqu" onClick={this.getCode}>{this.state.liked ? '获取验证码' : this.state.count + '秒后重发'}</p>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('codeMa', {})(
                            <Input
                                prefix={<Icon type="lock" />}
                                placeholder="请输入验证码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {})(
                            <Input
                                prefix={<Icon type="lock" />}
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
                        <font>《报名大厅服务协议》</font>
                     </p>
                     </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            确定
                </Button>
                    </Form.Item>
                </Form>
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


export default Form.create()(connect(null,action.my)(Register));
