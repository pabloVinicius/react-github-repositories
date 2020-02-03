import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  div {
    flex: 1;
    display: flex;
  }

  input {
    flex: 1;
    border: 1px solid #eee;

    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    transition: border 300ms;
  }

  ${props =>
    props.error &&
    css`
      input {
        border: 1px solid rgb(212, 83, 83);
      }

      small {
        color: rgb(212, 83, 83);
      }
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading || props.disabled,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        border-radius: 40px;
        margin-right: 10px;
        object-position: center;
        object-fit: cover;
      }

      a {
        font-size: 18px;
        color: black;
        transition: color 300ms;
        font-weight: 600;

        :hover {
          color: #7159c1;
        }
        text-decoration: none;
      }

      & + li {
        border-top: 1px solid #eee;
      }

      :last-of-type {
        & > a {
          margin-right: 10px;
        }
        svg {
          cursor: pointer;
        }
      }
    }
  }
`;
