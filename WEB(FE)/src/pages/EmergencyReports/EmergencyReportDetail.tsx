import React, { useMemo } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Descriptions,
  Popconfirm,
  Row,
  Space,
  Timeline,
} from 'antd';
import { format } from 'date-fns';

import { useCloseEmergencyReport, useEmergencyReport } from '@/api/emergencies';
import { useLocationLogs } from '@/api/location-logs';
import Header from '@/components/Header/Header';
import LargeCard from '@/components/LargeCard';
import LayoutContent from '@/components/LayoutContent';
import LayoutContentWrapper from '@/components/LayoutContentWrapper';
import ImageProvider from '@/components/LocationIcon';
import Sidebar from '@/components/Sidebar/Sidebar';
import LocationLog from '@/types/LocationLog';

function isLocationLog(arg: any): arg is LocationLog {
  return arg.user !== undefined;
}

const EmergencyReportsDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { data: emergencyReport } = useEmergencyReport(id);
  const { data: lastLocationLogs } = useLocationLogs(
    {
      user: emergencyReport?.creator._id,
      rangeEnd: emergencyReport?.createdAt,
      limit: 1,
    },
    { refetchInterval: false, enabled: !!emergencyReport },
  );
  const { data: locationLogs } = useLocationLogs({
    user: emergencyReport?.creator._id,
    rangeStart: emergencyReport?.createdAt,
    limit: 0,
  });
  const additionalReports = useMemo(() => {
    const initialReport = emergencyReport && [
      {
        _id: emergencyReport._id,
        content: `최초 보고`,
        createdAt: emergencyReport.createdAt,
      },
    ];
    const [second, ...rest] = emergencyReport?.additionalReport || [];
    const secondReport = second && [
      {
        _id: second._id,
        content: `보고 카테고리: ${second.content}`,
        createdAt: second.createdAt,
      },
    ];
    const reports = [
      ...(initialReport || []),
      ...(secondReport || []),
      ...(rest || []),
    ];
    return reports;
  }, [emergencyReport]);
  const combinedLogs = useMemo(() => {
    const logs = [
      ...(lastLocationLogs || []),
      ...additionalReports,
      ...(locationLogs || []),
    ];
    return logs.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [additionalReports, lastLocationLogs, locationLogs]);

  const closeReportMutation = useCloseEmergencyReport();

  const closeReport = () => {
    closeReportMutation.mutate(id);
  };

  return (
    <LayoutContentWrapper>
      <Header />
      <LayoutContent>
        <Space direction="vertical" size={20}>
          {emergencyReport && (
            <LargeCard
              title="긴급신고 정보"
              history={history}
              headerComponent={
                <Space>
                  {emergencyReport.active && (
                    <Popconfirm
                      title="종료로 전환하시겠습니까?"
                      onConfirm={closeReport}
                      okText="확인"
                      cancelText="취소">
                      <Button danger>상황 종료</Button>
                    </Popconfirm>
                  )}
                </Space>
              }>
              <Descriptions
                bordered
                column={2}
                labelStyle={{ fontWeight: 'bold' }}>
                <Descriptions.Item label="보고자">
                  <Link
                    to={`/users/${emergencyReport.creator._id}`}>{`${emergencyReport.creator.rank} ${emergencyReport.creator.name}`}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="상태">
                  {emergencyReport.active ? '진행중' : '종료'}
                </Descriptions.Item>
                <Descriptions.Item label="최초보고일시">
                  {format(
                    new Date(emergencyReport.createdAt),
                    'yyyy-MM-dd HH:mm:ss',
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="최종보고일시">
                  {format(
                    new Date(emergencyReport.updatedAt),
                    'yyyy-MM-dd HH:mm:ss',
                  )}
                </Descriptions.Item>
              </Descriptions>
            </LargeCard>
          )}
          <Row gutter={20}>
            <Col span={12}>
              <LargeCard title="긴급 신고 현황" style={{ flex: 1 }}>
                <Timeline
                  mode="left"
                  pending={
                    emergencyReport?.active && '추가 보고 수신 대기중...'
                  }>
                  {additionalReports.map(({ _id, content, createdAt }) => (
                    <Timeline.Item
                      key={_id}
                      label={format(
                        new Date(createdAt),
                        'yyyy-MM-dd HH:mm:ss',
                      )}>
                      {content}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </LargeCard>
            </Col>
            <Col span={12}>
              <LargeCard title="종합 현황">
                <Timeline
                  mode="left"
                  pending={
                    emergencyReport?.active && '추가 보고 수신 대기중...'
                  }>
                  {combinedLogs?.map(log => (
                    <Timeline.Item
                      key={log._id}
                      dot={
                        isLocationLog(log) ? (
                          <ImageProvider
                            icon={log.location.ui?.icon}
                            style={{ width: 20 }}
                          />
                        ) : undefined
                      }
                      label={format(
                        new Date(log.createdAt),
                        'yyyy-MM-dd HH:mm:ss',
                      )}>
                      {isLocationLog(log) ? log.location.name : log.content}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </LargeCard>
            </Col>
          </Row>
        </Space>
      </LayoutContent>
      <Sidebar />
    </LayoutContentWrapper>
  );
};

export default EmergencyReportsDetail;
