import React, { useEffect, useState } from 'react';
import api from '../../services/api';

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

    changeRepository(repositoryData);
    changeIssues(issuesData);
    changeLoading(false);
  };

  useEffect(() => {
    getRepoDetails();
  }, []);

  return <div>Repository: {decodeURIComponent(match.params.repository)}</div>;
};

export default Repository;
