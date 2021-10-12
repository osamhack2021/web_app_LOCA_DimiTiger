import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Modal, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import './Users.css';

import { useDeleteUser, useUsers } from '../../api/users';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import Sidebar from '../../components/Sidebar/Sidebar';
import User from '../../types/User';

const { Search } = Input;

const Users = () => {
  const history = useHistory();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
    name: StringParam,
  });
  const [form] = Form.useForm();
  const { data: users, pagination } = useUsers({
    name: query.name || undefined,
    page: query.page || undefined,
    limit: query.limit || undefined,
  });
  const columns = [
    {
      title: '군번',
      dataIndex: 'serial',
      key: 'serial',
      width: '20%',
      render: (serial: string) => <>{serial}</>,
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (name: User['name']) => <>{name}</>,
    },
    {
      title: '계급',
      dataIndex: 'rank',
      key: 'rank',
      width: '10%',
      render: (rank: User['rank']) => <>{rank}</>,
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      render: (email: User['email']) => <>{email}</>,
    },
    {
      title: '전화번호',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: User['phone']) => <>{phone}</>,
    },
    {
      title: '가입여부',
      dataIndex: 'registered',
      key: 'registered',
      width: '7%',
      render: (registered: User['registered']) => <>{registered}</>,
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      width: '5%',
      render: (_id: User['_id']) => (
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
          title="인원 관리"
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
                  title="인원 추가"
                  centered
                  bodyStyle={{
                    height: '200px',
                  }}
                  visible={isModalVisible}
                  onOk={handleOk}
                  okText="추가"
                  onCancel={handleCancel}>
                  <div>
                    <div>군번</div>
                    <InputText type="text" />
                  </div>
                  <div>
                    <div>이름</div>
                    <InputText type="text" />
                  </div>
                </Modal>
              </Form>
            </ToolkitWrap>
          }>
          <Table
            dataSource={users}
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

const InputText = styled.input`
  border: none;
  border-radius: 10px;
  background-color: #eef1f4;
  width: auto;
`;

export default Users;
