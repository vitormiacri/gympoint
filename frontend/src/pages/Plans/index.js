/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { Empty } from './styles';
import Navigation from '~/components/Navigation';
import api from '~/services/api';
import Table from '~/components/Table';
import Card from '~/components/Card';
import Modal from '~/components/Modal';

import formatPrice from '~/utils/formatNumber';

export default function Plans({ history }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [planId, setPlanId] = useState(0);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const perPage = 5;

  async function loadPlans() {
    try {
      setLoading(true);

      const response = await api.get('/plans', {
        params: {
          page,
          perPage,
        },
      });

      setPlans(
        response.data.rows.map(item => ({
          ...item,
          priceFormatted: formatPrice(item.price),
          durationFormatted:
            item.duration === 1 ? '1 mês' : `${item.duration} meses`,
          totalPrice: item.duration * item.price,
        }))
      );
      setTotalRows(response.data.count);
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    loadPlans();
  }, [page]);

  function handleEdit(plan) {
    history.push('/plans/edit', plan);
  }

  function confirmDelete(id) {
    setPlanId(id);
    setShowModal(true);
  }

  async function handleConfirmDelete() {
    try {
      await api.delete(`/plans/${planId}`);
      toast.success('Plano excluído com sucesso!');
      setShowModal(false);
      loadPlans();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  function handlePagination(type) {
    setPage(type === 'back' ? page - 1 : page + 1);
  }

  return (
    <>
      <Navigation title="Gerenciando planos">
        <Link to="/plans/new">
          <MdAdd size={20} color="#FFF" /> CADASTRAR
        </Link>
      </Navigation>
      <Card loading={loading}>
        {plans.length > 0 ? (
          <Table
            page={page}
            perPage={perPage}
            handlePagination={handlePagination}
            totalRows={totalRows}
          >
            <thead>
              <tr>
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR MENSAL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plans.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.durationFormatted}</td>
                  <td>{item.priceFormatted}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(item)}>
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDelete(item.id)}
                    >
                      apagar
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
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      >
        <span>Você confirma a exclusão do plano?</span>
      </Modal>
    </>
  );
}
