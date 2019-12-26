import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  table {
    width: 100%;
    height: 100%;
    border-spacing: 0;

    tbody {
      height: 100%;
      overflow-y: auto;
    }

    thead {
      width: 100%;
      background: #fff;
      color: #444;
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;

      tr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        th {
          width: 20%;
          padding: 1rem 0.5rem;

          &:first-of-type {
            max-width: 30%;
          }

          &:last-of-type {
            max-width: 20%;
          }
        }
      }
    }

    tbody {
      width: 100%;
      font-size: 0.9rem;

      background: #fff;

      tr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0;
        border-bottom: 1px solid #eee;

        td {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 20%;
          padding: 0.5rem;
          color: #666;

          &:first-of-type {
            max-width: 30%;
            white-space: nowrap;
          }
          &:last-of-type {
            max-width: 20%;
          }

          button {
            font-size: 0.925rem;
            background: transparent;
            border: none;
            color: #de3b3b;
            margin-left: 1.2rem;

            &:first-of-type {
              color: #4d85ee;
            }
          }
        }
      }
    }
  }
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 1rem;

  button {
    font-size: 0.925rem;
    background: transparent;
    padding: 0.8rem;
    color: #999;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding-left: 1rem;
    font-size: 16px;

    &:disabled {
      cursor: not-allowed;
    }

    &:hover {
      background: #de3b3b;
      color: #fff;
      border: 1px solid #de3b3b;
    }
  }

  span {
    width: 40px;
    border: 1px solid #ddd;
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 50%;
    color: #999;
    text-align: center;
  }
`;
