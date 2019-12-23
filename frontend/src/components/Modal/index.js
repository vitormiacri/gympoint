import React from 'react';
import PropTypes from 'prop-types';

import { Container, ModalBody } from './styles';

export default function Modal({
  show,
  showTitle,
  showFooter,
  handleClose,
  handleConfirm,
  children,
}) {
  function handleClick(e) {
    const modal = document.getElementById('modal');
    if (e === modal) {
      handleClose();
    }
  }

  return (
    <Container show={show} id="modal" onClick={e => handleClick(e.target)}>
      <ModalBody>
        {showTitle ? <p>AVISO</p> : null}
        {children}
        {showFooter ? (
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
        ) : null}
      </ModalBody>
    </Container>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  showTitle: PropTypes.bool,
  showFooter: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  show: false,
  showTitle: true,
  showFooter: true,
  handleConfirm: null,
};
