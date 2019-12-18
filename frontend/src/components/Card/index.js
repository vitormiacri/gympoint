import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

export default function Card({ children, loading }) {
  return (
    <Container>
      {loading ? (
        <Loader
          className="loading"
          type="Oval"
          color="#de3b3b"
          height={120}
          width={120}
        />
      ) : (
        children
      )}
    </Container>
  );
}
Card.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

Card.defaultProps = {
  loading: false,
};
