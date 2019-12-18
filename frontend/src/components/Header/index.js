import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Logo, Menu, UserInfo, Content } from './styles';
import logo from '~/assets/logo.png';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Menu>
          <Logo>
            <img src={logo} alt="Gympoint" />
            <span>GYMPOINT</span>
          </Logo>

          <ul>
            <li>
              <Link to="/students">ALUNOS</Link>
            </li>
            <li>
              <Link to="/plans">PLANOS</Link>
            </li>
            <li>
              <Link to="/registrations">MATRÍCULAS</Link>
            </li>
            <li>
              <Link to="/help-orders">PEDIDOS DE AUXÍLIO</Link>
            </li>
          </ul>
        </Menu>
        <UserInfo>
          <strong>{user.name}</strong>
          <button type="button" onClick={() => handleLogout()}>
            Sair
          </button>
        </UserInfo>
      </Content>
    </Container>
  );
}
