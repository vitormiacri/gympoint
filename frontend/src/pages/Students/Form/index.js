import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Container, Row } from './styles';
import Navigation from '~/components/Navigation';
import Card from '~/components/Card';
import Input from '~/components/Input';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('O email é obrigatório'),
  age: Yup.number().required('A idade é obrigatória'),
  weight: Yup.number().required('O peso é obrigatório'),
  height: Yup.number().required('A altura é obrigatória'),
});

export default function Form({ history }) {
  let student;
  let title = 'Cadastro de aluno';

  if (history.location.state) {
    student = history.location.state;
    title = 'Edição de aluno';
  }

  async function handleSubmit({ id, name, email, age, weight, height }) {
    try {
      if (id === '') {
        await api.post('/students', { id, name, email, age, weight, height });
        toast.success('Aluno cadastrado com sucesso!');
      } else {
        await api.put(`/students/${id}`, { name, email, age, weight, height });
        toast.success('Aluno alterado com sucesso!');
      }
      history.goBack();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={
          student || {
            id: '',
            name: '',
            email: '',
            age: '',
            weight: '',
            height: '',
          }
        }
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values: { id, name, email, age, weight, height },
          handleChange,
          handleSubmit,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Navigation title={title} showNav history={history} />
            <Card>
              <Input
                name="id"
                value={id}
                type="hidden"
                onChange={handleChange}
              />
              <Input
                label="NOME COMPLETO"
                id="name"
                name="name"
                value={name}
                placeholder="Informe o nome completo do aluno"
                onChange={handleChange}
              />
              {errors.email ? <p>{errors.email}</p> : null}
              <Input
                label="ENDEREÇO DE E-MAIL"
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Informe um e-mail válido do aluno"
                onChange={handleChange}
              />
              {errors.email ? <p>{errors.email}</p> : null}
              <Row>
                <div>
                  <Input
                    label="IDADE"
                    id="age"
                    name="age"
                    value={age}
                    onChange={handleChange}
                  />
                  {errors.age ? <p>{errors.age}</p> : null}
                </div>
                <div>
                  <Input
                    label="PESO (em kg)"
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={handleChange}
                  />
                  {errors.weight ? <p>{errors.weight}</p> : null}
                </div>
                <div>
                  <Input
                    label="ALTURA"
                    id="height"
                    name="height"
                    value={height}
                    onChange={handleChange}
                  />
                  {errors.height ? <p>{errors.height}</p> : null}
                </div>
              </Row>
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
}
