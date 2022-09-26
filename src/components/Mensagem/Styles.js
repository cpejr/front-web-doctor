import styled, { css } from "styled-components";
import { Cores } from "../../variaveis";

export const MensagemRecebida = styled.div`
display: block;
align-items: center;
align-self:flex-start;
padding: 1.5%;
max-width: 80%;
word-wrap: break-word;
width: fit-content;
height: fit-content;
font-size: 20px;
font-weight: 400;
line-height: 23px;
border-radius: 5px;
background-color: white;
/* margin-top: 0%; */
margin: 2%;
`;

export const MensagemEnviada = styled.div`
display: block;
align-items: center;
align-self:  ${({ pertenceAoUsuarioAtual }) => pertenceAoUsuarioAtual ?  'flex-end' : 'flex-start'};
padding: 1.5%;
max-width: 80%;
word-wrap: break-word;
width: fit-content;
height: fit-content;
font-size: 20px;
font-weight: 400;
line-height: 23px;
border-radius: 5px;
background-color: ${({ pertenceAoUsuarioAtual }) => pertenceAoUsuarioAtual ?  Cores.lilas[4] : 'white'};
margin: 2%;
${({ pertenceAoUsuarioAtual }) => pertenceAoUsuarioAtual && css`margin-top: 0%;`}
`;

export const DataHoraMensagem = styled.div`
color: black;
align-self: flex-end;
justify-self: right;
width: 100%;
font-size: 10px;
font-weight: 400;
line-height: 18px;
text-align: right;
`;
