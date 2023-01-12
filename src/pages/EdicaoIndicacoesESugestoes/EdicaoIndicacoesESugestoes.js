import React from "react";
import {Container,
        EdicaoContainer,
        ContainerSelecao,
        Titulo,
        Descricao,
        ContainerSugestao,
        Sugestao,
        Divisoria,
        ContainerIndicacao} from "./Styles";

function EdicaoIndicacoesESugestoes (){
    return(
        <Container>
            <EdicaoContainer>
                <ContainerSelecao>
                    <div>
                        <Titulo>Indicações e Sugestões<br/>Exames e profissionais</Titulo>
                        <Descricao>São sugestões de profissionais de confiança para realização de exames ou tratamentos específicos, não oferecidos em meu consultório:</Descricao>
                    </div>
                    <ContainerSugestao>
                        <Sugestao>Eletroneuromiografia</Sugestao>
                        <Sugestao>Ressonância Magnética em Epilespsia</Sugestao>
                        <Sugestao>Punção Lombar</Sugestao>
                        <Sugestao>Fisioterapia CPAP</Sugestao>
                        <Sugestao>Fonoaudiologia - Apneia de Sono</Sugestao>
                        <Sugestao>Odontologia do Sono</Sugestao>
                        <Sugestao>Eletroneuromiografia</Sugestao>
                        <Sugestao>Psicologia - TCC Insônia</Sugestao>
                        <Sugestao>Avaiação Neuropsicológica</Sugestao>
                    </ContainerSugestao>
                </ContainerSelecao>
                <Divisoria></Divisoria>
                <ContainerIndicacao></ContainerIndicacao>
            </EdicaoContainer>
        </Container>
        )
}

export default EdicaoIndicacoesESugestoes;