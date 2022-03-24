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
`;
export const BotoesColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  alig-items: end;
  width: 25%;
  font-size: 1em;
  @media (max-width: 560px) {
    flex-direction: column;
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
  height: 40%;
  width: 100%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 1.4em;
`;
export const DadosEndereco = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 3%;
  width: 100%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.3em;
`;

export const RuaNumeroComplemento = styled.div`
  display: flex;
  flex-direction: row;
  width:100%
`;
export const Rua = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  
  width: 80%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.2em;
`;

export const Complemento = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 20%;
  color: #151B57;
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 1.2em;
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
  font-size: 1.2em;
`;