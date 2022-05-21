import styled from "styled-components";
import { Cores } from "../../variaveis";

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${Cores.azul};
  height: 100px;
  padding-left: 5%;
  padding-right: 5%;

  color: white;
`;
export const BotoesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 780px) {
    display: none;
  }
`;
export const Logo = styled.div`
  display: flex;
  width: 35%;

  .logo1 {
    width: 15%;
  }
  .logo2 {
    width: 80%;
  }

  @media (max-width: 1080px) {
    display: flex;
    width: 15%;
    .logo1 {
      width: 55%;
    }
    .logo2 {
      display: none;
    }
  }
  @media (max-width: 780px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;

    .logo1 {
      width: 20%;
    }
    .logo2 {
      display: flex;
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    width: 80%;

    .logo1 {
      width: 15%;
    }
    .logo2 {
      display: flex;
      width: 75%;
    }
  }
  @media (max-width: 360px) {
    width: 80%;

    .logo1 {
      width: 30%;
    }
    .logo2 {
      display: none;
      width: 75%;
    }
  }
`;
export const MenuHeader = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: flex;

  }
  @media (max-width: 600px) {
    width:20% ;
    display:flex;
    justify-content:center ;
  }
`;