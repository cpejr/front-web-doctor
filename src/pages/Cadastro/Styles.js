import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 1%;
  background-color: #e5e5e5 ;
`;

export const DadosCadastro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const InputMesmaLinha = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  alig-items: end;
  width: 100%;
  font-size: 1em;
  @media (max-width: 820px) {
    flex-direction: column;
  }
`;
export const BotoesMesmaLinha = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  alig-items: end;
  width: 100%;
  font-size: 1em;
  @media (max-width: 560px) {
    flex-direction: column;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 33%;
  min-width: 120px;
  min-height: 120px;
  .logo{ border-radius: 15px;}
`;
