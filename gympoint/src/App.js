import React from 'react';
import { useSelector } from 'react-redux';

import createRoute from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const Routes = createRoute(signed);

  return <Routes />;
}
