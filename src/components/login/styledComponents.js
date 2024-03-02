import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  @media screen and (min-width: 576px) {
    justify-content: center;
  }

  .card-container {
    background-color: #0f172a;
    padding: 10px;
    width: 100%;
  }

  .card-container .already-have-account-login {
    font-size: 16px;
    text-align: center;
    color: #fff;
    padding: 10px;
  }

  .logo-container {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-container p {
    color: #ffffff;
    font-size: 30px;
    font-weight: 500;
  }

  form {
    background-color: #132036;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 10px;
    margin-top: 20px;
  }

  form p {
    font-size: 20px;
    color: #ffffff;
    font-weight: 500;
  }

  form div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  form div label {
    display: block;
    color: #94a3b8;
  }

  form div input {
    height: 60px;
    padding: 9px 16px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #203047;
    background: #132036 !important;
    border-radius: 5px;
    outline: none;
    color: #94a3b8;
    font-weight: 500;
  }

  form div input::placeholder {
    color: #94a3b8;
  }

  form .privacy-policy-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }

  form .privacy-policy-container input {
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  form .privacy-policy-container p {
    color: #94a3b8;
    font-size: 14px;
  }

  form .privacy-policy-container span {
    color: #7ca1f3;
  }

  form button {
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #2563eb;
    padding: 8px 16px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    margin-top: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form button:hover {
    background-color: #779edc;
  }

  @media screen and (min-width: 576px) {
    .card-container {
      width: 540px;
    }
  }

  @media screen and (min-width: 768px) {
    .card-container {
      width: 738px;
    }

    form div {
      width: 100%;
    }
  }
`;
