import styled from "styled-components";
import {LeftCircleOutlined} from "@ant-design/icons"
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    height:100%;
    width:100%;
    min-height:100vh;

    padding-top: 80px;
    padding-bottom: 40px;
    padding-left: 10%;
    padding-right: 10%;
    @media (max-width: 600px) {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 8%;
        padding-right: 8%;
    }
`;
export const SaidaMobile = styled.div`
    display: none;
    position: relative;
    top: 5px;
    left: 10px;
    width: auto;
    height: auto;
    @media (max-width: 600px){
        display: flex;
    }
`;

export const EdicaoContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    width: 100%;
    border: 1px solid ${Cores.preto};
    padding-top: 10px;
    padding-bottom: 20px;
    @media (max-width: 600px) {
        border: none;   
    }
`;

export const ContainerInterno = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: 20px;
    width:50%;
    padding: 20px 10%;
    @media(max-width: 900px) {
        padding: 15px 5%;
    }
`;
export const ContainerDireita = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: 20px;
    width:50%;
    padding: 20px 10%;
    @media(max-width: 900px) {
        padding: 15px 5%;
    }
    @media (max-width: 600px) {
        display: none;   
    }
`;

export const Titulo = styled.h1`
    font-family: ${Fontes.barlow};
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    
`;

export const Descricao = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: ${Fontes.barlow};
    font-size: 15px;
    font-weight: 350;
    text-align: center;

    border: none;
    background-color: white;
    width:100%;
    height: auto;
    flex-wrap: wrap;
    margin-top: 20px;

`;

export const ContainerSugestao = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 27px;

    height: 100%;
    width:100%;
`;


export const Divisoria = styled.div`
    display: flex;
    border: 1px solid ${Cores.cinza[3]};
    border-radius: 4px;
    align-self: stretch;
    @media (max-width: 600px) {
        display: none;   
    }
`;

export const Informacoes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    height: 60%;
    width: 100%;
    background-color: ${Cores.cinza[9]};
    border: 1px solid ${Cores.cinza[3]};
    padding: 10% 5%;
    overflow: auto;
    gap: 10px;
    margin-top: 25px;

    ::-webkit-scrollbar {
        width: 0px;
    }
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

