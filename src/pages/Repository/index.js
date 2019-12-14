import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/Container';

import { Loading, Owner } from './styles';

const Repository = ({ match }) => {
  const [repository, changeRepository] = useState({});
  const [issues, changeIssues] = useState({});
  const [loading, changeLoading] = useState(true);

  const getRepoDetails = async () => {
    const repoName = decodeURIComponent(match.params.repository);

    const [repositoryData, issuesData] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    changeRepository(repositoryData.data);
    changeIssues(issuesData.data);
    changeLoading(false);
  };

  useEffect(() => {
    getRepoDetails();
  }, []);

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
    </Container>
  );
};

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
