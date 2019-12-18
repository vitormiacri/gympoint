import React from 'react';
import PropTypes from 'prop-types';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import { Container } from './styles';

export default function Navigation({
  title,
  history,
  showNav,
  handleClickSave,
  children,
}) {
  function handleGoBack() {
    history.goBack();
  }
  return (
    <Container>
      <strong>{title}</strong>
      <aside>
        {showNav ? (
          <>
            <button type="button" onClick={() => handleGoBack()}>
              <MdKeyboardArrowLeft size={20} color="#FFF" /> VOLTAR
            </button>
            <button type="button" onClick={() => handleClickSave()}>
              <MdCheck size={20} color="#FFF" /> SALVAR
            </button>
          </>
        ) : (
          children
        )}
      </aside>
    </Container>
  );
}
Navigation.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.string,
  showNav: PropTypes.bool,
  handleClickSave: PropTypes.func,
  children: PropTypes.node,
};

Navigation.defaultProps = {
  showNav: false,
  children: null,
  history: '',
  handleClickSave: null,
};
