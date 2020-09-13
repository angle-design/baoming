import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Picker } from 'antd-mobile'
import { district, provinceLite } from 'antd-mobile-demo-data';
import City from '../../component/City';
import Qs from 'qs';
import { Form, Input, Button, Modal, Select } from 'antd';
import '../../static/css/settlement.less';
import { querySettlement } from '../../api/settlement';
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px', position: 'relative', borderBottom: 0 }}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
        </div>
    </div>
);



const FormItem = Form.Item;
const { Option } = Select;
function loginFail() {
    const modal = Modal.error({
        title: '注册失败',
        content: '请稍后重新尝试!',
    });
    setTimeout(() => modal.destroy(), 2000);
}
class Singup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pickerValue: [],
        };

    }
    componentWillMount() {

        // console.log(this.props.history.location.search)
        let { location: { search } } = this.props,
            { id = 0, a = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;
        this.a = a;
    }
    componentDidMount() {
        
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
        })
    }  
    handlePickerChange = vs => {
        this.setState({
            pickerValue:vs
        })
      };

    render() {

        const { getFieldDecorator, getFieldProps } = this.props.form;
        return (
            <div className="settlement">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label='机构名称'>
                        {getFieldDecorator('name', {
                            rules: [
                                { message: '请输入机构名称!' }
                            ]
                        })(<Input readOnly />)}
                    </FormItem>
                    <FormItem label='主打课程'>
                        {getFieldDecorator('kecheng', {
                            rules: [
                                { message: '请输入主打课程!' }
                            ]
                        })(<Input readOnly />)}
                    </FormItem>
                    <FormItem label='姓名'>
                        {getFieldDecorator('lianxiren', {
                            rules: [
                                { required: true, message: '请输入姓名!' }
                            ]
                        })(<Input />)}
                    </FormItem>

                    <FormItem label='电话'>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '请输入手机号!' }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='地区'>
                        {(<Picker extra="请选择/省/市/区"
                        onOk={this.handlePickerChange.bind(this)}
                            data={City}
                            title="请选择/省/市/区"
                            {...getFieldProps("district", {
                        
                              })}
                        ><CustomChildren></CustomChildren></Picker>
                        )}
                    </FormItem>
                    <FormItem label='性质'>
                        {getFieldDecorator('xingzhi', {
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
                    <FormItem label='留言'>
                        {getFieldDecorator('liuyan')(<Input.TextArea />)}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit">立即报名</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}



export default Form.create()(connect()(Singup))
