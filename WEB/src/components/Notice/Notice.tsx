import { useNotices } from "../../api/notices";
import Notice from "../../types/Notice";
import "./Notice.css";
import sendIco from "./send.svg";

interface NoticeElementProps {
  notice: Notice;
}

const NoticeElement = ({ notice }: NoticeElementProps) => {
  return notice.emergency ? (
    <div className="message urgency">
      <span>[긴급] </span>
      {notice.content}
    </div>
  ) : (
    <div className="message">{notice.content}</div>
  );
};

const NoticeCard = () => {
  const { notices } = useNotices();
  return (
    <div id="notice" className="dash_component">
      <div className="headline">
        <h1>공지사항</h1>
      </div>
      <div className="messenger">
        <div className="message_box">
          {notices &&
            notices.map((data, i) => {
              return <NoticeElement notice={data} key={i} />;
            })}
        </div>
        <div className="send_box">
          <div className="input_box">
            <div className="send_mode">일반</div>
            <input type="text" />
          </div>
          <div className="send_button">
            <img src={sendIco} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticeCard;
