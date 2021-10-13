import { Form, Modal } from 'antd';
import styled from 'styled-components';

type ModalProps = {
  visible: boolean;
  closeHandler: () => void;
};

const CreateUserModal = ({ visible, closeHandler }: ModalProps) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form.resetFields();
    closeHandler();
  };

  const handleCancel = () => {
    form.resetFields();
    closeHandler();
  };

  return (
    <Modal
      destroyOnClose={true}
      title="인원 추가"
      centered
      width="500px"
      visible={visible}
      onOk={handleOk}
      okText="추가"
      onCancel={handleCancel}>
      <Form form={form}>
        <ModalInputWrap>
          <ModalInputLabel>군번</ModalInputLabel>
          <Form.Item name="serial" required>
            <Input type="text" />
          </Form.Item>
        </ModalInputWrap>
        <ModalInputWrap>
          <ModalInputLabel>이름</ModalInputLabel>
          <Form.Item name="name" required>
            <Input type="text" />
          </Form.Item>
        </ModalInputWrap>
        <ModalInputWrap>
          <ModalInputLabel>계급</ModalInputLabel>
          <Form.Item name="rank" required>
            <Input type="text" />
          </Form.Item>
        </ModalInputWrap>
        <ModalInputWrap>
          <ModalInputLabel>가입코드</ModalInputLabel>
          <Form.Item name="password" required>
            <Input type="text" />
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

export default CreateUserModal;
