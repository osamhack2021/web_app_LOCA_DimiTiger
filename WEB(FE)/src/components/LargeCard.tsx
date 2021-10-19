import { History } from 'history';
import styled from 'styled-components';

import CardContainer from './CardContainer';
import CardHeader from './CardHeader';

interface ILargeCard {
  title: string;
  history?: History;
  headerComponent?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

const LargeCard = ({
  title,
  history,
  headerComponent,
  children,
  style,
  headerStyle,
  bodyStyle,
}: ILargeCard) => (
  <CardContainer style={style || { width: '100%' }}>
    <CardHeader style={headerStyle}>
      {history && (
        <img
          src="/icons/backspace_arrow.svg"
          alt=""
          onClick={() => history.goBack()}
        />
      )}
      <h1>{title}</h1>
      <div style={{ flex: 1 }} />
      {headerComponent}
    </CardHeader>
    <CardBody style={bodyStyle || { width: '100%' }}>{children}</CardBody>
  </CardContainer>
);

const CardBody = styled.div`
  padding: 20px;
`;

export default LargeCard;
