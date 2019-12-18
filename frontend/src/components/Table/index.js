import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Table({ children }) {
  return (
    <Container>
      <table>{children}</table>
    </Container>
  );
}
Table.propTypes = {
  children: PropTypes.node.isRequired,
};
