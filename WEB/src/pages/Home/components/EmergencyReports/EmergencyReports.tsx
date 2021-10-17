import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Timeline } from 'antd';
import moment from 'moment';

import './EmergencyReports.css';

import { useEmergencyReports } from '@/api/emergencies';
import { useAddNotice } from '@/api/notices';
import EmergencyReport from '@/types/EmergencyReport';
import Notice from '@/types/Notice';

interface EmergencyReportElementProps {
  emergencyReport: EmergencyReport;
}

const EmergencyReportElement = ({
  emergencyReport,
}: EmergencyReportElementProps) => {
  const [clicked, SetClicked] = useState(false);
  return (
    <div className={'reportContainer'}>
      <div className="reportHeader" onClick={() => SetClicked(!clicked)}>
        {emergencyReport.creator.rank + ' ' + emergencyReport.creator.name}
      </div>
      <div className={'reportAdditional ' + (clicked ? 'clicked' : '')}>
        <Timeline
          style={{
            padding: '15px 25px 0px 25px',
          }}>
          {emergencyReport.additionalReport.map(({ content, createdAt }, i) => {
            return (
              <Timeline.Item key={i}>
                {'(' +
                  moment(createdAt).format('YYYY-MM-DD HH:mm') +
                  ') ' +
                  content}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

const EmergencyReportsCard = () => {
  const { data: emergencyReports } = useEmergencyReports();
  const { register, handleSubmit } = useForm();

  const noticeMutaion = useAddNotice();

  const onSubmit = async ({ content, emergency }: Notice) => {
    noticeMutaion.mutate({ content, emergency });
  };

  return (
    <div id="notice" className="dash_component">
      <div className="headline">
        <h1>긴급 보고</h1>
      </div>
      <div className="messenger">
        <div className="message_box">
          {emergencyReports &&
            emergencyReports.map((data, i) => {
              return <EmergencyReportElement emergencyReport={data} key={i} />;
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
export default EmergencyReportsCard;
