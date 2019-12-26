/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MdSearch, MdAdd } from 'react-icons/md';

import { toast } from 'react-toastify';
import { InputIcon, Empty } from './styles';
import Navigation from '~/components/Navigation';
import Card from '~/components/Card';
import Table from '~/components/Table';
import api from '~/services/api';
import Modal from '~/components/Modal';

export default function Students({ history }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState(0);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const perPage = 5;

  async function loadStudents(name) {
    try {
      setLoading(true);
      let response;
      if (name) {
        response = await api.get('/students', {
          params: {
            name,
            page,
            perPage,
          },
        });
      } else {
        response = await api.get('/students', {
          params: { page, perPage },
        });
      }

      setStudents(response.data.rows);
      setTotalRows(response.data.count);
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadStudents(studentName);
  }, [studentName]);

  useEffect(() => {
    loadStudents(studentName);
  }, [page]);

  function handleEdit(student) {
    history.push('/students/edit', student);
  }

  function confirmDelete(id) {
    setStudentId(id);
    setShowModal(true);
  }

  async function handleConfirmDelete() {
    try {
      await api.delete(`/students/${studentId}`);
      toast.success('Aluno excluído com sucesso!');
      setShowModal(false);
      loadStudents();
    } catch (err) {
      toast.error(`Erro: ${err.response.data.error}`);
    }
  }

  function handlePagination(type) {
    setPage(type === 'back' ? page - 1 : page + 1);
  }

  return (
    <>
      <Navigation title="Gerenciando alunos">
        <Link to="/students/new">
          <MdAdd size={20} color="#FFF" /> CADASTRAR
        </Link>
        <InputIcon>
          <input
            type="text"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            placeholder="Buscar aluno"
          />
          <i>
            <MdSearch size={20} color="#999" />
          </i>
        </InputIcon>
      </Navigation>
      <Card loading={loading}>
        {students.length > 0 ? (
          <Table
            page={page}
            perPage={perPage}
            handlePagination={handlePagination}
            totalRows={totalRows}
          >
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {students.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
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
          <Empty>Nenhum aluno encontrado</Empty>
        )}
      </Card>
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      >
        <span>Você confirma a exclusão do aluno?</span>
      </Modal>
    </>
  );
}
