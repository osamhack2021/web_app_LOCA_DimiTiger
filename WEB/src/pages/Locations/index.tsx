import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Modal, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { useBeacons } from '../../api/beacons';
import { useLocations } from '../../api/locations';
import { useDeleteUser } from '../../api/users';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import Header from '../../components/Header/Header';
import ImageProvider from '../../components/ImageProvider';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import Sidebar from '../../components/Sidebar/Sidebar';
import Location from '../../types/Location';
import User from '../../types/User';

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
  const { data: beacons, isLoading } = useBeacons();

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (name: Location['name']) => <>{name}</>,
    },
    {
      title: '아이콘',
      dataIndex: 'ui',
      key: 'ui',
      width: '15%',
      render: (ui: Location['ui']) => <>{ImageProvider(ui?.icon)}</>,
    },
    {
      title: '비콘',
      dataIndex: '_id',
      key: 'beacon',
      width: '15%',
      render: (_id: Location) => (
        <>{beacons?.filter(location => location === _id).length}</>
      ),
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      width: '5%',
      render: (_id: Location['_id']) => (
        <DeleteButton onClick={deleteUser} name={_id}></DeleteButton>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
                <AddButton onClick={showModal}></AddButton>
                <Modal
                  title="장소 추가"
                  centered
                  visible={isModalVisible}
                  onOk={handleOk}
                  okText="추가"
                  onCancel={handleCancel}>
                  <Input></Input>
                </Modal>
              </Form>
            </ToolkitWrap>
          }>
          <Table
            dataSource={locations}
            rowKey={record => record._id}
            columns={columns}
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
    </LayoutContentWrapper>
  );
};

const ToolkitWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default Locations;
