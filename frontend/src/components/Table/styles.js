import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  table {
    width: 100%;
    height: 100%;
    border-spacing: 0;

    tbody {
      height: 88%;
      overflow-y: auto;
    }

    thead {
      width: 100%;
      background: #fff;
      color: #444;
      text-align: left;
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
            max-width: 35%;
          }

          &:last-of-type {
            max-width: 10%;
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
          width: 20%;
          padding: 0.5rem;
          color: #666;
          text-align: left;

          &:first-of-type {
            max-width: 35%;
          }
          &:last-of-type {
            max-width: 10%;
          }

          display: flex;
          justify-content: flex-start;
          align-items: center;

          button {
            font-size: 0.925rem;
            background: transparent;
            border: none;
            color: #4d85ee;

            &:last-of-type {
              color: #de3b3b;
              margin-left: 1.2rem;
            }
          }
        }
      }
    }
  }
`;
