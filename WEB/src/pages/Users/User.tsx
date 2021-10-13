import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Space,
  Timeline,
} from 'antd';
import { format } from 'date-fns';

import './Users.css';

import { useLocationLogs } from '../../api/location-logs';
import { useDeleteUser, useUser } from '../../api/users';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import ImageProvider from '../../components/LocationIcon';
import Sidebar from '../../components/Sidebar/Sidebar';
import User from '../../types/User';

const { Search } = Input;

const Users = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data: user } = useUser(id);
  const { data: locationLog } = useLocationLogs({
    user: id,
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
            title="인원 조회"
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
              <Descriptions.Item label="이름">{user?.name}</Descriptions.Item>
              <Descriptions.Item label="계급">{user?.rank}</Descriptions.Item>
              <Descriptions.Item label="군번">{user?.serial}</Descriptions.Item>
              <Descriptions.Item label="전화번호">
                {user?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="이메일">
                {user?.email}
              </Descriptions.Item>
            </Descriptions>
          </LargeCard>
          <Row gutter={20}>
            <Col span={12}>
              <LargeCard
                title="위치 현황"
                headerComponent={
                  <Button
                    onClick={() => history.push(`/location-logs?user=${id}`)}>
                    더보기
                  </Button>
                }>
                <Timeline mode="left">
                  {locationLog?.map(({ _id, location, createdAt }) => (
                    <Timeline.Item
                      key={_id}
                      dot={
                        <ImageProvider
                          icon={location.ui?.icon}
                          style={{ width: 20 }}
                        />
                      }
                      label={format(
                        new Date(createdAt),
                        'yyyy-MM-dd HH:mm:ss',
                      )}>
                      {location.name}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </LargeCard>
            </Col>
            <Col span={12}>
              <LargeCard title="긴급 신고 현황" style={{ flex: 1 }}>
                <Timeline mode="left">
                  {locationLog?.map(({ location, createdAt }) => (
                    <Timeline.Item
                      dot={
                        <ImageProvider
                          icon={location.ui?.icon}
                          style={{ width: 20 }}
                        />
                      }
                      label={format(
                        new Date(createdAt),
                        'yyyy-MM-dd HH:mm:ss',
                      )}>
                      {location.name}
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

export default Users;
