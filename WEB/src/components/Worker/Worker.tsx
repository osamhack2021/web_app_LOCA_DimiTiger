import React, { Component } from 'react';
import './Worker.css';

class Worker extends Component {
  render() {
    return (
        <div id="worker" className="worker dash_component">
            <div className="worker_content">
                <div className="worker_head">당직부사관</div>
                <div><div className="vertical_line"></div></div>
                <div className="worker_head">지휘통제실 근무자</div>
                <div className="worker_name">상병 김우재</div>
                <div className="worker_time">현재</div>
                <div className="worker_name">상병 박재성</div>
                <div className="worker_name greyscale">상병 박재성</div>
                <div className="worker_time">다음</div>
                <div className="worker_name greyscale">상병 김우재</div>
            </div>
        </div>
      );
    }
  }
export default Worker;