import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, Select} from 'antd';
import {Toast} from 'antd-mobile'
import {ao} from '../../unti.js'
import '../../static/css/settlement.less';
import { teachForm } from '../../api/my';
const FormItem = Form.Item;
const { Option } = Select;
function loginFail() {
    const modal = Modal.error({
        title: '注册失败',
        content: '请稍后重新尝试!',
    });
    setTimeout(() => modal.destroy(), 2000);
}
class Teacher extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        ao()
    }
    handleSubmit = ev => {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(values)
            if (!err) {
                let result = await teachForm(values);
                console.log(result)
                if (parseFloat(result.code) === 200) {
                    Toast.info('提交成功',1)
                    // this.props.history.push('/course');
                    return;
                }
                loginFail()
            }
        });
    }
    render() {
        document.title = "申请名师";
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="settlement teacher">
                <p className="tip">（以下均为必填项）</p>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label='姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:'>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入姓名!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:'>
                        {getFieldDecorator('gangwei', {
                            rules: [
                                { required: true, message: '请输入岗位!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='所在单位:'>
                        {getFieldDecorator('danwei', {
                            rules: [
                                { required: true, message: '请输入所在单位!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                 
                    <FormItem label='联系方式:'>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '请输入手机号!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='自我介绍：'>
                        {getFieldDecorator('jieshao')(<Input.TextArea />)}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}



export default Form.create()(connect()(Teacher))
