import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 25rem;
  text-align: center;
  margin: 0 1rem;
  background: #fff;

  padding: 3rem 0;

  border-radius: 5px;
  box-shadow: 0px 0px 8px 0px rgba(151, 151, 151, 0.7);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 2rem;
    margin-bottom: 0;

    label {
      align-self: flex-start;
      font-weight: bold;
      color: #444;
      font-size: 16px;
    }

    input {
      width: 100%;
      height: 45px;
      margin-bottom: 1rem;
      margin-top: 0.5rem;
      color: #999;
      border-radius: 5px;
      border: 1px solid #ddd;
      padding-left: 1rem;
      font-size: 16px;
    }

    button {
      width: 100%;
      height: 45px;
      background: #ee4d64;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.9;
    }
  }
`;

export const Title = styled.p`
  color: #ee4d64;
  font-size: 1.9rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;
