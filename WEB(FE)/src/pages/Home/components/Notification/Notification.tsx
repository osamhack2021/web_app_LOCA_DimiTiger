import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './Notification.css';

import EmergencyReportElement from './components/EmergencyReportsElement';
import NoticeElement from './components/NoticeElement';

import { useEmergencyReports } from '@/api/emergencies';
import { useAddNotice, useNotices } from '@/api/notices';
import Notice from '@/types/Notice';

const Notification = () => {
  const { data: notices } = useNotices();
  const { data: emergencies } = useEmergencyReports();
  const { register, handleSubmit } = useForm();
  const [selectNotice, setSelectNotice] = useState(false);

  const noticeMutaion = useAddNotice();

  const onSubmit = async ({ content, emergency }: Notice) => {
    noticeMutaion.mutate({ content, emergency });
  };

  return (
    <div id="notice" className="dash_component">
      <div className="headline">
        <h1
          className={
            'noticeHeadline ' + (selectNotice ? '' : 'headlineSelected')
          }
          onClick={() => setSelectNotice(false)}>
          긴급보고
        </h1>
        <h1
          className={
            'noticeHeadline ' + (selectNotice ? 'headlineSelected' : '')
          }
          onClick={() => setSelectNotice(true)}>
          공지사항
        </h1>
      </div>
      <div className={'messenger ' + (selectNotice ? '' : 'hideSender')}>
        <div className="message_box">
          {selectNotice
            ? notices &&
              notices.map((data, i) => {
                return <NoticeElement notice={data} key={i} />;
              })
            : emergencies &&
              emergencies.map((data, i) => {
                return (
                  <EmergencyReportElement emergencyReport={data} key={i} />
                );
              })}
        </div>
        {selectNotice ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Notification;
