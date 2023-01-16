import styled from "styled-components";
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
`;

export const EdicaoContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    width: 100%;
    border: 1px solid ${Cores.preto};
    padding-top: 20px;
    padding-bottom: 20px;
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

export const Titulo = styled.h1`
    font-family: ${Fontes.barlow};
    font-size: 25px;
    font-weight: 500;
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

export const Sugestao = styled.button`

    font-size: 14px;
    font-weight: 500;
    font-family: ${Fontes.barlow};
    background-color: ${Cores.cinza[7]};

    padding: 5px 5px;
    width: 100%;
    border: 2px solid ${Cores.azulEscuro};
    color: ${Cores.preto};

    border: 2px solid ${Cores.azulEscuro};
    border-radius: 4px;

`;

export const Divisoria = styled.div`
    display: flex;
    border: 1px solid ${Cores.cinza[3]};
    border-radius: 4px;
    align-self: stretch;
`;

export const Informacoes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    height: 60%;
    width: 100%;
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

export const Indicacao = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    
    gap: 5px;
    background-color: ${Cores.azul};
    color: ${Cores.branco};
    font-size: 24px;
    font-weight: 500;
    font-family: ${Fontes.barlow};
    border: 3px solid ${Cores.azulEscuro};
    border-radius: 4px;
    
    height: 100%;
    @media(max-width: 1037px){
        font-size: 19px;
    }
`;