import React, { Component } from 'react';
import './Notice.css';

class Notice extends Component {
  render() {
    return (
        <div id="notice" className="dash_component">
            <div className="headline">
              <h1>공지사항</h1>
            </div>
            <div className="messenger">
              <div className="message_box">
                <div className="message urgency">
                  <span>[긴급] </span>통신병 1명 지금 즉시 지휘통제실로 와주시기 바랍니다.
                </div>
                <div className="message">
                  금일 TV 연등은 23시까지 진행합니다.
                </div>
                <div className="message">
                  국사봉 올림픽은 15시에 진행합니다.
                </div>
                <div className="message">
                  면회 시간은 09시부터 18시입니다.
                </div>
                <div className="message">
                  면회 시간은 09시부터 18시입니다.
                </div>
                <div className="message">
                  면회 시간은 09시부터 18시입니다.
                </div>
                <div className="message">
                  면회 시간은 09시부터 18시입니다.
                </div>
                <div className="message">
                  면회 시간은 09시부터 18시입니다.
                </div>
                <div className="message">
                  면회 시간은 09시부터 18시입니다.
                </div>
              </div>
              <div className="send_box">
                <div className="input_box">
                  <div className="send_mode">일반</div>
                  <input type="text" />
                </div>
                <div className="send_button">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
        </div>
      );
    }
  }
export default Notice;