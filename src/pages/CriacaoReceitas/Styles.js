import styled from "styled-components";
import { Cores } from "../../variaveis";



export const ContainerCriacaoReceitas = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  height: 100%;

`;

export const CardCriacaoReceitas = styled.div`
width: 570px;
margin-top: 3%;
display: flex;
flex-direction: column;
align-items:center;
border-style:solid ;
border-width:2.5px;
border-color: ${Cores.cinza[3]};
background-color: #F7F7F780;
border-radius: 4px;
padding-left:4%;
padding-right:4%;
padding-bottom:1%;
padding-top:1%;
`;

export const CriacaoReceitaNome = styled.div`
  display: flex;
  font-size: 35px;
  line-height: 46.88px;
  font-weight:400;
  margin-bottom:3%;
  margin-top:2%;
  color: ${Cores.azulEscuro};

  @media (max-width: 360px) {
    font-size: 1.5em;
  }
`;

export const CriacaoReceitaCorpo = styled.div`
  width: 85%;
`;

export const Titulo = styled.div`
  display: flex;
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;

`;

export const NomeDoPaciente = styled.div`
  display: flex;
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  margin-top:4%;
`;

export const Descricao = styled.div`
  display: flex;
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
  margin-top:4%;
`;

export const CriacaoReceitaBotoes = styled.div`
display:flex;
width:80%;
margin-top:6%;
align-self: center;
justify-content: center;
`;

export const BotaoCancelar = styled.div`
display: flex;
width: 40%;
margin-right: 5%;
`;

export const BotaoEnviar = styled.div`
display: flex;
width:40%;
margin-left: 5%;
`;
