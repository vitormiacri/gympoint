import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 0.5rem;

  label {
    align-self: flex-start;
    font-weight: bold;
    color: #444;
    font-size: 16px;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .input {
    width: 100%;
    height: 45px;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    color: #999;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding-left: 1rem;
    font-size: 16px;
  }

  input {
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }

  select {
    width: 100%;
    height: 45px;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    color: #999;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding-left: 1rem;
    font-size: 16px;
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;
