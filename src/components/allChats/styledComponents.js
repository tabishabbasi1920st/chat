import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: #132036;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    border-right: 1px solid #334155;
  }

  .chats-para {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    padding-left: 10px;
  }

  ul {
    height: calc(100vh - 170px);
    overflow: auto;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #070b15;
    }
  }

  li {
    padding: 10px 10px;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  li:hover {
    background-color: #0f172a;
  }

  li p {
    color: #cbd5e1;
  }
`;

export const BackgroundImageContainer = styled.div`
  height: 55px;
  width: 55px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  h1 {
    margin: 0px;
    padding: 0px;
    line-height: 0.6;
    color: green;
    font-weight: bold;
    font-size: 50px;
  }
`;

export const DescriptionContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LoaderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopContainer = styled.div`
  height: 115px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    color: #fff;
    font-weight: 600;
    font-size: 23px;
  }
`;

export const SearchContainer = styled.div`
  height: 40px;
  width: 100%;
  /* border: 1px solid #203047; */
  border: ${({ isSearchFocus }) =>
    isSearchFocus ? "none" : "1px solid #203047"};
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${({ isSearchFocus }) => (isSearchFocus ? "#0f172a" : "")};
  transition: border 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0.2s;
  input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    font-size: 15px;
    font-weight: 300;
    outline: none;
    color: #e2e8f0;
    padding: 10px;
    &::placeholder {
      color: #e2e8f0;
    }
  }
`;

export const SearchLensBtn = styled.button`
  height: 100%;
  min-width: 50px;
  max-width: 50px;
  flex-shrink: 0;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: #94a3b8;
`;
