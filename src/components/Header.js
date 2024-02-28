import styled from "styled-components";
import ProfileThumbnail from "./ProfileThumbnail";

export default function Header() {
  return (
    <MainContainer>
      <ProfileThumbnail />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 65px;
  width: 100%;
  border: 1px solid #334155;
  overflow: hidden;
  background-color: #132036;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;