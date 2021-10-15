import { Form, Modal, Select } from 'antd';
import styled from 'styled-components';

import { useAddBeacon } from '../../../api/beacons';
import { useLocations } from '../../../api/locations';

type ModalProps = {
  visible: boolean;
  closeHandler: () => void;
};

const CreateBeaconModal = ({ visible, closeHandler }: ModalProps) => {
  const [form] = Form.useForm();
  const addBeaconMutation = useAddBeacon();
  const { data: locations, isLoading: locationLoading } = useLocations({
    limit: 0,
  });

  const handleOk = async () => {
    form.submit();
    closeHandler();
  };

  const handleCancel = () => {
    form.resetFields();
    closeHandler();
  };

  return (
    <Modal
      destroyOnClose={true}
      title="비콘 추가"
      centered
      width="500px"
      visible={visible}
      onOk={handleOk}
      okText="추가"
      onCancel={handleCancel}>
      <Form
        form={form}
        onFinish={async data => {
          await addBeaconMutation.mutateAsync(data);
          form.resetFields();
        }}>
        <ModalInputWrap>
          <ModalInputLabel>할당 위치</ModalInputLabel>
          <Form.Item name="location" required>
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
        </ModalInputWrap>
        <ModalInputWrap>
          <ModalInputLabel>UUID</ModalInputLabel>
          <Form.Item name={['region', 'uuid']} required>
            <Input type="text" />
          </Form.Item>
        </ModalInputWrap>
        <ModalInputWrap>
          <ModalInputLabel>Major</ModalInputLabel>
          <Form.Item name={['region', 'major']} required>
            <Input type="number" />
          </Form.Item>
        </ModalInputWrap>
        <ModalInputWrap>
          <ModalInputLabel>Minor</ModalInputLabel>
          <Form.Item name={['region', 'minor']} required>
            <Input type="number" />
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

export default CreateBeaconModal;
