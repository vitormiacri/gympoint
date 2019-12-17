import React from 'react';
import { Field } from 'formik';

export default function Form({
  values: { email, password },
  handleSubmit,
  handleChange,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">SEU E-MAIL</label>
      <Field
        name="email"
        value={email}
        placeholder="exemplo@email.com"
        onChange={handleChange}
      />
      <label htmlFor="password">SUA SENHA</label>
      <Field
        name="password"
        value={password}
        placeholder="**********"
        onChange={handleChange}
      />
      <button type="submit">Entrar no sistema</button>
    </form>
  );
}
