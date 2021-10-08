import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import "./Notice.css";

import { addNotices, useNotices } from "../../api/notices";
import Notice from "../../types/Notice";

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
  const { register, handleSubmit } = useForm();

  type NoticeData = {
    content: string;
    emergency: boolean;
  }

  const queryClient = useQueryClient();

  const mutationNotice = useMutation(["addNotices"], {
    onMutate: (body: object) => addNotices(body),
    onSuccess: () => { queryClient.invalidateQueries('notices'); }
  })

  const addNotice = async ({ content, emergency }: NoticeData) => {
    mutationNotice.mutate({ content, emergency });
  }

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
        <form className="send_box" onSubmit={handleSubmit(addNotice)}>
          <div className="input_box">
            <select className="send_mode" {...register("emergency")}>
              <option value="false">일반</option>
              <option value="true">긴급</option>
            </select>
            <input type="text" {...register("content")} />
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
