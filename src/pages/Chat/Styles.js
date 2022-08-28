import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width:1800px;
  height: 621px;
  position:fixed;

  @media (max-height: 715px) {
    position:relative;
  }
  @media (max-height: 1300px) and (min-height: 715px) {
    height: 100%;
  }

  @media (min-height: 1301px) {
    height: 95%;
  }

  @media (max-width: 670px) {
    display: none;
  }
`;

export const ContainerMobile = styled.div`
  display: flex;
  width: 100%;
  max-width:1800px;
  height: 621px;
  position:fixed;

  @media (max-height: 715px) {
    position:relative;
  }
  @media (max-height: 1300px) and (min-height: 715px) {
    height: 100%;
  }

  @media (min-height: 1301px) {
    height: 95%;
  }

  @media (min-width: 671px) {
    display: none;
  }
`;

export const MensagemInicialChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-left:37%;
  width: 73%;
  height: 100%;
  padding-top:17%;
  padding-bottom:19%;

  @media (max-width: 928px) {
    margin-left:43%;
  }

  @media (max-width: 857px) {
    margin-left:48%;
  }
  
  @media (max-width: 821px) {
    margin-left: 37%;
    width: 63%;
  }

  @media (max-width: 729px) {
    margin-left:44%;
  }

  @media (max-width: 670px) and (min-width: 601px) {
    padding-left:10%;
  }
`;
