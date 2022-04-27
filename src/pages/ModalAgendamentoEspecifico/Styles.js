import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;
export const Caixa = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  background-color: #f7f7f7;
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 3px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
export const InfoEsquerdaEDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 80vh;
  padding: 5%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Usuario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0% 1% 0% 1%;
  border-color: black;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
`;

export const Imagem = styled.img`
  justify-content: center;
  object-fit: fill;
  width: 20%;
  width: 40px;
  display: flex;
`;
export const Nome = styled.div`
  width: 40%;
  display: flex;
  justify-content: start;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.4em;
  color: #0a0e3c;

  @media (max-width: 500px) {
    width: 50%;
    font-size: 1.1em;
  }
`;

export const TipoAgendamento = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
`;

export const TextoTipoAgendamento = styled.h3`
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-size: 1.7em;
  color: #0a0e3c;
  text-align: center;

  @media (max-width: 560px) {
    font-size: 1.2em;
  }
`;

export const TextoCheckbox = styled.h3`
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-size: 1.2em;
  color: #0a0e3c;

  @media (max-width: 560px) {
    font-size: 1em;
  }
`;

export const DoisSelect = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  @media (max-width: 560px) {
    flex-direction: column;
    height: 100%;
  }
`;

export const TamanhoInput = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;

  @media (max-width: 560px) {
    width: 100%;
  }
`;
export const TextoSelecioneUmaData = styled.h3`
  font-family: "Barlow", sans-serif;
  font-weight: 500;
  font-size: 0.9em;
  color: #0a0e3c;
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const SelecioneUmaData = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 90%;
  @media (max-width: 560px) {
    width: 100%;
  }
`;

