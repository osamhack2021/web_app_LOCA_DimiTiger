import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Form, Modal, Select, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import './Users.css';

import { useAddUser, useDeleteUser, useUsers } from '../../api/users';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import Header from '../../components/Header/Header';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import Sidebar from '../../components/Sidebar/Sidebar';
import User from '../../types/User';

const { Option } = Select;

const Users = () => {
  const history = useHistory();
  const [selected, setSelected] = useState({
    selected: 'noting',
    isChecked: false,
  });
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
    name: StringParam,
  });
  const [form] = Form.useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      render: (registered: User['registered']) => <>{String(registered)}</>,
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
  const handleCancel = () => {
    Modal.destroyAll();
    setIsModalVisible(false);
  };

  const deleteUserMutation = useDeleteUser();

  const deleteUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const _id: User['_id'] = button.name;
    deleteUserMutation.mutate({ _id });
  };

  const addUserMutation = useAddUser();

  const addUser = ({ serial, name, password }: User) => {
    if (selected.selected === 'noting') {
      setSelected({
        selected: selected.selected,
        isChecked: true,
      });
      return;
    }
    console.log(serial, name, password, selected.selected);
    addUserMutation.mutate({ serial, name, password, rank: selected.selected });
    Modal.destroyAll();
    setIsModalVisible(false);
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
              </Form>
            </ToolkitWrap>
          }>
          <Modal
            destroyOnClose={true}
            title="인원 추가"
            centered
            bodyStyle={{
              height: '250px',
            }}
            width="500px"
            visible={isModalVisible}
            onOk={handleSubmit(addUser)}
            okText="추가"
            onCancel={handleCancel}>
            <form>
              <ModalInputWrap>
                <ModalInputLabel>군번</ModalInputLabel>
                <InputText
                  type="text"
                  placeholder={'00-000000'}
                  {...register('serial', { required: true })}
                />
              </ModalInputWrap>
              {errors.serial && (
                <span
                  style={{
                    position: 'absolute',
                  }}>
                  This field is required
                </span>
              )}
              <ModalInputWrap
                style={{
                  marginTop: '25px',
                }}>
                <ModalInputLabel>이름</ModalInputLabel>
                <InputText
                  type="text"
                  {...register('name', { required: true })}
                />
              </ModalInputWrap>
              {errors.name && (
                <span
                  style={{
                    position: 'absolute',
                  }}>
                  This field is required
                </span>
              )}
              <ModalInputWrap
                style={{
                  marginTop: '25px',
                }}>
                <ModalInputLabel>가입코드</ModalInputLabel>
                <InputText
                  type="password"
                  {...register('password', { required: true })}
                />
              </ModalInputWrap>
              {errors.password && (
                <span
                  style={{
                    position: 'absolute',
                  }}>
                  This field is required
                </span>
              )}
              <ModalInputWrap
                style={{
                  marginTop: '25px',
                }}>
                <ModalInputLabel>계급</ModalInputLabel>
                <Select
                  style={{ width: 200 }}
                  onChange={(value: string) =>
                    setSelected({ selected: value, isChecked: false })
                  }
                  placeholder="Select a rank">
                  <Option value="이병">이병</Option>
                  <Option value="일병">일병</Option>
                  <Option value="상병">상병</Option>
                  <Option value="병장">병장</Option>
                </Select>
              </ModalInputWrap>
              {selected.isChecked && (
                <span
                  style={{
                    position: 'absolute',
                  }}>
                  This field is required
                </span>
              )}
            </form>
          </Modal>
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
const ModalInputWrap = styled.div``;
const ModalInputLabel = styled.div`
  display: inline-block;
  width: 80px;
  font-size: 1.1rem;
  font-weight: 800;
  margin-right: 20px;
`;
const InputText = styled.input`
  border: none;
  border-radius: 10px;
  background-color: #eef1f4;
  padding: 0 10px;
  width: 200px;
  height: 35px;
`;

export default Users;
