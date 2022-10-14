import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 4% 2% 4% 2%;
  background-color: ${Cores.cinza[8]};
`;

export const TituloInput = styled.div`
   font-size: 1em;
   color: ${Cores.azul};
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-top: 10px;

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
  align-items: start;
  width: 100%;
  font-size: 1em;
  gap: 10px;
  @media (max-width: 820px) {
    flex-direction: column;
    gap: 0px;
  }
`;
export const InputMesmaLinha2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;

  width: 100%;
  font-size: 1em;
  gap: 10px;
  @media (max-width: 820px) {
    flex-direction: column;
    gap: 0px;
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
  .logo {
    border-radius: 15px;
  }
`;
export const Botao = styled.button`
  display: flex;
  width: 100%;
  height: 10px;
  align-items: center;
  margin: 1%;
  justify-content: flex-start;
  background-color: transparent;
  border-color: transparent;
  color: red;
  font-size: 1em;
  cursor: pointer;
  text-decoration: underline;
`;

export const Rotulo = styled.div`
  width: 100%;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1em;
  color: ${Cores.vermelho};
`;

export const RotuloColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 50%;
  @media (max-width: 820px) {
    width: 100%;
  }
`;
export const PossuiConvenio = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 10% 0% 10%;
  font-weight: bold;
  color:${Cores.azul} ;
  .ant-switch-checked {
    background-color: ${Cores.azul};
  }
`;
export const PossuiCuidador = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 10% 0% 10%;
  font-weight: bold;
  color:${Cores.azul} ;
  .ant-switch-checked {
    background-color: ${Cores.azul};
  }
`;
