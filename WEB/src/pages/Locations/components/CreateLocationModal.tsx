import { useState } from 'react';
import { Form, Modal } from 'antd';
import styled from 'styled-components';

import { useAddLocation } from '../../../api/locations';
import LocationIcon from '../../../components/LocationIcon';

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

type ModalProps = {
  visible: boolean;
  closeHandler: () => void;
};

const CreateLocationModal = ({ visible, closeHandler }: ModalProps) => {
  const [form] = Form.useForm();
  const addLocationMutation = useAddLocation();
  const [uiData, setUiData] = useState<any>({
    icon: 'livingspace',
    color: 'Yellow',
    index: 0,
  });

  const handleOk = async () => {
    const { name } = form.getFieldsValue();
    addLocationMutation.mutate({
      name,
      ui: { icon: uiData.icon, color: uiData.color },
    });
    form.resetFields();
    closeHandler();
  };

  const handleCancel = () => {
    form.resetFields();
    closeHandler();
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
    <Modal
      destroyOnClose={true}
      title="위치 추가"
      centered
      bodyStyle={{
        height: '400px',
      }}
      width="500px"
      visible={visible}
      onOk={handleOk}
      okText="추가"
      onCancel={handleCancel}>
      <Form form={form}>
        <ModalInputWrap>
          <ModalInputLabel>장소명</ModalInputLabel>
          <Form.Item name="name" required>
            <Input type="text" />
          </Form.Item>
        </ModalInputWrap>
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
            <LocationIcon icon={uiData.icon} style={{ width: '200px' }} />
          </label>
          <Form.Item name="icon">
            <Input
              type="text"
              id="profile-img"
              style={{
                display: 'none',
              }}
              onClick={handleChangeImage}
              accept="image/jpg,impge/png,image/jpeg,image/gif"
            />
          </Form.Item>
        </ModalInputWrap>
      </Form>
    </Modal>
  );
};

const ModalInputWrap = styled.div``;
const ModalInputLabel = styled.div`
  display: inline-block;
  width: 80px;
  font-size: 1.1rem;
  font-weight: 800;
  margin-right: 20px;
`;
const Input = styled.input`
  border: none;
  border-radius: 10px;
  background-color: #eef1f4;
  padding: 0 10px;
  width: 200px;
  height: 35px;
`;

export default CreateLocationModal;
