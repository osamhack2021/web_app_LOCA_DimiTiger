import React, { Component } from 'react';
import Notices from '../../services/Notices';
import './Notice.css';

interface noticesProps {
}
interface noticesState {
  noticeList: Array<object>;
}

interface NoticeElementProps {
  data: any;
  key: number;
}

class NoticeElement extends Component<NoticeElementProps> {
  render() {
    return (
      this.props.data.emergency ? 
      <div className="message urgency">
        <span>[긴급] </span>{this.props.data.content}
      </div> : 
      <div className="message">
        {this.props.data.content}
      </div>
    )
  }
}

class Notice extends Component<noticesProps, noticesState> {
  constructor(props: noticesProps) {
    super(props);
    this.state = {
      noticeList: []
    }
  }
  componentDidMount() {
    Notices.getNotices().then((res) => {
      this.setState({
        noticeList: res.data,
      })
    });
  }
  render() {
    return (
        <div id="notice" className="dash_component">
            <div className="headline">
              <h1>공지사항</h1>
            </div>
            <div className="messenger">
              <div className="message_box">
              {
                this.state.noticeList.map((data, i) => {
                  return (<NoticeElement data={data} key={i} />)
                })
              }
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