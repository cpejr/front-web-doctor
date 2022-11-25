import React from "react";
import {
  Container,
  EdicaoContainer,
  Titulo,
  Inputs,
  InputContainer,
  InputImagemContainer,
  InputMensagemBotao,
  InputTextoContainer,
  InputTitulo,
  InputAreaTexto,
  Divisor,
  BotaoContainer,
  Botao,
} from "./Styles";

function EdicaoSobreMim() {
  return (
    <Container>
      <EdicaoContainer>
        <Titulo>Página sobre mim</Titulo>
        <Inputs>
          <InputContainer>
            <InputImagemContainer>
              <InputMensagemBotao>Alterar Imagem</InputMensagemBotao>
            </InputImagemContainer>
            <InputTextoContainer>
              <InputTitulo defaultValue={"Quem sou"} />
              <InputAreaTexto
                defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis nisi debitis et autem cupiditate quis, nesciunt quia
              neque aut minima distinctio, repellat ex ad, dolore repellendus
              necessitatibus placeat in dicta!`}
              />
            </InputTextoContainer>
          </InputContainer>
          <Divisor />
          <InputContainer>
            <InputImagemContainer>
              <InputMensagemBotao>Alterar Imagem</InputMensagemBotao>
            </InputImagemContainer>
            <InputTextoContainer>
              <InputTitulo defaultValue={"Minha experiência"} />
              <InputAreaTexto
                defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis nisi debitis et autem cupiditate quis, nesciunt quia
              neque aut minima distinctio, repellat ex ad, dolore repellendus
              necessitatibus placeat in dicta!`}
              />
            </InputTextoContainer>
            <BotaoContainer>
              <Botao>Salvar Alterações</Botao>
              <Botao>Cancelar Alterações</Botao>
            </BotaoContainer>
          </InputContainer>
        </Inputs>
      </EdicaoContainer>
    </Container>
  );
}

export default EdicaoSobreMim;
