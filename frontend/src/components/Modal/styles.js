import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.7);

  display: ${props => (props.show ? 'block' : 'none')};
`;

export const ModalBody = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 5;
  background: #fff;
  padding: 2rem 2rem 1rem;
  min-width: 20%;
  border-radius: 4px;
  text-align: center;

  font-size: 2rem;

  transform: translate(-50%, 0);

  p {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;

    display: flex;
    justify-content: flex-end;
    flex-grow: 0;

    button {
      height: 45px;
      background: #ee4d64;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.9;
      padding: 0.5rem 1rem;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }

      &:first-of-type {
        background: #eee;
        color: #999;
        margin-right: 1rem;

        &:hover {
          background: ${darken(0.03, '#EEE')};
        }
      }
    }
  }
`;
