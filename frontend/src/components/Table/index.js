import React from 'react';
import PropTypes from 'prop-types';

import { Container, Pagination } from './styles';

export default function Table({
  children,
  totalRows,
  perPage,
  page,
  handlePagination,
}) {
  const hasNextPage = perPage * page >= totalRows;

  return (
    <Container>
      <table>{children}</table>
      <Pagination>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePagination('back')}
        >
          Anterior
        </button>
        <span>{page}</span>
        <button
          type="button"
          disabled={hasNextPage}
          onClick={() => handlePagination('next')}
        >
          Próxima
        </button>
      </Pagination>
    </Container>
  );
}
Table.propTypes = {
  children: PropTypes.node.isRequired,
};
