import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, Select } from 'antd';
import {ao} from '../unti.js'
import '../static/css/settlement.less';
import { querySettlement } from '../api/settlement';
const FormItem = Form.Item;
const { Option } = Select;
function loginFail() {
    const modal = Modal.error({
        title: '注册失败',
        content: '请稍后重新尝试!',
    });
    setTimeout(() => modal.destroy(), 2000);
}
class Settlement extends Component {
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
                let result = await querySettlement(values);
                console.log(result)
                if (parseFloat(result.code) === 200) {
                    this.props.history.push('/course');
                    return;
                }
                loginFail()
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="settlement">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label='机构名称'>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入机构名称!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='主打课程'>
                        {getFieldDecorator('kecheng', {
                            rules: [
                                { required: true, message: '请输入主打课程!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='性质'>
                        {getFieldDecorator('xingzhi', {
                            rules: [
                                { required: true, message: '请输入性质!' }
                            ]
                        })(<Select
                            placeholder=""
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="线上课程">线上课程</Option>
                            <Option value="线下课程">线下课程</Option>
                            <Option value="国际课程">国际课程</Option>
                            <Option value="其他">其他</Option>
                        </Select>)}
                    </FormItem>
                    <FormItem label='机构联系人'>
                        {getFieldDecorator('lianxiren', {
                            rules: [
                                { required: true, message: '请输入机构联系人!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='职务'>
                        {getFieldDecorator('zhiwu', {
                            rules: [
                                { required: true, message: '请输入职务!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='手机'>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '请输入手机号!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='机构网站'>
                        {getFieldDecorator('wangzhan')(<Input />)}
                    </FormItem>
                    <FormItem label='微信号'>
                        {getFieldDecorator('weixin')(<Input />)}
                    </FormItem>
                    <FormItem label='地址'>
                        {getFieldDecorator('dizhi')(<Input />)}
                    </FormItem>
                    <FormItem label='留言'>
                        {getFieldDecorator('liuyan')(<Input.TextArea />)}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit">立即注册</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}



export default Form.create()(connect()(Settlement))
