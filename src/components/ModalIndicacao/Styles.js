import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.dic`
    height: 100%;
    width: 100%;
`;

export const Informacoes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 60%;
    width: 95%;
    max-width: 800px;
    background-color: ${Cores.cinza[9]};
    border: 1px solid ${Cores.cinza[3]};
    padding: 10% 5%;
    overflow: auto;
    gap: 10px;
    margin-top: 25px;
`;

export const DescricaoInformacoes = styled.textarea`
    
    display: flex;
    align-self: flex-start;
    width: 100%;
    flex-grow: 1;
    background-color: ${Cores.cinza[9]};
    border: none;
    font-size: 1em;
    font-family: ${Fontes.barlow};
    resize: none;
`;

export const TituloInfo = styled.h2`
    font-size: 20px;
    display: flex;
    align-self: center;
`;

export const BotoesIndicacao = styled.div`
    display: flex;
    flex-direction: column;
    align-content: stretch;
    gap: 19px;
    margin-top: 30px;
    flex-grow: 0;

    width: 100%;
    border-radius: 4px;
`;
