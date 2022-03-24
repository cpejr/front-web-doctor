import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1%;
  background-color: #ffffff ;
`;

export const BoardCima = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70%;
  padding: 5%;
  background-color: #F7F7F7;
  border-style: solid;
  border-radius: 4px;
  border-color: #C4C4C4;
`;
export const FotoPerfil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18%;
  height: 10%;
  .logo{ border-radius: 15px;}
`;
export const NomeData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 5em;
  width: 50%;
`;
export const Nome = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: 10%;
  width: 90%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 1.4em;
  @media (max-width: 1100px) and (min-width: 480px) {
    font-size: 1.2em;
  }
`;
export const DataNascimento = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: 10%;
  width: 90%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
  }
`;
export const BotoesColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  alig-items: end;
  height: 7.5em;
  width: 25%;
  font-size: 1em;
  @media (max-width: 1100px) and (min-width: 480px) {
    height: 6em;
  }
`;
export const BoardBaixo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 22em;
  width: 70%;
  margin-top: 4%
  
`;
export const BoardEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 48%;
  padding: 4%;
  background-color: #F7F7F7;
  border-style: solid;
  border-radius: 4px;
  border-color: #C4C4C4;
`;
export const EnderecoContato = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin-bottom: 8%;
  height: 20%;
  width: 100%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 1.4em;
  @media (max-width: 1100px) {
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
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.3em;
  @media (max-width: 1100px) {
    font-size: 1.2em;
  }
`;

export const RuaNumeroComplemento = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
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
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) {
    font-size: 1.2em;
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
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) {
    font-size: 1.2em;
    justify-content: start;
    align-items: start;
    width: 100%;
  }
`;
export const ContatoExcluirConta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 48%;
`;
export const BoardDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 7%;
  background-color: #F7F7F7;
  border-style: solid;
  border-radius: 4px;
  border-color: #C4C4C4;
  @media (max-width: 1100px) {
    padding: 9%;
  }
`;

export const DadosContato = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 3%;
  height: 60%;
  width: 100%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.3em;
  @media (max-width: 1100px) {
    font-size: 1.1em;
    margin-bottom: 0.5%;
  }
`;
export const ExcluirConta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 15%;
  width: 100%;
  color: #151B57;
  text-decoration: underline;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.1em;
  @media (max-width: 1100px) {
    font-size: 1em;
  }
`;