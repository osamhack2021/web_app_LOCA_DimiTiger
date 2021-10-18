import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Descriptions,
  Form,
  Popconfirm,
  Row,
  Space,
  Timeline,
} from 'antd';
import { format } from 'date-fns';

import { useLocationLogs } from '@/api/location-logs';
import { useDeleteLocation, useLocation } from '@/api/locations';
import Header from '@/components/Header/Header';
import LargeCard from '@/components/LargeCard';
import LayoutContent from '@/components/LayoutContent';
import LayoutContentWrapper from '@/components/LayoutContentWrapper';
import LocationIcon from '@/components/LocationIcon';
import Sidebar from '@/components/Sidebar/Sidebar';

const UserDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data: location } = useLocation(id);
  const { data: locationLog } = useLocationLogs({
    location: id,
  });

  const deleteLocationMutation = useDeleteLocation();

  const deleteLocation = () => {
    deleteLocationMutation.mutate({ _id: id });
    history.push('/locations');
  };

  return (
    <LayoutContentWrapper>
      <Header />
      <LayoutContent>
        <Space direction="vertical" size={20}>
          <LargeCard
            title="장소 정보"
            history={history}
            headerComponent={
              <Space>
                <Button onClick={() => {}}>수정</Button>
                <Popconfirm
                  title="정말로 삭제하시겠습니까?"
                  onConfirm={deleteLocation}
                  okText="확인"
                  cancelText="취소">
                  <Button danger>삭제</Button>
                </Popconfirm>
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
