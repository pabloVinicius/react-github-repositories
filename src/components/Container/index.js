import styled from 'styled-components';

export default styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h1 {
      font-size: 20px;
      display: flex;
      align-items: center;
      color: #7159c1;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 75px;
      height: 75px;
      border-radius: 50%;
      background: #7159c1;
      margin-bottom: 5px;
    }
  }
`;
