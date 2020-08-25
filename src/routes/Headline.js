import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../store/action/index';
import '../static/css/headline.less'

class Headline extends Component {
    constructor(props, context) {
        super(props, context);

    }
    async componentDidMount() {
        let { queryHeadLine, headLineData } = this.props;
        if (headLineData.data.length === 0) {
            queryHeadLine()
        }
    }
    render() {
        let { headLineData } = this.props,
            { data } = headLineData;
        return (
            <div className="headline">
                <ul>
                    {data.map((item, index) => {
                        let { url, image, title, name } = item;
                        return <li key={index}>
                            <a href={url}>
                                <img src={image} alt={name}/>
                                <div>
                                    <h3>{name}</h3>
                                    <p>{title}</p>
                                </div>
                            </a>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}



export default connect(state => state.headline, action.headline)(Headline)
