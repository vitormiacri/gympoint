import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';

import { Container, LogoTitle } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} style={{ width: 36, height: 14 }} />
      <LogoTitle>GYMPOINT</LogoTitle>
    </Container>
  );
}
