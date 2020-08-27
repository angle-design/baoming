import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import '../../static/css/listitem.less';

class ListItem extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <div className="new">
            <div className="list_body">
              <div className="list_item">
                <div>
                  <dl>
                    <dt>
                      {/* <img v-if="listtop.uinfo.a_image"  :src="listtop.uinfo.a_image" />
                       <img v-else src="../../assets/mohead.png" />
                      <font v-if="listtop.isvip"></font> */}
                    </dt>
                    <dd>
                      {/* <font>{{listtop.uinfo.a_uname}}</font>
                      <span>{{listtop.time}}</span> */}
                    </dd>
                  </dl>
                  <p>
                    {/* <span>
                      <i @click.once="zan($event,listtop.id)" ></i>
                      <font>{{listtop.zan?listtop.zan:'0'}}</font>
                    </span>
                    <span @click="$emit('toComment',listtop.id)">
                      <i></i>
                      <font>{{listtop.huifu}}</font>
                    </span> */}
                  </p>
                </div>
                {/* <p class="new_text" @click="$emit('toComment',listtop.id)">{{listtop.content}}</p> */}
              </div>
              <div className="jieda">
              {/* <img src="../../assets/bi.png">解答问题</div> */}

              <div className="list_item list_answer">
                <div>
                  <dl>
                    <dt>
                      {/* <img v-if="listtop.qlist.uinfo.a_image" :src="listtop.qlist.uinfo.a_image" />
                       <img v-else src="../../assets/mohead.png" />
                      <font v-if="listtop.isvip"></font> */}
                    </dt>
                    <dd>
                      {/* <font>{{listtop.qlist.uinfo.a_uname}}</font>
                      <span>{{listtop.time}}</span> */}
                    </dd>
                  </dl>
                  <p>
                    {/* <span >
                      <i  @click.once="zan($event,listtop.id)"></i>
                      <font>{{listtop.qlist.zan?listtop.qlist.zan:'0'}}</font>
                    </span>
                    <span @click="$emit('toComment',listtop.id)">
                      <i></i>
                      <font>{{listtop.qlist.huifu}}</font>
                    </span> */}
                  </p>
                </div>
                <p className="new_text new_text_ask"></p>
              </div>
            </div>
          </div>
          </div>
        )
    }
}

export default connect()(ListItem)
