import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Form, Modal, Table } from 'antd';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { useBeacons } from '../../api/beacons';
import {
  useAddLocation,
  useDeleteLocation,
  useLocations,
} from '../../api/locations';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import Header from '../../components/Header/Header';
import ImageProvider from '../../components/ImageProvider';
import LargeCard from '../../components/LargeCard';
import LayoutContent from '../../components/LayoutContent';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import Sidebar from '../../components/Sidebar/Sidebar';
import Location from '../../types/Location';

const Locations = () => {
  const history = useHistory();
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
  const { data: locations, pagination } = useLocations({
    page: query.page || undefined,
    limit: query.limit || undefined,
  });
  const { data: beacons, isLoading } = useBeacons();
  type idx = {
    index: number;
  };
  const [uiData, setUiData] = useState<any>({
    icon: 'livingspace',
    color: 'Yellow',
    index: 0,
  });

  const uiColumns = [
    {
      icon: 'livingspace',
      color: 'Yellow',
    },
    {
      icon: 'cafeteria',
      color: 'Yellow',
    },
    {
      icon: 'internetcafe',
      color: 'Blue',
    },
    {
      icon: 'studyroom',
      color: 'Blue',
    },
    {
      icon: 'px',
      color: 'Yellow',
    },
    {
      icon: 'yard',
      color: 'Green',
    },
    {
      icon: 'futsal',
      color: 'Green',
    },
    {
      icon: 'bookcafe',
      color: 'Blue',
    },
    {
      icon: 'gym',
      color: 'Green',
    },
    {
      icon: 'karaoke',
      color: 'Red',
    },
    {
      icon: 'playroom',
      color: 'Red',
    },
    {
      icon: 'basketball',
      color: 'Green',
    },
  ];

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
        <DeleteButton onClick={deleteLocation} name={_id}></DeleteButton>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteLocationMutation = useDeleteLocation();

  const deleteLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const _id: Location['_id'] = button.name;
    deleteLocationMutation.mutate({ _id });
  };

  const addLocationMutation = useAddLocation();

  const addLocation = async ({ name }: Location) => {
    addLocationMutation.mutate({
      name,
      ui: { icon: uiData.icon, color: uiData.color },
    });
    Modal.destroyAll();
    setIsModalVisible(false);
  };

  const handleChangeImage = () => {
    const realIdx = (uiData.index + 1) % uiColumns.length;
    setUiData({
      icon: uiColumns[realIdx].icon,
      color: uiColumns[realIdx].color,
      index: realIdx,
    });
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
              </Form>
            </ToolkitWrap>
          }>
          <Modal
            destroyOnClose={true}
            title="위치 추가"
            centered
            bodyStyle={{
              height: '400px',
            }}
            width="500px"
            visible={isModalVisible}
            onOk={handleSubmit(addLocation)}
            okText="추가"
            onCancel={handleCancel}>
            <form>
              <ModalInputWrap>
                <ModalInputLabel>장소명</ModalInputLabel>
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
                  marginTop: '30px',
                }}>
                <ModalInputLabel>아이콘</ModalInputLabel>
                <label
                  htmlFor="profile-img"
                  style={{
                    margin: 'auto',
                    width: '200px',
                    height: '200px',
                    backgroundSize: '200px 200px',
                  }}
                  className="unitIcon">
                  {ImageProvider(uiData?.icon, {
                    style: { width: '200px' },
                  })}
                </label>
                <InputText
                  type="text"
                  id="profile-img"
                  style={{
                    display: 'none',
                  }}
                  onClick={handleChangeImage}
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                />
              </ModalInputWrap>
            </form>
          </Modal>
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

export default Locations;
