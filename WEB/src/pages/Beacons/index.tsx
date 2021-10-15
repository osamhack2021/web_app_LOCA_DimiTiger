import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Select, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { useBeacons, useDeleteBeacon } from '../../api/beacons';
import { useLocations } from '../../api/locations';
import DeleteButton from '../../components/DeleteButton';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import Sidebar from '../../components/Sidebar/Sidebar';
import Beacon from '../../types/Beacon';
import Location from '../../types/Location';

import CreateBeaconModal from './components/CreateBeaconModal';

const Beacons = () => {
  const history = useHistory();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
    location: StringParam,
  });
  const [form] = Form.useForm();
  const { data: beacons, pagination } = useBeacons({
    page: query.page || undefined,
    limit: query.limit || undefined,
    locationId: query.location || undefined,
  });
  const { data: locations, isLoading: locationLoading } = useLocations({
    limit: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const deleteBeaconMutation = useDeleteBeacon();

  const deleteBeacon = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const _id: Beacon['_id'] = button.name;
    deleteBeaconMutation.mutate({ _id });
  };

  return (
    <LayoutContentWrapper>
      <Header />
      <LayoutContent>
        <LargeCard
          title="비콘 관리"
          history={history}
          headerComponent={
            <ToolkitWrap>
              <Form
                form={form}
                onFinish={({ location }) => {
                  setQuery(
                    {
                      location,
                    },
                    'replaceIn',
                  );
                }}
                layout="inline">
                <Form.Item name="location">
                  <Select
                    placeholder="위치"
                    loading={locationLoading}
                    style={{ width: 200 }}>
                    <Select.Option value="">전체위치</Select.Option>
                    {locations?.map(l => (
                      <Select.Option value={l._id}>{l.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 15 }}>
                  검색
                </Button>
                <Button onClick={() => setModalVisible(true)}>추가</Button>
              </Form>
            </ToolkitWrap>
          }>
          <Table
            dataSource={beacons}
            rowKey={record => record._id}
            columns={[
              {
                title: '할당 위치',
                dataIndex: 'location',
                key: 'location',
                width: '15%',
                render: ({ _id, name }: Location) => (
                  <Link to={`/locations?id=${_id}`}>{name}</Link>
                ),
              },
              {
                title: 'UUID',
                dataIndex: ['region', 'uuid'],
                key: 'uuid',
                width: '20%',
              },
              {
                title: 'Major',
                dataIndex: ['region', 'major'],
                key: 'major',
                width: '15%',
              },
              {
                title: 'minor',
                dataIndex: ['region', 'minor'],
                key: 'minor',
                width: '15%',
              },
              {
                title: '',
                dataIndex: '_id',
                key: 'delete',
                width: '5%',
                render: (_id: Location['_id']) => (
                  <DeleteButton
                    onClick={deleteBeacon}
                    name={_id}></DeleteButton>
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
      <CreateBeaconModal
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

export default Beacons;
