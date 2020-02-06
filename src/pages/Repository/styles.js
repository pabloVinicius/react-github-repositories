import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoadingContainer = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: center;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    text-align: center;
    max-width: 400px;
    line-height: 1.4;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  a {
    text-decoration: none;
  }

  li {
    display: flex;
    padding: 15px 30px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;
    background: white;
    transition: all 300ms;

    :hover {
      background: #7159c1;
      strong {
        color: white;
      }

      p {
        color: white;
      }
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
        color: #333;
        transition: all 300ms;

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        transition: all 300ms;
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const ReturnLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;

  svg {
    margin-right: 10px;
  }
`;

export const PaginationAnchors = styled.div`
  display: flex;
  flex-direction: row !important;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;

    &.previous {
      margin-right: auto;
    }

    &.next {
      margin-left: auto;
    }
  }

  svg {
    margin: 5px;
  }
`;
