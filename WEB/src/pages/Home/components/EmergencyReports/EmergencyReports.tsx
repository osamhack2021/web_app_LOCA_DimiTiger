import { useForm } from 'react-hook-form';

import './Notice.css';

import { useAddNotice, useNotices } from '@/api/notices';
import Notice from '@/types/Notice';

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
  const { data: notices } = useNotices();
  const { register, handleSubmit } = useForm();

  const noticeMutaion = useAddNotice();

  const onSubmit = async ({ content, emergency }: Notice) => {
    noticeMutaion.mutate({ content, emergency });
  };

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
        <form className="send_box" onSubmit={handleSubmit(onSubmit)}>
          <div className="input_box">
            <select className="send_mode" {...register('emergency')}>
              <option value="false">일반</option>
              <option value="true">긴급</option>
            </select>
            <input type="text" {...register('content')} />
          </div>
          <button type="submit" className="send_button">
            <img src="./icons/send.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
export default NoticeCard;
