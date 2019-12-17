import React from 'react';

import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <Logo>
        <img src={logo} alt="Gympoint" />
        <span>GYMPOINT</span>
      </Logo>
      <Menu>
        <ul>
          <li>ALUNOS</li>
          <li>PLANOS</li>
          <li>MATRÍCULA</li>
          <li>PEDIDOS DE AUXÍLIO</li>
        </ul>
      </Menu>
      <UserInfo>
        <strong>Adminstrador</strong>
        <span>Sair do Sistema</span>
      </UserInfo>
    </Container>
  );
}
