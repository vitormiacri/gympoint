/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Empty } from './styles';
import Navigation from '~/components/Navigation';
import api from '~/services/api';
import Table from '~/components/Table';
import Card from '~/components/Card';
import Modal from '~/components/Modal';

export default function Registrations({ history }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registrationId, setRegistrationId] = useState(0);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const perPage = 5;

  async function loadRegistrations() {
    try {
      setLoading(true);

      const response = await api.get('/registrations', {
        params: {
          page,
          perPage,
        },
      });

      setRegistrations(
        response.data.rows.map(item => ({
          ...item,
          start_dateFormatted: format(
            parseISO(item.start_date),
            "dd 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
          end_dateFormatted: format(
            parseISO(item.end_date),
            "dd 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
          totalPrice: item.plan.duration * item.plan.price,
          activeIcon: item.active ? (
            <MdCheckCircle size={20} color="#42CB59" />
          ) : (
            <MdCheckCircle size={20} color="#DDD" />
          ),
        }))
      );
      setTotalRows(response.data.count);
    } catch (err) {
      console.tron.log(err.response.data);
      toast.error(`Erro: ${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  useEffect(() => {
    loadRegistrations();
  }, [page]);

  function handleEdit(registration) {
    const state = {
      ...registration,
      planId: registration.plan.id,
      activeIcon: null,
    };
    history.push('/registrations/edit', state);
  }

  function confirmDelete(id) {
    setRegistrationId(id);
    setShowModal(true);
  }

  async function handleConfirmDelete() {
    try {
      await api.delete(`/registrations/${registrationId}`);
      toast.success('Plano excluído com sucesso!');
      setShowModal(false);
      loadRegistrations();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  function handlePagination(type) {
    setPage(type === 'back' ? page - 1 : page + 1);
  }

  return (
    <>
      <Navigation title="Gerenciando matrículas">
        <Link to="/registrations/new">
          <MdAdd size={20} color="#FFF" /> CADASTRAR
        </Link>
      </Navigation>
      <Card loading={loading}>
        {registrations.length > 0 ? (
          <Table
            page={page}
            perPage={perPage}
            handlePagination={handlePagination}
            totalRows={totalRows}
          >
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {registrations.map(item => (
                <tr key={item.id}>
                  <td>{item.student.name}</td>
                  <td>{item.plan.title}</td>
                  <td>{item.start_dateFormatted}</td>
                  <td>{item.end_dateFormatted}</td>
                  <td>{item.activeIcon}</td>
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
          <Empty>Nenhuma matrícula encontrada</Empty>
        )}
      </Card>
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      >
        <span>Você confirma a exclusão da matrícula?</span>
      </Modal>
    </>
  );
}
