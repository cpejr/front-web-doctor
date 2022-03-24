import styled from "styled-components";

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #151b57;
  height: 100px;
  padding-left: 5%;
  padding-right: 5%;
`;
export const HeaderPagina = styled.div`
  @media (max-width: 780px) {
    display: none;
  }
`;
export const Logo = styled.div`
  width: 35%;

  .logo1 {
    width: 15%;
  }
  .logo2 {
    width: 80%;
  }

  @media (max-width: 780px) {
    width: 15%;
    .logo1 {
      width: 65%;
    }
    .logo2 {
      display: none;
    }
  }
`;
