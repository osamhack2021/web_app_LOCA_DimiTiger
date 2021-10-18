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
export default NoticeElement;
