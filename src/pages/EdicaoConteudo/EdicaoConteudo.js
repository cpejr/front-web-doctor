import React from "react";
import { Corpo, Container, TituloPaginaEdicao, BoxGenerico, MetadeEsquerda, MetadeDireita, BotaoGenerico, ContainerBotoes } from "./Styles";
import { useHistory } from "react-router-dom";

function EdicaoConteudo() {
  //const history = useHistory();

  return (
    <Corpo>
      <Container>
        <MetadeEsquerda>
          <BoxGenerico
          >
            BEM-VINDO AO DOCTOR APP
            <div>Conheça melhor o doutor Guilherme Marques</div>
            <BotaoGenerico>Alterar vídeo</BotaoGenerico>
          </BoxGenerico>
          <BoxGenerico
          >
            VENHA FAZER PARTE DO TIME
            <div>Para ter acesso a chat com o doutor, marcar exames e muito mais</div>
            <BotaoGenerico>INSCREVA-SE</BotaoGenerico>
            <div>Já possui conta?</div>
            <BotaoGenerico>ENTRAR</BotaoGenerico>
          </BoxGenerico>
          <BoxGenerico

          >
            Sobre Mim
            <div>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</div>
            <BotaoGenerico>SAIBA MAIS</BotaoGenerico>
          </BoxGenerico>
          <BotaoGenerico>
            <BotaoGenerico>Alterar Imagens</BotaoGenerico>
          </BotaoGenerico>
        </MetadeEsquerda>
        <MetadeDireita>
          <BoxGenerico
          background-color="#FBCB4C"
          >
            Indicações e Sugestões
            <div>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</div>
            <BotaoGenerico>SAIBA MAIS</BotaoGenerico>
          </BoxGenerico>
          <BoxGenerico
          >
            Comentários e Depoimentos
            <div>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</div>
            <BotaoGenerico>SAIBA MAIS</BotaoGenerico>
          </BoxGenerico>
          <BoxGenerico>
            Grupo AMIE (Epilepsia)
            <div>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</div>
            <BotaoGenerico>SAIBA MAIS</BotaoGenerico>
          </BoxGenerico>
            <ContainerBotoes>
              <BotaoGenerico>Salvar Alterações</BotaoGenerico>
              <BotaoGenerico>Cancelar Alterações</BotaoGenerico>
            </ContainerBotoes>
        </MetadeDireita>
      </Container>
    </Corpo>
  );
}

export default EdicaoConteudo;
