import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Modal({ show, handleClose, handleConfirm, children }) {
  function handleClick(e) {
    const modal = document.getElementById('modal');
    if (e === modal) {
      handleClose();
    }
  }

  return (
    <Container show={show} id="modal" onClick={e => handleClick(e.target)}>
      <div>
        <p>AVISO</p>
        {children}
        <footer>
          <button type="button" onClick={handleClose}>
            FECHAR
          </button>
          {handleConfirm ? (
            <button type="button" onClick={handleConfirm}>
              CONFIRMAR
            </button>
          ) : null}
        </footer>
      </div>
    </Container>
  );
}

Modal.Prototypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  show: false,
  handleConfirm: null,
};
