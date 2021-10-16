import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Popconfirm, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { useBeacons } from '../../api/beacons';
import { useDeleteLocation, useLocations } from '../../api/locations';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import LocationIcon from '../../components/LocationIcon';
import Sidebar from '../../components/Sidebar/Sidebar';
import Location from '../../types/Location';

import CreateLocationModal from './components/CreateLocationModal';

const Locations = () => {
  const history = useHistory();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
    name: StringParam,
  });
  const [form] = Form.useForm();
  const { data: locations, pagination } = useLocations({
    page: query.page || undefined,
    limit: query.limit || undefined,
  });
  const { data: beacons } = useBeacons({ limit: 0 });

  const [modalVisible, setModalVisible] = useState(false);

  const deleteLocationMutation = useDeleteLocation();

  const deleteLocation = (_id: string) => {
    deleteLocationMutation.mutate({ _id });
  };

  return (
    <LayoutContentWrapper>
      <Header />
      <LayoutContent>
        <LargeCard
          title="장소 관리"
          history={history}
          headerComponent={
            <ToolkitWrap>
              <Form
                form={form}
                onFinish={({ page, limit }) => {
                  setQuery(
                    {
                      page,
                      limit,
                    },
                    'replaceIn',
                  );
                }}
                layout="inline">
                <Button onClick={() => setModalVisible(true)}>추가</Button>
              </Form>
            </ToolkitWrap>
          }>
          <Table
            dataSource={locations}
            rowKey={record => record._id}
            columns={[
              {
                title: '아이콘',
                dataIndex: 'ui',
                key: 'ui',
                width: '10%',
                render: (ui: Location['ui']) => (
                  <LocationIcon icon={ui?.icon} style={{ height: 50 }} />
                ),
              },
              {
                title: '이름',
                key: 'name',
                width: '20%',
                render: ({ name, _id }) => (
                  <Link to={`/locations/${_id}`}>{name}</Link>
                ),
              },
              {
                title: '비콘',
                dataIndex: '_id',
                key: 'beacon',
                width: '15%',
                render: _id => (
                  <Link to={`/beacons?location=${_id}`}>
                    {
                      beacons?.filter(beacon => beacon.location._id === _id)
                        .length
                    }
                    개
                  </Link>
                ),
              },
              {
                title: '동작',
                dataIndex: '_id',
                key: '_id',
                width: '5%',
                render: (_id: string) => (
                  <Popconfirm
                    title="정말로 삭제하시겠습니까?"
                    onConfirm={() => deleteLocation(_id)}
                    okText="확인"
                    cancelText="취소">
                    <Button danger>삭제</Button>
                  </Popconfirm>
                ),
              },
            ]}
            pagination={{
              total: pagination?.totalDocs,
              pageSize: pagination?.limit,
              current: pagination?.page,
              showTotal: total => `총 ${total}개`,
              onChange: (page, limit) => setQuery({ page, limit }, 'replaceIn'),
            }}
            style={{ flex: 1, overflow: 'hidden' }}
          />
        </LargeCard>
      </LayoutContent>
      <Sidebar />
      <CreateLocationModal
        visible={modalVisible}
        closeHandler={() => setModalVisible(false)}
      />
    </LayoutContentWrapper>
  );
};

const ToolkitWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default Locations;
