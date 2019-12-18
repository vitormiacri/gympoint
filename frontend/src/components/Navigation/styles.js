import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    align-items: center;

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

    &:first-of-type {
      background: #ccc;
      &:hover {
        background: ${darken(0.05, '#CCC')};
      }
    }
  }
`;
