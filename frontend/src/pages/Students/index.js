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

  async function loadStudents(name) {
    try {
      setLoading(true);
      let response;
      if (name) {
        response = await api.get('/students', {
          params: {
            name,
          },
        });
      } else {
        response = await api.get('/students');
      }

      setStudents(response.data);
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
          <Table>
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
