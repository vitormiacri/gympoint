import styled from 'styled-components';

export const Container = styled.div`
  p {
    color: #fb6f91;
    align-self: flex-start;
    margin: -10px 0 1rem 0.5rem;
    font-weight: bold;
    font-size: 1rem;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SelectAsyncStyles = {
  container: provided => ({
    ...provided,

    marginTop: '8px',
    marginBottom: '16px',
  }),
  input: provided => ({
    ...provided,
    height: '40px',
    marginBottom: 0,
    color: '#999',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#999',
  }),
};
