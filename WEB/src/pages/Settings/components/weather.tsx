import styled from 'styled-components';

const Weather = () => {
  return (
    <WrapperContent>
      <form>
        <Label>부대위치</Label>
        <Input></Input>
      </form>
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
`;
const WrapperContent = styled.div`
  padding: 40px;
`;
export default Weather;
