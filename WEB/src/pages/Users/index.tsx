import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import './Users.css';

import { useDeleteUser, useUsers } from '../../api/users';
import DeleteButton from '../../components/DeleteButton';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserSearchSelect from '../../components/UserSearchSelect';
import User from '../../types/User';

import CreateUserModal from './components/CreateUserModal';

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
  const [modalVisible, setModalVisible] = useState(false);

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
                onFinish={({ user }) => {
                  history.push(`/users/${user}`);
                }}
                layout="inline">
                <Form.Item name="user">
                  <UserSearchSelect />
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
            dataSource={users}
            rowKey={record => record._id}
            columns={[
              {
                title: '군번',
                dataIndex: 'serial',
                key: 'serial',
                width: '20%',
              },
              {
                title: '이름',
                key: 'name',
                width: '10%',
                render: ({ _id, name }: User) => (
                  <Link to={`/users/${_id}`}>{name}</Link>
                ),
              },
              {
                title: '계급',
                dataIndex: 'rank',
                key: 'rank',
                width: '10%',
              },
              {
                title: '이메일',
                dataIndex: 'email',
                key: 'email',
              },
              {
                title: '전화번호',
                dataIndex: 'phone',
                key: 'phone',
              },
              {
                title: '가입여부',
                dataIndex: 'registered',
                key: 'registered',
                width: '7%',
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
      <CreateUserModal
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

export default Users;
