/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithubAlt,
  FaPlus,
  FaSpinner,
  FaExternalLinkAlt,
  FaTrash,
} from 'react-icons/fa';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';
import { initialData } from '../../util/constants';

import api from '../../services/api';

const Main = () => {
  const [loading, changeLoading] = useState(false);
  const [error, changeError] = useState('');
  const [newRepo, changeNewRepo] = useState('');
  const [repositories, changeRepositories] = useState([]);

  useEffect(() => {
    const localRepositories = localStorage.getItem('repositories');

    if (localRepositories) {
      changeRepositories(JSON.parse(localRepositories));
    } else {
      changeRepositories(initialData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleSubmit = async e => {
    e.preventDefault();

    changeLoading(true);
    changeError(false);

    await api
      .get(`/repos/${newRepo}`)
      .then(res => {
        const {
          full_name,
          owner: { avatar_url },
          html_url,
          id,
        } = res.data;
        const alreadyAdded = repositories.find(el => el.id === id);
        if (alreadyAdded) {
          changeError('Repository already added');
          changeLoading(false);
          return;
        }
        const data = {
          id,
          name: full_name,
          avatar: avatar_url,
          url: html_url,
        };

        changeRepositories([...repositories, data]);
        changeLoading(false);
      })
      .catch(() => {
        changeError('Error adding repository. Check and try again.');
        changeLoading(false);
      });
    changeNewRepo('');
  };

  const removeRepository = id => {
    changeRepositories(repositories.filter((_, index) => index !== id));
  };

  return (
    <Container>
      <div>
        <div>
          <FaGithubAlt color="#fff" size={35} />
        </div>
        <h1>GitHub Repos</h1>
      </div>
      <Form onSubmit={handleSubmit} error={error}>
        <div>
          <input
            value={newRepo}
            onChange={e => changeNewRepo(e.target.value)}
            type="text"
            placeholder="Add new repository by name"
          />
          <SubmitButton
            type="submit"
            disabled={newRepo.length === 0}
            loading={loading}
          >
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </div>
        {error && <small>{error}</small>}
      </Form>
      <List>
        {repositories.map((el, index) => (
          <li key={el.name}>
            <div>
              <img src={el.avatar} alt={`${el.name} github avatar`} />
              <Link to={`/repository/${encodeURIComponent(el.name)}`}>
                <span>{el.name}</span>
              </Link>
            </div>
            <div>
              <a href={el.url} target="_blank">
                <FaExternalLinkAlt color="#7159c1" size={24} />
              </a>
              <FaTrash
                size={22}
                color="#7159c1"
                onClick={() => removeRepository(index)}
              />
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
