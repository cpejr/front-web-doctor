import React from "react";
import { Corpo, Container, TituloPaginaEdicao, BoxGenerico, MetadeEsquerda, MetadeDireita, BotaoGenerico, ContainerBotoes, BoxBemVindo, BoxTime, BoxSaibaMais, BoxAlterarImagem, BoxVideo, TituloCentral, SubtituloCentral, TituloEsquerda, Conteudo, TextoSaibaMais } from "./Styles";
import { useHistory } from "react-router-dom";
import { Cores } from "../../variaveis";

function EdicaoHome() {
  //const history = useHistory();

  return (
    <Corpo>
      <Container>
        <MetadeEsquerda>

          <BoxBemVindo
          >
            <TituloCentral>
              BEM-VINDO AO DOCTOR APP
            </TituloCentral>
            <SubtituloCentral>
              Conheça melhor o doutor Guilherme Marques
            </SubtituloCentral>
            <BoxVideo>
              <BotaoGenerico>Alterar vídeo</BotaoGenerico>
            </BoxVideo>
          </BoxBemVindo>

          <BoxTime
          >
            <TituloCentral>
              VENHA FAZER PARTE DO TIME
            </TituloCentral>
            <SubtituloCentral>
            Para ter acesso a chat com o doutor, marcar exames e muito mais
            </SubtituloCentral>
            <BotaoGenerico>INSCREVA-SE</BotaoGenerico>
            <div>Já possui conta?</div>
            <BotaoGenerico>ENTRAR</BotaoGenerico>
          </BoxTime>

          <BoxSaibaMais backgroundColor="#7757A0"
          >
            <TituloEsquerda color= {Cores.branco}>Sobre Mim</TituloEsquerda>
            <Conteudo color= {Cores.branco}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
              <TextoSaibaMais color={Cores.branco}>
              SAIBA MAIS
            </TextoSaibaMais>
          </BoxSaibaMais>

          <BoxAlterarImagem
          >
            <BotaoGenerico>
              <BotaoGenerico>Alterar Imagens</BotaoGenerico>
            </BotaoGenerico>
          </BoxAlterarImagem>

        </MetadeEsquerda>

        <MetadeDireita>

          <BoxSaibaMais
            backgroundColor="#FBCB4C"
          >
            <TituloEsquerda color={Cores.preto}>Indicações e Sugestões</TituloEsquerda>
            <Conteudo color={Cores.preto}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
              <TextoSaibaMais color={Cores.preto}>
              SAIBA MAIS
            </TextoSaibaMais>
          </BoxSaibaMais>

          <BoxSaibaMais backgroundColor= {Cores.lilas[1]}
          >
            <TituloEsquerda color={Cores.branco}>Comentários e Depoimentos</TituloEsquerda>
            <Conteudo color={Cores.branco}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
              <TextoSaibaMais color={Cores.branco}>
              SAIBA MAIS
            </TextoSaibaMais>
          </BoxSaibaMais>
          <BoxSaibaMais>
          <TituloEsquerda color={Cores.preto}>Grupo AMIE (Epilepsia)</TituloEsquerda>
          <Conteudo color={Cores.preto}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
            <TextoSaibaMais color={Cores.preto}>
              SAIBA MAIS
            </TextoSaibaMais>
          </BoxSaibaMais>
          <ContainerBotoes>
            <BotaoGenerico>Salvar Alterações</BotaoGenerico>
            <BotaoGenerico>Cancelar Alterações</BotaoGenerico>
          </ContainerBotoes>
        </MetadeDireita>
      </Container>
    </Corpo>
  );
}

export default EdicaoHome;
