import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Switch } from 'antd';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '@/api/settings';
import { settingsState } from '@/atoms';
import Settings from '@/types/Settings';

const Weather = () => {
  const [form] = Form.useForm();
  const [settings, setSettings] = useRecoilState(settingsState);
  const addSetting = useAddSetting();
  const dateFormat = 'YYYY/MM/DD';

  return (
    <WrapperContent>
      <Form
        form={form}
        onFinish={({ unitLocation, militaryDisciplineDate, chartSetting }) => {
          const newSetting: Settings = {
            information: settings.information,
            weather: {
              location: unitLocation,
            },
            militaryDiscipline: militaryDisciplineDate,
            chartDesign: chartSetting,
          };
          setSettings(newSetting);

          addSetting.mutate(newSetting);
        }}>
        <Label>부대위치</Label>
        <Form.Item name="unitLocation" initialValue={settings.weather.location}>
          <Input></Input>
        </Form.Item>
        <Label>군기강 확립 작전 시작일</Label>
        <Form.Item name="militaryDisciplineDate">
          <DatePicker
            showToday
            defaultValue={moment(settings.militaryDiscipline, dateFormat)}
            style={{
              height: '44px',
              width: '250px',
              border: 'solid 2px #0085ff',
              borderRadius: '13px',
              backgroundColor: '#f5f6fa',
              padding: '0 20px',
            }}
          />
        </Form.Item>
        <Label>유동병력 현황판 차트 설정</Label>
        <Form.Item name="chartSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}></Switch>
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