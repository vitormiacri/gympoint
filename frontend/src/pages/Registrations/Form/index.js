import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import pt from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';
import { addMonths, format, parseISO } from 'date-fns';

import { Container, Row, SelectAsyncStyles } from './styles';
import Navigation from '~/components/Navigation';
import Card from '~/components/Card';
import Input from '~/components/Input';
import api from '~/services/api';
import formatPrice from '~/utils/formatNumber';

const schema = Yup.object().shape({
  student: Yup.string().required('O aluno é obrigatório'),
  planId: Yup.number().required('O plano é obrigatório.'),
  startDate: Yup.date().required('A data é obrigatória.'),
});

export default function Form({ history }) {
  const [totalPrice, setTotalPrice] = useState('');
  const [endDate, setEndDate] = useState('');

  const [plans, setPlans] = useState([]);

  let matricula;
  let titleNavigation = 'Cadastro de matrícula';

  if (history.location.state) {
    matricula = history.location.state;
    matricula.startDate = parseISO(matricula.start_date);
    titleNavigation = 'Edição de matrícula';
  }

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get('/plans', {
          params: {
            page: 1,
            perPage: 99999,
          },
        });

        setPlans(
          response.data.rows.map(item => ({
            ...item,
            totalPrice: item.duration * item.price,
          }))
        );
      } catch (err) {
        toast.error(`Erro: ${err.response.data.error}`);
      }
    }

    loadPlans();
  }, []);

  async function loadStudents(name) {
    try {
      const response = await api.get('/students', {
        params: {
          name,
          page: 1,
          perPage: 99999,
        },
      });
      return response.data.rows.map(item => ({
        value: item.id,
        label: item.name,
      }));
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
      return false;
    }
  }

  async function handleSubmit({ id, student, planId, startDate }) {
    try {
      if (id === 0) {
        await api.post('/registrations', {
          student,
          plan: planId,
          start_date: startDate,
        });
        toast.success('Matrícula cadastrada com sucesso!');
      } else {
        await api.put(`/registrations/${id}`, {
          student: student.id,
          plan: planId,
          start_date: startDate,
        });
        toast.success('Matrícula alterada com sucesso!');
      }
      history.goBack();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  function handleOnBlur({ planId, startDate }) {
    let price = 0;
    let duration = 0;

    if (plans) {
      const planSelected = plans.find(item => planId == item.id);
      if (planSelected) {
        price = planSelected.price;
        duration = planSelected.duration;
      }
    }

    let total = 0;
    let calcDate = new Date();
    if (duration > 0 && price > 0 && startDate) {
      total = duration * price;
      calcDate = addMonths(startDate, duration);
      setEndDate(
        format(calcDate, 'dd/MM/yyyy', {
          locale: pt,
        })
      );
    } else {
      total = 0;
      if (matricula) {
        setEndDate(
          format(parseISO(matricula.end_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        );
        setTotalPrice(
          formatPrice(matricula.plan.duration * matricula.plan.price)
        );
      } else {
        setEndDate('');
      }
    }
    setTotalPrice(formatPrice(total));
  }

  const filterStudents = inputValue => {
    return loadStudents(inputValue);
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => resolve(filterStudents(inputValue)));

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={
          matricula || {
            id: 0,
            planId: 0,
            student: 0,
            startDate: new Date(),
          }
        }
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values: { id, planId, startDate, student },
          handleChange,
          handleSubmit,
          errors,
          setFieldValue,
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
                async
                styles={SelectAsyncStyles}
                label="Aluno"
                name="student"
                defaultOptions
                cacheOptions
                defaultInputValue={student.name}
                placeholder="Buscar aluno"
                loadOptions={promiseOptions}
                onChange={option => setFieldValue('student', option.value)}
              />
              {errors.student ? <p>{errors.student}</p> : null}
              <Row>
                <div>
                  <Input as="select" label="PLANO" name="planId">
                    <option value="0" label="Selecione o Plano" />
                    {plans.map(item => (
                      <option value={item.id} label={item.title} />
                    ))}
                  </Input>
                  {errors.planId ? <p>{errors.planId}</p> : null}
                </div>
                <div>
                  <Input
                    label="DATA INÍCIO"
                    id="startDate"
                    name="startDate"
                    date
                    selected={startDate}
                    placeholderText="Escolha a data"
                    onChange={date => setFieldValue('startDate', date)}
                  />
                  {errors.startDate ? <p>{errors.startDate}</p> : null}
                </div>
                <div>
                  <Input
                    label="DATA TÉRMINO"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    disabled
                    onBlur={handleOnBlur({ startDate, planId })}
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
                    onBlur={handleOnBlur({ startDate, planId })}
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
