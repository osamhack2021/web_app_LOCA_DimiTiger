import { Button, DatePicker, Form, Radio } from 'antd';
import { format } from 'date-fns';
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
        onFinish={({
          unitLocation,
          militaryDisciplineDate,
          chartDesign,
          scheduleDate,
          scheduleContent,
        }) => {
          const newSetting: Settings = {
            information: settings.information,
            weather: {
              location: unitLocation,
            },
            militaryDiscipline: militaryDisciplineDate,
            chartDesign,
            schedule: {
              date: scheduleDate,
              content: scheduleContent,
            },
          };
          setSettings(newSetting);

          addSetting.mutate(newSetting);
        }}>
        <Label>부대 위치 설정</Label>
        <Form.Item
          name="unitLocation"
          initialValue={settings.weather?.location || ''}>
          <Input></Input>
        </Form.Item>
        <Label>군기강 확립 작전 시작일 설정</Label>
        <Form.Item
          name="militaryDisciplineDate"
          initialValue={moment(
            settings.militaryDiscipline || format(new Date(), 'yyyy-MM-dd'),
            dateFormat,
          )}>
          <DatePicker
            showToday
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
        <Label>다가오는 일정 설정</Label>
        <Form.Item
          name="scheduleDate"
          initialValue={moment(
            settings.schedule?.date || format(new Date(), 'yyyy-MM-dd'),
            dateFormat,
          )}>
          <DatePicker
            showToday
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
        <Form.Item
          name="scheduleContent"
          initialValue={settings.schedule?.content}>
          <Input placeholder="내용" />
        </Form.Item>
        <Label>유동병력 현황판 보기 설정</Label>
        <Form.Item name="chartDesign" initialValue={settings.chartDesign}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="circlepacking">
              Circle Packing(원)
            </Radio.Button>
            <Radio.Button value="treemap">Tree Map(사각형)</Radio.Button>
          </Radio.Group>
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
