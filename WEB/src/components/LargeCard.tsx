import { History } from 'history';
import styled from 'styled-components';

import CardContainer from './CardContainer';
import CardHeader from './CardHeader';

interface ILargeCard {
  title: string;
  history: History;
  headerComponent?: React.ReactNode;
  children: React.ReactNode;
  props?: any;
}

const LargeCard = ({
  title,
  history,
  headerComponent,
  children,
  props,
}: ILargeCard) => (
  <CardContainer style={{ flex: 1 }}>
    <CardHeader>
      <img
        src="./icons/backspace_arrow.svg"
        alt=""
        onClick={() => history.goBack()}
      />
      <h1>{title}</h1>
      <div style={{ flex: 1 }} />
      {headerComponent}
    </CardHeader>
    <CardBody {...props}>{children}</CardBody>
  </CardContainer>
);

const CardBody = styled.div`
  padding: 20px;
`;

export default LargeCard;
