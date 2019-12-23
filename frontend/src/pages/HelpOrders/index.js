import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Formik, Field } from 'formik';

import { Container, Empty, SubmitButton, ModalBody } from './styles';
import Navigation from '~/components/Navigation';
import api from '~/services/api';
import Table from '~/components/Table';
import Card from '~/components/Card';
import Modal from '~/components/Modal';

import formatPrice from '~/utils/formatNumber';

export default function HelpOrders({ history }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [helpOrderId, setHelpOrderId] = useState(0);
  const [question, setQuestion] = useState('');

  async function loadHelpOrders() {
    try {
      setLoading(true);

      const response = await api.get('/help-orders');

      setHelpOrders(
        response.data.map(item => ({
          ...item,
          priceFormatted: formatPrice(item.price),
          durationFormatted:
            item.duration === 1 ? '1 mês' : `${item.duration} meses`,
          totalPrice: item.duration * item.price,
        }))
      );
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  function confirmAnswer(id) {
    setHelpOrderId(id);
    const helpOrder = helpOrders.find(item => item.id === id);
    setQuestion(helpOrder.question);
    setShowModal(true);
  }

  async function handleSubmit({ answer }) {
    try {
      await api.put(`/help-orders/${helpOrderId}`, { answer });
      toast.success('Pedido de auxílio respondido com sucesso!');

      setShowModal(false);
      loadHelpOrders();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  return (
    <Container>
      <Navigation title="Pedidos de auxílio" />
      <Card loading={loading}>
        {helpOrders.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(item => (
                <tr key={item.id}>
                  <td>{item.student.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => confirmAnswer(item.id)}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Empty>Nenhum plano encontrado</Empty>
        )}
      </Card>
      <Modal
        show={showModal}
        showFooter={false}
        showTitle={false}
        handleClose={() => setShowModal(false)}
      >
        <ModalBody>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{question}</p>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ helpOrderId, answer: '' }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values: { answer }, handleChange, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="answer">SUA RESPOSTA</label>
                <Field
                  label="SUA RESPOSTA"
                  as="textarea"
                  rows="5"
                  id="answer"
                  name="answer"
                  value={answer}
                  onChange={handleChange}
                  required
                />
                {errors.answer ? <p>{errors.answer}</p> : null}

                <SubmitButton type="submit">Responder aluno</SubmitButton>
              </form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Container>
  );
}
