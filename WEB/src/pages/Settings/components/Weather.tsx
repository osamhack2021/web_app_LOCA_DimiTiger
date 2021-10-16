import { Button, Form } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '../../../api/settings';
import { settingsState } from '../../../atoms';
import Settings from '../../../types/Settings';

const Weather = () => {
  const [form] = Form.useForm();
  const [settings] = useRecoilState(settingsState);

  const addSetting = useAddSetting();

  return (
    <WrapperContent>
      <Form
        form={form}
        onFinish={({ unitLocation }) => {
          const tempSetting: Settings = {
            information: settings.information,
            weather: {
              location: unitLocation,
            },
            militaryDiscipline: settings.militaryDiscipline,
            chartDesign: settings.chartDesign,
          };
          addSetting.mutate(tempSetting);
        }}>
        <Label>부대위치</Label>
        <Form.Item name="unitLocation" initialValue={settings.weather.location}>
          <Input></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          설정
        </Button>
      </Form>
    </WrapperContent>
  );
};

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 250px;
  height: 44px;
  padding: 0 10px;
  border: solid 2px #0085ff;
  border-radius: 13px;
  background-color: #f5f6fa;
  font-size: 1rem;
  transition: border 0.5s ease;
  &:focus {
    outline: none;
    border: solid 2px #0008f5;
  }
`;
const WrapperContent = styled.div`
  padding: 40px;
`;
export default Weather;
