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
    font-size: 28px;
    font-weight: 500;
    margin-top: 20px;

    width:300px;
`;

export const Descricao = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${Fontes.barlow};
    font-size: 15px;
    font-weight: 500;
    border: none;
    background-color: white;

    width:300px;
    height: auto;
    flex-wrap: wrap;
    margin-top: 20px;

`;

export const ContainerIndicacao = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    width:50%;
`;

export const Sugestao = styled.button`

    font-size: 16px;
    font-weight: 500;
    font-family: ${Fontes.barlow};
    background-color: ${Cores.cinza[7]};

    padding: 5px 5px;
    width: 300px;
    border: 2px solid #0A0E3C;
    color: ${Cores.preto};

    border: 2px solid #0A0E3C;
    border-radius: 4px;
    margin-bottom: 10px;

    /* .Sugestão{
        transition-duration: 0.4s;
    }
    .Sugestão:hover {
        background-color:${Cores.azulEscuro};
        color: ${Cores.branco};
    } */
`;