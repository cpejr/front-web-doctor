import React from "react";
import {Container,
        EdicaoContainer,
        ContainerSelecao,
        Titulo,
        Descricao,
        ContainerIndicacao} from "./Styles";

function EdicaoIndicacoesESugestoes (){
    return(
        <Container>
            <EdicaoContainer>
                <ContainerSelecao>
                    <Titulo>Indicações e Sugestões<br/>Exames e profissionais</Titulo>
                    <Descricao>São sugestões de profissionais de confiança para realização de exames ou tratamentos específicos, não oferecidos em meu consultório:</Descricao>
                </ContainerSelecao>
                <ContainerIndicacao></ContainerIndicacao>
            </EdicaoContainer>
        </Container>
    )
}

export default EdicaoIndicacoesESugestoes;