import styled from "styled-components";

export const MainConatainer = styled.div`
  height: 100%;
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: 55px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

export const FailureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  background-color: white;

  p {
    color: red;
  }
`;
