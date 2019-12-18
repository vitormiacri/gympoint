import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  padding: 0.3rem 3rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 30px;

  img {
    width: 45px;
    height: 23px;
  }

  span {
    font-size: 15px;
    font-weight: bold;
    color: #ee4d64;
    margin-left: 1rem;
    padding-right: 1.2rem;
  }
  border-right: 1px solid #ddd;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-start;

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1.2rem;

    li {
      font-size: 0.925rem;
      margin-right: 1.2rem;
      a {
        font-weight: bold;
        color: #999999;
        text-decoration: none;

        &:hover {
          color: #444;
        }
      }
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.925rem;

  strong {
    color: #666666;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  button {
    color: #ee4d64;
    background: #fff;
    border: none;
  }
`;
