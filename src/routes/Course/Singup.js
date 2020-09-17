import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Picker, Toast } from 'antd-mobile'
import City from '../../component/City';
import Qs from 'qs';
import {ao} from '../../unti.js'
import { Form, Input, Button, Modal, Select } from 'antd';
import { SchoolName, LessonName, BaoMing } from '../../api/course'
import '../../static/css/settlement.less';

const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#f1f1f1', height: '0.7rem', border: '0.02rem solid #d6d6d6', borderRadius: '4px' }}
    >
        <div className="test" style={{ display: 'flex', height: '0.66rem', lineHeight: '0.66rem', position: 'relative', borderBottom: 0 }}>
        {props.extra=='请选择/省/市/区'? <div style={{ textAlign: 'left', color: 'rgba(0, 0, 0, 0.3)',paddingLeft:'0.2rem' }}>{props.extra}</div>: <div style={{ textAlign: 'left', color: '#333',paddingLeft:'0.2rem' }}>{props.extra}</div>}
            {/* <div style={{ textAlign: 'left', color: '#333',paddingLeft:'0.2rem' }}>{props.extra}</div> */}
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
            name: '',
            lesson: ''
        };

    }
    async componentWillMount() {
        ao();
        // console.log(this.props.history.location.search)
        let { location: { search } } = this.props,
            { id = 0, cid = 0 } = Qs.parse(search.substr(1)) || {};
        this.id = id;
        this.cid = cid;
        let result = await SchoolName(this.id);
        if (result.code == 200) {
            console.log(result)
            this.setState({
                name: result.list.name
            })
        }
        let res = await LessonName(this.cid);
        if (res.code == 200) {
            if (res.list.ist == 2) {
                Toast.info("该课程禁止报名");
                this.props.history.push("/course");
                return false;
            }
            this.setState({
                lesson: res.list.name
            })
        }

    }
    componentDidMount() {

    }

    handleSubmit = ev => {

        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            var pickeritem=this.state.pickerValue.split(',');
            console.log(pickeritem)
            if (!err) {
                let result = await BaoMing({
                    jigou: this.state.name,
                    name: values.lianxiren,
                    phone: values.phone,
                    sheng:pickeritem[0],
                    shi: pickeritem[1],
                    xian: pickeritem[2],
                    dizhi: values.dizhi,
                    xingzhi: values.xingzhi,
                    liuyan: values.liuyan,
                    kecheng: this.state.lesson,
                    cid: this.cid
                });
                if(parseFloat(result.code) === 200){
                    Toast.info('恭喜你，报名成功～')
                    setTimeout(function(){
                        this.props.history.push('/course');
                    },1000)
                    return false;
                }
                loginFail()
            }
        })
    }
    handlePickerChange = vs => {
        this.setState({
            pickerValue: vs
        })
    };

    render() {

        const { getFieldDecorator, getFieldProps } = this.props.form;
        return (
            <div className="settlement">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label='机构名称'>
                        {getFieldDecorator('name', {
                            initialValue: this.state.name,
                            rules: [
                                { message: '请输入机构名称!' }
                            ]
                        })(<Input readOnly value="122" />)}
                    </FormItem>
                    <FormItem label='主打课程'>
                        {getFieldDecorator('kecheng', {
                            initialValue: this.state.lesson,
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
                    <FormItem label='地区'  style={{marginBottom:'0.2rem'}}>
                        {(<Picker extra="请选择/省/市/区"
                            onOk={this.handlePickerChange.bind(this)}
                            data={City}
                            title="请选择/省/市/区"
                            {...getFieldProps("district", {

                            })}
                        ><CustomChildren></CustomChildren></Picker>
                        )}
                    </FormItem>
                    <FormItem label='' style={{marginLeft:'2.2rem'}}>
                        {getFieldDecorator('dizhi', {
                        })(<Input placeholder="请输入详细地址"/>)}
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
                        {getFieldDecorator('liuyan', {
                            initialValue: '',
                        })(<Input.TextArea />)}
                    </FormItem>

                    <FormItem   style={{marginBottom:'0.1rem',marginTop:'0.5rem'}}>
                        <Button type="primary" htmlType="submit">立即报名</Button>
                    </FormItem>
                </Form>
                <p   style={{marginTop:'0rem'}}>
                    咨询电话：
          <a href="tel:13810087890">13810087890</a>
                </p>
            </div>
        )
    }
    defaultFormat = function defaultFormat(values) {
        // label is JSX.Element or other
        if (values.length > 0 && typeof values[0] !== 'string') {
            return values;
        }
        return values.join(',');
    };
    arrayTreeFilter(data, filterFn, options) {
        options = options || {};
        options.childrenKeyName = options.childrenKeyName || "children";
        var children = data || [];
        var result = [];
        var level = 0;
        do {
            var foundItem = children.filter(function (item) {
                return filterFn(item, level);
            })[0];
            if (!foundItem) {
                break;
            }
            result.push(foundItem);
            children = foundItem[options.childrenKeyName] || [];
            level += 1;
        } while (children.length > 0);
        return result;
    }
    handlePickerChange = vs => {

        var value = vs;
        var treeChildren = void 0;
        var data = City;
        treeChildren = this.arrayTreeFilter(data, function (c, level) {
            return c.value === value[level];
        });
        var s = this.defaultFormat(treeChildren.map(function (v) {
            return v.label;
        }));
        console.log(s);
        this.setState({
            pickerValue: s
        })
    };
}



export default Form.create()(connect()(Singup))
