import { Button, DatePicker, Form } from 'antd';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '@/api/settings';
import { settingsState } from '@/atoms';
import Settings from '@/types/Settings';
const MilitaryDiscipline = () => {
  const [form] = Form.useForm();
  const [settings, setSettings] = useRecoilState(settingsState);
  const addSetting = useAddSetting();

  const dateFormat = 'YYYY/MM/DD';

  return (
    <WrapperContent>
      <Form
        form={form}
        onFinish={({ militaryDisciplineDate }) => {
          const tempSetting: Settings = {
            information: settings.information,
            weather: settings.weather,
            militaryDiscipline: militaryDisciplineDate,
            chartDesign: settings.chartDesign,
          };
          setSettings(tempSetting);

          addSetting.mutate(settings);
        }}>
        <Label>군기강 확립 작전 시작일</Label>
        <Form.Item name="militaryDisciplineDate">
          <DatePicker
            showToday
            defaultValue={moment(settings.militaryDiscipline, dateFormat)}
            style={{
              height: '44px',
              width: '180px',
              border: 'solid 2px #0085ff',
              borderRadius: '13px',
              backgroundColor: '#f5f6fa',
              padding: '0 20px',
            }}
          />
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
const WrapperContent = styled.div`
  padding: 40px;
`;

export default MilitaryDiscipline;
