import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

export const HybridContainer = styled.div`
  height: calc(100vh - 65px);
  width: 100%;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const FirstContainer = styled.div`
  display: ${(props) => (props.ischatselected ? "none" : "block")};
  @media screen and (min-width: 768px) {
    width: 320px;
    display: block;
  }
`;

export const SecondContainer = styled.div`
  display: ${(props) => (props.ischatselected ? "block" : "none")};
  @media screen and (min-width: 768px) {
    width: calc(100% - 320px);
    display: block;
  }
`;

export const EmptyContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-color: #0f172a;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo-para {
    color: #fff;
    font-size: 40px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .info {
    text-align: center;
    color: #cbd5e1;
    font-size: 14px;
    font-weight: 500;
    width: 350px;
  }
`;
