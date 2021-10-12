import styled from 'styled-components';

const StyledButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: #ed3e3e;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const DeleteButton = ({ ...rest }) => {
  return <StyledButton {...rest}>삭제</StyledButton>;
};
export default DeleteButton;
