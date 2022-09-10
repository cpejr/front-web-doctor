import styled from "styled-components";
import { Cores } from "../../variaveis";



export const ContainerCriacaoReceitas = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  height: 100%;
  min-width:400px;
`;

export const CardCriacaoReceitas = styled.div`
display: flex;
flex-direction: column;
align-items:center;
border-style:solid ;
border-width:3px;
border-color:black;
padding-left:4%;
padding-right:4%;
padding-bottom:1%;
padding-top:1%;
`;

export const CriacaoReceitaNome = styled.div`
  display: flex;
  font-size: 2em;
  font-weight:500;
  margin-bottom:7%;
  margin-top:3%;
  color: ${Cores.azul};

  @media (max-width: 360px) {
    font-size: 1.5em;
  }
`;

export const CriacaoReceitaCorpo = styled.div`

`;

export const Titulo = styled.div`
  display: flex;
  font-size: 1em;
  font-weight:bold;
`;

export const NomeDoPaciente = styled.div`
  display: flex;
  font-size: 1em;
  font-weight:bold;
`;

export const Descricao = styled.div`
  display: flex;
  font-size: 1em;
  font-weight:bold;
`;

export const CriacaoReceitaBotoes = styled.div`
display:flex;
width:100%;
margin-top:8%;
`;

export const BotaoCancelar = styled.div`
display: flex;
width: 45%;
margin-right: 5%;
`;

export const BotaoEnviar = styled.div`
display: flex;
width:45%;
margin-left: 5%;
`;
