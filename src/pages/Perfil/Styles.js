import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1%;
  background-color: #ffffff;
`;

export const BoardCima = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70%;
  padding: 5%;
  background-color: #f7f7f7;
  border-style: solid;
  border-radius: 4px;
  border-color: #c4c4c4;
  @media (max-width: 560px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const FotoNomeData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 68%;
  @media (max-width: 770px) {
    width: 100%;
  }
`;
export const FotoPerfil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26%;
  height: 10%;
  .logo {
    border-radius: 3px;
  }
  @media (max-width: 560px) {
    width: 28%;
  }
`;
export const NomeData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 5em;
  width: 74%;
  @media (max-width: 560px) {
    height: 4em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    width: 64%;
    height: 4em;
  }
`;
export const Nome = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10%;
  width: 90%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-size: 1.4em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.2em;
  }
  @media (max-width: 770px) and (min-width: 480px) {
    font-size: 1.1em;
  }
  @media (max-width: 480px) {
    font-size: 0.9em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    margin-left: 5%;
    width: 100%;
  }
`;
export const DataNascimento = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: 10%;
  width: 90%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
  }
  @media (max-width: 770px) and (min-width: 480px) {
    font-size: 0.9em;
  }
  @media (max-width: 480px) {
    font-size: 0.8em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    margin-left: 5%;
    width: 100%;
  }
`;
export const BotoesColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  height: 7.5em;
  width: 25%;
  font-size: 1em;
  @media (max-width: 1100px) and (min-width: 770px) {
    height: 6em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    height: 5em;
    width: 35%;
  }
  @media (max-width: 560px) {
    flex-direction: row;
    width: 100%;
    height: 2em;
    margin-top: 5%;
  }
`;
export const BoardBaixo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 22em;
  width: 70%;
  margin-top: 4%;
  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
  }
`;
export const BoardEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 48%;
  padding: 4%;
  background-color: #f7f7f7;
  border-style: solid;
  border-radius: 4px;
  border-color: #c4c4c4;
  @media (max-width: 560px) {
    width: 100%;
  }
`;
export const EnderecoContato = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin-bottom: 8%;
  height: 20%;
  width: 100%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-size: 1.4em;
  @media (max-width: 1100px) and (min-width: 770px) {
    height: 15%;
    margin-bottom: 9%;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    font-size: 1.1em;
  }
  @media (max-width: 560px) {
    font-size: 1em;
    height: 15%;
    margin-bottom: 9%;
  }
`;
export const DadosEndereco = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 3%;
  height: 40%;
  width: 100%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.3em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.2em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    font-size: 1em;
  }
  @media (max-width: 560px) {
    font-size: 0.9em;
  }
`;
export const RuaNumeroComplemento = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;
export const Rua = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 70%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.2em;
    width: 100%;
    margin-bottom: 3%;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    font-size: 1em;
    width: 100%;
    margin-bottom: 4%;
  }
  @media (max-width: 560px) {
    font-size: 0.9em;
    width: 100%;
    margin-bottom: 3%;
  }
`;

export const Complemento = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  width: 30%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.2em;
    justify-content: start;
    align-items: start;
    width: 100%;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    font-size: 1em;
    justify-content: start;
    align-items: start;
    width: 100%;
  }
  @media (max-width: 560px) {
    font-size: 0.9em;
    width: 100%;
    justify-content: start;
    align-items: start;
  }
`;
export const ContatoExcluirConta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 48%;
  @media (max-width: 560px) {
    width: 100%;
    margin-top: 4%;
  }
`;
export const BoardDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 7%;
  background-color: #f7f7f7;
  border-style: solid;
  border-radius: 4px;
  border-color: #c4c4c4;
  @media (max-width: 1100px) and (min-width: 560px) {
    padding: 9%;
  }
  @media (max-width: 560px) {
    padding: 4%;
  }
`;
export const DadosContato = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 3%;
  height: 60%;
  width: 100%;
  color: #151b57;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.3em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.1em;
    margin-bottom: 0.5%;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    font-size: 1em;
    margin-bottom: 0.5%;
  }
  @media (max-width: 560px) {
    font-size: 0.8em;
  }
`;
export const ExcluirConta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 15%;
  width: 100%;
  color: #151b57;
  text-decoration: underline;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1.1em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    font-size: 0.9em;
    height: 10%;
  }
  @media (max-width: 560px) {
    margin-top: 4%;
    font-size: 0.8em;
  }
`;
