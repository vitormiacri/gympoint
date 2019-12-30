import styled from 'styled-components/native';
import Button from '~/component/Button';

export const Container = styled.View`
  padding: 20px;
  background: #f2f2f2;
  flex: 1;
`;

export const CheckinButton = styled(Button)`
  margin-bottom: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 0;
  margin-bottom: 30px;
`;
