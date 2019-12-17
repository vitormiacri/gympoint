import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

export default function Form({
  values: { email, password },
  handleSubmit,
  handleChange,
  errors,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">SEU E-MAIL</label>
      <Field
        id="email"
        name="email"
        type="email"
        value={email}
        placeholder="exemplo@email.com"
        onChange={handleChange}
      />
      {errors.email ? <span>{errors.email}</span> : null}
      <label htmlFor="password">SUA SENHA</label>
      <Field
        id="password"
        name="password"
        value={password}
        type="password"
        placeholder="*******"
        onChange={handleChange}
      />
      {errors.password ? <span>{errors.password}</span> : null}
      <button type="submit">
        {loading ? (
          <Loader type="Oval" color="#FFF" height={18} width={18} />
        ) : (
          'Entrar no sistema'
        )}
      </button>
    </form>
  );
}
Form.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    password: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
