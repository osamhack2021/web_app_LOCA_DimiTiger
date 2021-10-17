import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { format } from 'date-fns';

import EmergencyReport from '@/types/EmergencyReport';

interface EmergencyReportElementProps {
  emergencyReport: EmergencyReport;
}

const EmergencyReportElement = ({
  emergencyReport,
}: EmergencyReportElementProps) => {
  const [clicked, SetClicked] = useState(false);
  return (
    <div className={'reportContainer ' + (clicked ? '' : 'clickedContainer')}>
      <div className="reportHeader" onClick={() => SetClicked(!clicked)}>
        {emergencyReport.creator.rank + ' ' + emergencyReport.creator.name}
        <div className="reportHeaderArrow">
          {clicked ? <UpOutlined /> : <DownOutlined />}
        </div>
        <div className="reportHeaderDate">
          {format(new Date(emergencyReport.updatedAt), 'yyyy-MM-dd HH:mm')}
        </div>
      </div>
      <div className={'reportThumbnail ' + (clicked ? 'reportAdditional' : '')}>
        {emergencyReport.additionalReport.length >= 1
          ? '(' +
            format(
              new Date(
                emergencyReport.additionalReport[
                  emergencyReport.additionalReport.length - 1
                ].createdAt,
              ),
              'HH:mm',
            ) +
            ') ' +
            emergencyReport.additionalReport[
              emergencyReport.additionalReport.length - 1
            ].content
          : '추가로 보고된 사항이 없습니다.'}
      </div>
      <div className={'reportAdditional ' + (clicked ? 'clicked' : '')}>
        <Timeline
          style={{
            padding: '15px 25px 0px 25px',
          }}>
          {emergencyReport.additionalReport.length === 0 ? (
            <div style={{ marginTop: '-10px', paddingBottom: '20px' }}>
              추가로 보고된 사항이 없습니다.
            </div>
          ) : (
            emergencyReport.additionalReport.map(
              ({ content, createdAt }, i) => {
                return (
                  <Timeline.Item key={i}>
                    {'(' +
                      format(new Date(createdAt), 'HH:mm') +
                      ') ' +
                      content}
                  </Timeline.Item>
                );
              },
            )
          )}
        </Timeline>
      </div>
    </div>
  );
};

export default EmergencyReportElement;
