import styled from 'styled-components';

const CardHeader = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;

  border-bottom: solid 1px #e6e6e6;

  padding-left: 30px;
  padding-right: 30px;

  & > img {
    width: 1.5rem;
    margin-right: 1.5rem;
    cursor: pointer;
  }

  & > h1 {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;

export default CardHeader;
