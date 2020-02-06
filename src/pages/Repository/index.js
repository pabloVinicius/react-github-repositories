import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import api from '../../services/api';
import Container from '../../components/Container';
import Loading from '../../components/Loading';

import {
  LoadingContainer,
  Owner,
  IssueList,
  ReturnLink,
  PaginationAnchors,
} from './styles';

const Repository = ({ match }) => {
  const [repository, changeRepository] = useState({});
  const [issues, changeIssues] = useState({});
  const [page, changePage] = useState(0);
  const [loading, changeLoading] = useState(true);

  const getRepoDetails = async () => {
    const repoName = decodeURIComponent(match.params.repository);

    const [repositoryData, issuesData] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
          page,
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
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  ) : (
    <Container>
      <ReturnLink to="/">
        <IoMdArrowRoundBack size={20} />
        Back to repositories
      </ReturnLink>

      <Owner>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueList>
        {issues.map(issue => (
          <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
            <li key={`${issue.id}`}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  {issue.title}
                  {issue.labels.map(label => (
                    <span key={`${label.id}`}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          </a>
        ))}
      </IssueList>
      <PaginationAnchors>
        {page > 0 && (
          <span className="previous" onClick={() => changePage(page - 1)}>
            <IoMdArrowRoundBack size={20} />
            Previous
          </span>
        )}
        <span className="next" onClick={() => changePage(page + 1)}>
          Next
          <IoMdArrowRoundForward size={20} />
        </span>
      </PaginationAnchors>
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
