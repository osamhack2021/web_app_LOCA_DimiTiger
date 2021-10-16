import { Button, DatePicker, Form } from 'antd';
import moment from 'moment';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '../../../api/settings';
import { settingState } from '../../../atoms';
import Setting from '../../../types/Setting';
const MilitaryDiscipline = () => {
  const [form] = Form.useForm();
  const setSetting = useSetRecoilState(settingState);
  const [settings] = useRecoilState(settingState);

  const addSetting = useAddSetting();

  const dateFormat = 'YYYY/MM/DD';

  return (
    <WrapperContent>
      <Form
        form={form}
        onFinish={({ militaryDisciplineDate }) => {
          const tempSetting: Setting = {
            defaults: settings.defaults,
            weather: settings.weather,
            militaryDiscipline: militaryDisciplineDate,
            chartDesign: settings.chartDesign,
          };
          setSetting(tempSetting);
          addSetting.mutate(settings);
        }}>
        <Label>군기강 확립 작전 시작일</Label>
        <Form.Item name="militaryDisciplineDate">
          <DatePicker
            showToday
            defaultValue={moment(settings.militaryDiscipline)}
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
const WrapperContent = styled.div`
  padding: 40px;
`;

export default MilitaryDiscipline;
