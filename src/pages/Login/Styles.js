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

export const DadosLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const Botoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 40%;
  font-size: 1em;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const BotoesAlternativos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
  @media (max-width: 360px) {
    font-size: 0.8em;
  }
`;
export const Estetica = styled.div`
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  color: #151b57;
  align-items: center;
  justify-content: space-between;
  gap: 5%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1em;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const BarraEstetica = styled.div`
  color: #151b57;
  background-color: #151b57;
  height: 1px;
  width: 40%;
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
