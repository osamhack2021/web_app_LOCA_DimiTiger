import { DatePicker } from 'antd';
import styled from 'styled-components';
const MilitaryDiscipline = () => {
  return (
    <WrapperContent>
      <form>
        <Label>군기강 확립 작전 시작일</Label>
        <DatePicker
          showToday
          style={{
            height: '44px',
            width: '180px',
            border: 'solid 2px #0085ff',
            borderRadius: '13px',
            backgroundColor: '#f5f6fa',
            padding: '0 20px',
          }}
        />
      </form>
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
