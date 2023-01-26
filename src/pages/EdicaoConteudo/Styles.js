import styled from "styled-components";

export const Corpo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  border: solid 1px black;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: 400;

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
    flex-direction: column;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    height: 450px;
  }
`;

export const MetadeEsquerda = styled.div`
  width: 85%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 10%;
  margin-bottom: 3%;
  font-weight: 400;

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    height: 450px;
  }
`;

export const MetadeDireita = styled.div`
  width: 85%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 10%;
  margin-bottom: 3%;
  font-weight: 400;

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    height: 450px;
  }
`;

export const TituloPaginaEdicao = styled.p`
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 18px;
  padding-bottom: 18px;
  font-size: 30px;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;

  @media (max-width: 479px) {
    font-size: 27px;
  }
  @media (max-width: 780px) {
    padding-left: 10%;
    padding-right: 10%;
  }
  @media (max-width: 431px) {
    font-size: 25px;
  }
  @media (max-width: 400px) {
    font-size: 22px;
  }
  @media (max-width: 360px) {
    font-size: 18px;
    padding-top: 0px;
  }
`;

export const BoxGenerico = styled.div`
  /* background-color: #CFD3F8; */
  background-color: green;
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

export const SubTitulo = styled.div`
  /* background-color: #CFD3F8; */
  font-size: 20px;
  height: 10%;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

export const BotaoGenerico = styled.button`
  /* background-color: #CFD3F8; */
  background-color: green;
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

export const ContainerBotoes = styled.button`
  background-color: green;
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-top: 10%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;