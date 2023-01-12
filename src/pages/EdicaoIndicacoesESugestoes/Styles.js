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
    padding-left: 10%;
    padding-right: 10%;
`;

export const EdicaoContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    
    width: 100%;
    border: 1px solid ${Cores.preto};
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const ContainerSelecao = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
    width:50%;
    padding: 20px 10%;
`;

export const Titulo = styled.h1`
    font-family: ${Fontes.barlow};
    font-size: 30px;
    font-weight: 500;
    text-align: center;
`;

export const Descricao = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: ${Fontes.barlow};
    font-size: 17px;
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

export const Sugestao = styled.button`

    font-size: 16px;
    font-weight: 500;
    font-family: ${Fontes.barlow};
    background-color: ${Cores.cinza[7]};

    padding: 5px 5px;
    width: 100%;
    border: 2px solid ${Cores.azulEscuro};
    color: ${Cores.preto};

    border: 2px solid ${Cores.azulEscuro};
    border-radius: 4px;
    margin-bottom: 10px;

`;

export const Divisoria = styled.div`
    display: flex;
    border: 1px solid ${Cores.cinza[3]};
    border-radius: 4px;
    align-self: stretch;
`;

export const ContainerIndicacao = styled.div`

`;