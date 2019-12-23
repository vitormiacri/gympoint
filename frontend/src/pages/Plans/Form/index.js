import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Container, Row } from './styles';
import Navigation from '~/components/Navigation';
import Card from '~/components/Card';
import Input from '~/components/Input';
import api from '~/services/api';
import formatPrice from '~/utils/formatNumber';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('A duração é obrigatória.'),
  price: Yup.number().required('O valor é obrigatório.'),
});

export default function Form({ history }) {
  const [totalPrice, setTotalPrice] = useState('');

  let plan;
  let titleNavigation = 'Cadastro de plano';

  if (history.location.state) {
    plan = history.location.state;
    titleNavigation = 'Edição de plano';
  }

  async function handleSubmit({ id, title, duration, price }) {
    try {
      if (id === 0) {
        await api.post('/plans', { title, duration, price });
        toast.success('Plano cadastrado com sucesso!');
      } else {
        await api.put(`/plans/${id}`, { title, duration, price });
        toast.success('Plano alterado com sucesso!');
      }
      history.goBack();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  function handleOnBlur({ duration, price }) {
    let total = 0;
    if (duration > 0 && price > 0) {
      total = duration * price;
    } else {
      total = 0;
    }
    setTotalPrice(formatPrice(total));
  }

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={
          plan || {
            id: 0,
            title: '',
            duration: '',
            price: '',
          }
        }
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values: { id, title, duration, price },
          handleChange,
          handleSubmit,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Navigation title={titleNavigation} showNav history={history} />
            <Card>
              <Input
                name="id"
                value={id || 0}
                type="hidden"
                onChange={handleChange}
              />
              <Input
                label="TÍTULO DO PLANO"
                id="title"
                name="title"
                value={title}
                placeholder="Informe um título para o plano"
                onChange={handleChange}
              />
              {errors.title ? <p>{errors.title}</p> : null}
              <Row>
                <div>
                  <Input
                    label="DURAÇÃO (em meses)"
                    id="duration"
                    name="duration"
                    value={duration}
                    type="number"
                    onChange={handleChange}
                  />
                  {errors.duration ? <p>{errors.duration}</p> : null}
                </div>
                <div>
                  <Input
                    label="PREÇO MENSAL"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                  />
                  {errors.price ? <p>{errors.price}</p> : null}
                </div>
                <div>
                  <Input
                    label="PREÇO TOTAL"
                    id="totalPrice"
                    name="totalPrice"
                    value={totalPrice}
                    disabled
                    onBlur={handleOnBlur({ duration, price })}
                  />
                  {errors.totalPrice ? <p>{errors.totalPrice}</p> : null}
                </div>
              </Row>
            </Card>
          </form>
        )}
      </Formik>
    </Container>
  );
}
