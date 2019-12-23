/* eslint-disable no-nested-ternary */
import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

registerLocale('pt-BR', ptBR);

export default function Input({ label, id, date, async, children, ...props }) {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      {date ? (
        <DatePicker
          className="input"
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          {...props}
        />
      ) : async ? (
        <AsyncSelect id={id} {...props} />
      ) : (
        <Field className="input" id={id} {...props}>
          {children}
        </Field>
      )}
    </Container>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  date: PropTypes.bool,
  select: PropTypes.bool,
  async: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Input.defaultProps = {
  label: '',
  date: false,
  select: false,
  async: false,
};
