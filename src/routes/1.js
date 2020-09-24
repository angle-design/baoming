import React, { Component } from 'react';
import { connect } from 'react-redux';

import LessonItem from '../Course/LessonItem'
import '../../static/css/mylesson.less'
class Lesson extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        this.scrollTabX()
    }
    render() {
        return (
            <div className="myLesson">
                <div className="nav">
                    <ul id="nav" ref="nav">
                        <li className="active">初中初中</li>
                        <li>初中</li>
                        <li>初中初中</li>
                        <li>初中</li>
                        <li>初中初中</li>
                        <li>初中</li>
                        <li>初中初中</li>
                        <li>初中</li>
                        <li>初中初中</li>
                        <li>初中</li>
                        <li>初中初中</li>
                        <li>初中</li>
                    </ul>
                </div>
            </div>
        )
    }
    scrollTabX = () => {
        var doc = document
        var WINDOW_OFFSETWIDTH = doc.documentElement.clientWidth;
        var liArr = doc.querySelectorAll('#nav > li')
        for (var i = 0; i < liArr.length; i++) {
            liArr[i].className = ''
            liArr[i].addEventListener('click', function (e) {
                for (var j = 0; j < liArr.length; j++) {
                    liArr[j].className = ''
                }
                this.className = 'active'
                var itemWidth = this.offsetWidth;
                var moveX = e.target.offsetLeft
                var left = moveX - (WINDOW_OFFSETWIDTH / 2) + (itemWidth / 2)
                doc.getElementById('nav').scrollLeft = left
            })
        }
    }
}



export default connect()(Lesson)