import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height:100%;
    width:100%;
    min-height:100vh;

    padding-top: 80px;
    padding-bottom: 40px;
`;

export const EdicaoContainer = styled.div`
    display: flex;
    flex-direction: row;
    

    min-height: 750px;
    width: 1200px;
    border: 1px solid ${Cores.preto};
`;

export const ContainerSelecao = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    width:50%;
`;

export const Titulo = styled.h1`
    font-family: ${Fontes.barlow};
    font-size: 25px;
    font-weight: 500;
`;

export const Descricao = styled.p`
    font-family: ${Fontes.barlow};
    border: none;
    background-color: white;

    width:100%;
    height: auto;
    flex-wrap: wrap;

`;

export const ContainerIndicacao = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    width:50%;
`;