import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import { Toast} from 'antd-mobile';
import { ao } from '../../unti.js'
import { getCodeMa, savepassword } from '../../api/my';
import action from '../../store/action/index';

function loginFail() {
    const modal = Modal.error({
        title: '修改密码失败',
        content: '请稍后重新尝试',
    });
    setTimeout(() => modal.destroy(), 2000);
}
class Forgot extends Component {
    constructor(props, context) {
        super(props, context);
        // 切换验证码登陆和用户名密码登录
        this.state = {
            count: 60,
            liked: true
        }
    }
    componentDidMount() {
        ao()
    }
    handleSubmit = ev => {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { phonename, codeMa, password, newpassword } = values;
                // userPass = md5(userPass);
                let result = await savepassword(
                    phonename, codeMa, password, newpassword
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
        document.title = "忘记密码";
        const { getFieldDecorator } = this.props.form;
        //  密码验证
        const passwordValidator = (rule, value, callback) => {
            const { getFieldValue } = this.props.form;
            if (value && value !== getFieldValue('password')) {
                callback('两次输入不一致！')
            }
            // 必须总是返回一个 callback，否则 validateFields 无法响应
            callback();
        }

        return <div className="loginBox forgot">
            <h2>找回密码</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('phonename', {
                        rules: [
                            { required: true, message: '请输入手机号!' },
                            { min:4,message: '请输入11位手机号码~'},
                            {}
                        ]
                    })(
                        <Input
                            prefix={<i className="phone_icon"></i>}
                            placeholder="手机号"
                        />

                    )}
                    <p className="huoqu" onClick={this.getCode}>{this.state.liked ? <font>获取验证码</font> : <font style={{ color: '#999' }}>{this.state.count}秒后重发</font>}</p>
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
                    {getFieldDecorator('newpassword', {
                        rules: [{
                            required: true,
                            message: '请再次输入密码',
                        }, {
                            validator: passwordValidator
                        }]
                    })(
                        <Input
                            prefix={<i className="pass_icon"></i>}
                            placeholder="请再输一次密码"
                        />
                    )}
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
    getCode = async (ev) => {
        ev.preventDefault();
        let result = await getCodeMa({
            phone: this.props.form.getFieldsValue().phonename
        });
        if (parseFloat(result.statu) === 200) {
            this.setState({
                count: 60,
                liked: false,
            })
            this.countDown()
            return;
        }else{
            Toast.info(result.msg,1)
        }
    }
    //倒计时
    countDown() {
        const { count } = this.state
        if (count === 1) {
            this.setState({
                count: 60,
                liked: true,
            })
        } else {
            this.setState({
                count: count - 1,
                liked: false,
            })
            setTimeout(() => this.countDown(), 1000)
        }
    }
    //发送验证码是否成功
    getSendCodeStatus = async (status, theme) => {
        if (status.success === false) {
        } else {
            this.setState({
                authCode: '',
                email: '',
                liked: false,
            })
            this.countDown()
        }
    }
}


export default Form.create()(connect(null, action.my)(Forgot));
