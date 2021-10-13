import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Descriptions, Form, Row, Space, Timeline } from 'antd';
import { format } from 'date-fns';

import { useLocationLogs } from '../../api/location-logs';
import { useLocation } from '../../api/locations';
import { useDeleteUser } from '../../api/users';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import LocationIcon from '../../components/LocationIcon';
import Sidebar from '../../components/Sidebar/Sidebar';
import User from '../../types/User';

const UserDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data: location } = useLocation(id);
  const { data: locationLog } = useLocationLogs({
    location: id,
  });

  const deleteUserMutation = useDeleteUser();

  const deleteUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const _id: User['_id'] = button.name;
    deleteUserMutation.mutate({ _id });
  };

  return (
    <LayoutContentWrapper>
      <Header />
      <LayoutContent>
        <Space direction="vertical" size={20}>
          <LargeCard
            title="위치 정보"
            history={history}
            headerComponent={
              <Space>
                <Button onClick={() => {}}>수정</Button>
                <Button onClick={() => {}} danger>
                  삭제
                </Button>
              </Space>
            }>
            <Descriptions
              bordered
              column={2}
              labelStyle={{ fontWeight: 'bold' }}>
              <Descriptions.Item label="이름">
                {location?.name}
              </Descriptions.Item>
              <Descriptions.Item label="아이콘">
                <LocationIcon icon={location?.ui?.icon} />
              </Descriptions.Item>
            </Descriptions>
          </LargeCard>
          <Row gutter={20}>
            <Col span={12}>
              <LargeCard
                title="방문자 현황"
                headerComponent={
                  <Button
                    onClick={() =>
                      history.push(`/location-logs?location=${id}`)
                    }>
                    더보기
                  </Button>
                }>
                <Timeline mode="left">
                  {locationLog?.map(({ _id, createdAt, user }) => (
                    <Timeline.Item
                      key={_id}
                      label={format(
                        new Date(createdAt),
                        'yyyy-MM-dd HH:mm:ss',
                      )}>
                      {user?.name}
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

export default UserDetail;
