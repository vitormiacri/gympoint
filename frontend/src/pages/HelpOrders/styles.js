import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;

  width: 100%;
  padding: 0 0.5rem;
`;

export const Empty = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: #444;
  text-align: center;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #ee4d64;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-right: 1rem;
  border: 0;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    background: ${darken(0.05, '#ee4d64')};
  }
`;

export const ModalBody = styled.div`
  text-align: left;

  strong {
    font-size: 0.9rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
    margin-top: 1rem;
  }

  label {
    font-weight: bold;
    color: #444;
    font-size: 16px;
  }

  textarea {
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    color: #999;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0.5rem;
    font-size: 16px;
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;
