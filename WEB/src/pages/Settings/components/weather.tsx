import { Button, Form } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '../../../api/settings';
import { settingState } from '../../../atoms';
import Setting from '../../../types/Setting';

const Weather = () => {
  const [form] = Form.useForm();
  const setSetting = useSetRecoilState(settingState);
  const [settings] = useRecoilState(settingState);

  const addSetting = useAddSetting();

  return (
    <WrapperContent>
      <Form
        form={form}
        onFinish={({ unitLocation }) => {
          const tempSetting: Setting = {
            defaults: {
              name: settings.defaults.name,
              icon: settings.defaults.icon,
              belong: settings.defaults.belong,
            },
            weather: {
              location: unitLocation,
              temperature: settings.weather.temperature,
              temperatureIndex: settings.weather.temperatureIndex,
            },
            militaryDiscipline: settings.militaryDiscipline,
            chartDesign: settings.chartDesign,
          };
          setSetting(tempSetting);
          addSetting.mutate(settings);
        }}>
        <Label>부대위치</Label>
        <Form.Item name="unitLocation">
          <Input placeholder={settings.weather.location}></Input>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}>
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
