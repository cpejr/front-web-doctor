import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Conteudo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1%;
  background-color: ${Cores.branco};
`;

export const CaixaCima = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70%;
  padding: 5%;
  background-color: ${Cores.branco};
  border-style: solid;
  border-radius: 4px;
  border-color: ${Cores.cinza[3]};
  gap: 10px;
  @media (max-width: 640px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const FotoNomeData = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: row;
  width: 68%;
  gap: 10px;

  @media (max-width: 770px) {
    width: 100%;
    gap: 15px;
  }
`;
export const FotoPerfil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26%;
  height: 10%;
  font-size: 9em;
  .logo {
    border-radius: 3px;
  }
  @media (max-width: 760px) {
    font-size: 6em;
  }
  @media (max-width: 560px) {
    width: 28%;
    font-size: 4em;
  }
`;
export const NomeData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: 74%;
  @media (max-width: 560px) {
    height: auto;
    justify-content: center;
    //align-items: center;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    width: 64%;
    height: auto;
  }
 
`;
export const Nome = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: center;
  width: 85%;
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.4em;
  margin-left: 10%;
  margin-bottom: 10px;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.2em;
  }
  @media (max-width: 770px) and (min-width: 480px) {
    font-size: 1.1em;
    justify-content: center;
    margin-left: 8%;
  }
  @media (max-width: 480px) {
    font-size: 0.95em;
    margin-left: 0%;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    margin-left: 5%;
    width: 100%;
  }
`;
export const ConjuntoDataCPF = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10%;
  width: 85%;
  gap: 4%;
  @media (max-width: 480px) {
    font-size: 0.8em;
    flex-direction: column;
    justify-content: center;
    //align-items: center;
    width: 70%;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    width: 100%;
    margin-left: 5%;
  }
`;
export const DataCPF = styled.div`
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.2em;
  white-space: nowrap;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
  }
  @media (max-width: 770px) and (min-width: 480px) {
    font-size: 0.9em;
  }
  @media (max-width: 480px) {
    font-size: 0.85em;
  }
`;

export const ContainerCPF = styled.div`
  display:flex;
  flex-direction: row;
  gap: 4px;
  @media (max-width: 480px) {
    flex-direction: row;
    position: relative;
    left: -12%;
    
  }

`;

export const ContainerData = styled.div`
  display:flex;
  gap: 4px;
  flex-direction: row;
  @media (max-width: 480px) {
    flex-direction: row;
    margin-bottom: 2%;
    position: relative;
    left: -12%;
  }
`; 

export const BotoesColuna = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  height: 7.5em;
  width: 25%;
  font-size: 1em;
  gap: 10px;
  @media (max-width: 1100px) and (min-width: 770px) {
    height: 6em;
  }
  @media (max-width: 770px) and (min-width: 560px) {
    width: 38%;
    height: 6em;

  }
  @media (max-width: 560px) {
    
    width: 100%;
    height: auto;
   
  }
`;
export const CaixaBaixo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  height: auto;
  width: 70%;
  margin-top: 4%;
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
  }
`;
export const CaixaEndereco = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: auto;
  width: 48%;
  padding: 3%;
  background-color: ${Cores.branco};
  border-style: solid;
  border-radius: 4px;
  border-color: ${Cores.cinza[3]};
  @media (max-width: 640px) {
    width: 100%;
  }
`;
export const EnderecoContato = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin-bottom: 5%;
  height: 20%;
  width: 100%;
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.4em;
  @media (max-width: 1100px) and (min-width: 770px) {
    height: 15%;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    font-size: 1.3em;
  }
  @media (max-width: 640px) {
    font-size: 1.5em;
    height: 15%;
    margin-bottom: 2%;
  }
`;
export const DadosEndereco = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 3%;
  height: 40%;
  width: 100%;
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.3em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    font-size: 0.85em;
  }
  @media (max-width: 640px) {
    font-size: 1em;
  }
`;
export const RuaNumeroComplemento = styled.div`
  display: flex;
  flex-direction: column;
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
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.2em;
    width: 100%;
    margin-bottom: 3%;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    font-size: 1em;
    width: 100%;
    margin-bottom: 4%;
  }
  @media (max-width: 640px) {
    font-size: 0.9em;
    width: 100%;
    margin-bottom: 3%;
  }
`;

export const Complemento = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.2em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
    justify-content: start;
    align-items: start;
    width: 100%;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    font-size: 1em;
    justify-content: start;
    align-items: start;
    width: 100%;
  }
  @media (max-width: 640px) {
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
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 4%;
  }
`;
export const CaixaContato = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 5%;
  background-color: ${Cores.branco};
  border-style: solid;
  border-radius: 4px;
  border-color: ${Cores.cinza[3]};
  @media (max-width: 1100px) and (min-width: 640px) {
    padding: 5%;
  }
  @media (max-width: 640px) {
    padding: 5%;
  }
`;
export const DadosContato = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 3%;
  height: 60%;
  width: 100%;
  color: ${Cores.azul};
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.3em;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1.1em;
    margin-bottom: 0.5%;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    font-size: 0.85em;
    margin-bottom: 0.5%;
  }
  @media (max-width: 640px) {
    font-size: 1em;
  }
`;
export const ExcluirConta = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: end;
  height: 15%;
  width: 100%;
  color: ${Cores.azul};
  text-decoration: underline;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.1em;
  margin-top: 4%;
  @media (max-width: 1100px) and (min-width: 770px) {
    font-size: 1em;
  }
  @media (max-width: 770px) and (min-width: 640px) {
    font-size: 0.9em;
    height: 10%;
  }
  @media (max-width: 640px) {
    margin-top: 4%;
    font-size: 0.8em;
  }
`;

export const CaixaCimaCarregando = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68%;
  @media (max-width: 770px) {
    width: 100%;
  }
`;
export const CaixaEnderecoCarregando = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
