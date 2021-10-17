import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Badge, Timeline } from 'antd';
import { format } from 'date-fns';

import EmergencyReport from '@/types/EmergencyReport';

interface EmergencyReportElementProps {
  emergencyReport: EmergencyReport;
}

const EmergencyReportElement = ({
  emergencyReport,
}: EmergencyReportElementProps) => {
  const [opened, setOpened] = useState(false);
  const { additionalReport, active, creator } = emergencyReport;
  return (
    <div className={'reportContainer ' + (opened ? '' : 'clickedContainer')}>
      <div className="reportHeader" onClick={() => setOpened(!opened)}>
        <div
          style={{
            display: 'inline-block',
            alignItems: 'center',
          }}>
          {active && <Badge status="processing" />}
          <span>{`${creator.rank} ${creator.name}`}</span>
        </div>
        <div className="reportHeaderArrow">
          {opened ? <UpOutlined /> : <DownOutlined />}
        </div>
        <div className="reportHeaderDate">
          {format(new Date(emergencyReport.updatedAt), 'yyyy-MM-dd HH:mm')}
        </div>
      </div>
      <div>
        <Timeline
          style={{
            padding: '15px 25px 0px 25px',
          }}>
          {additionalReport.length === 0 ? (
            <div style={{ marginTop: '-10px', paddingBottom: '20px' }}>
              추가로 보고된 사항이 없습니다.
            </div>
          ) : (
            additionalReport
              .slice(0, opened ? additionalReport.length : 1)
              .map(({ content, createdAt }, i) => {
                return (
                  <Timeline.Item key={i}>
                    {format(new Date(createdAt), '(HH:mm) ') + content}
                  </Timeline.Item>
                );
              })
          )}
        </Timeline>
      </div>
    </div>
  );
};

export default EmergencyReportElement;
