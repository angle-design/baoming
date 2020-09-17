/*
 * 真实REACT/VUE项目中，我们会把所有向服务器发送具体请求的操作写在API中（不写在组件内部，方便请求处理的统一管理）
 *
 *   INDEX：是把AXIOS或者FETCH等进行初始处理或者二次封装的地方
 */



// axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);//=>把POST/PUT，通过请求主体传递给服务器的内容，统一处理为X-WWW-URL-ENCODED格式
// axios.interceptors.response.use(result => result.data);//=>响应拦截器:把服务返回的信息中响应主体内容拦截返回，以后在THEN中获取的结果就是主体内容



import axios from 'axios';
import Qs from 'qs';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {LoadPage} from '../component/LoadPage'
const Axios=axios.create({
    timeout:20000,
})
let requestCount=0;
// 显示loading
function showLoading(){
    if(requestCount===0){
        var dom = document.createElement('div');
        dom.setAttribute('id', 'loading');
        document.body.appendChild(dom)
        ReactDOM.render(<LoadPage > </LoadPage>, dom)
    }
    requestCount++
}
// 隐藏loading
function hideLoading(){
    requestCount--;
    if(requestCount===0){
        document.body.removeChild(document.getElementById('loading'))
    }
}
Axios.defaults.baseURL = '';
Axios.defaults.withCredentials = true;//=>允许跨域(并且允许携带COOKIE)
Axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);
// 请求前拦截
Axios.interceptors.request.use(
    config => {
        if(config.headers.isLoading!==false){
            showLoading()
        }
        return config;
    },
    err => {
        if(err.config.headers.isLoading!==false){
            hideLoading()
        }
        return Promise.reject(err);
    }
);

// 返回后拦截
Axios.interceptors.response.use(
    result => {
        // if(result.config.headers.isLoading!==false){
        //     return result.data
        // }
        if(result.code==200||result.status==200){
            hideLoading()
            return result.data
        }
        
    },err=>{
        if(err.config.headers.isLoading!==false){
          hideLoading()
        }
        return Promise.reject(err);
    }
);
Component.prototype.$axios = Axios;
export default Axios;