import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3% 2% 2% 2%;
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

  @media (max-width: 800px) {
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
  
  @media (max-width: 800px) {
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

  @media (max-width: 500px) {
    flex-direction: column;
    height: 120px;
  }
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
    justify-content: center;
    text-align: center;
  }
`;

export const TipoAgendamento = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  background-color: green;
`;

export const TextoTipoAgendamento = styled.h3`
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-size: 1.4em;
  color: #0a0e3c;
  text-align: center;

  @media (max-width: 850px) and (min-width: 560px){
    font-size: 1.2em;
  }

  @media (max-width: 560px) {
    font-size: 1.1em;
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
  background-color: green;

  @media (max-width: 560px) {
    flex-direction: column;
    height: 100%;
  }

  @media (max-width: 1260px) and (min-width: 800px){
    flex-direction: column;
    height: 100%;
  }
`;

export const TamanhoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  
  background-color: green;

  @media (max-width: 560px) {
    width: 100%;
    margin-bottom: 5%;
  }
  @media (max-width: 1260px) and (min-width: 800px){
    width: 90%;
    margin-bottom: 5%;
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
  
  background-color: green;
  
  @media (max-width: 560px) {
    width: 100%;
  }
`;
