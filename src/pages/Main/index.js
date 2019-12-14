import React, { useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton, List } from './styles';

import api from '../../services/api';

const Main = () => {
  const [loading, changeLoading] = useState(false);
  const [newRepo, changeNewRepo] = useState('');
  const [repositories, changeRepositories] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    changeLoading(true);

    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };

    changeRepositories([...repositories, data]);
    changeLoading(false);
    changeNewRepo('');
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          value={newRepo}
          onChange={e => changeNewRepo(e.target.value)}
          type="text"
          placeholder="Adicionar respositório"
        />

        <SubmitButton type="submit" loading={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositories.map(el => (
          <li key={el.name}>
            <span>{el.name}</span>
            <a href="">Detalhes</a>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
