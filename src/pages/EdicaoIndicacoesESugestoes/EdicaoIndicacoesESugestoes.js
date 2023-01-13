import React from "react";
import {Container,
        EdicaoContainer,
        ContainerInterno,
        Titulo,
        Descricao,
        ContainerSugestao,
        Sugestao,
        Divisoria,
        Informacoes,
        TituloInfo,
        BotoesIndicacao,
        Indicacao,
        DescricaoInformacoes} from "./Styles";

function EdicaoIndicacoesESugestoes (){
    return(
        <Container>
            <EdicaoContainer>
                <ContainerInterno>
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
                </ContainerInterno>
                <Divisoria></Divisoria>
                <ContainerInterno>
                    <Informacoes>
                        <TituloInfo>Eletroneuromiografia</TituloInfo>
                        <DescricaoInformacoes placeholder="Abobrinha"/>
                    </Informacoes>
                    <BotoesIndicacao>
                        <Indicacao>Adicionar Indicação</Indicacao>
                        <Indicacao>Alterar Indicação</Indicacao>
                        <Indicacao>Excluir Indicação</Indicacao>
                    </BotoesIndicacao>
                </ContainerInterno>
            </EdicaoContainer>
        </Container>
        )
}

export default EdicaoIndicacoesESugestoes;