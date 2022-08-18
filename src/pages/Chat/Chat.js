import React, { useState } from "react";
import BarraLateralChat from "../../components/BarraLateralChat"
import ConversaAberta from "../../components/ConversaAberta";
import { Container, MensagemInicialChat, ContainerMobile } from "./Styles";


const Chat = () => {
  const [usandoIdPessoa, setUsandoIdPessoa] = useState();

  
  function funcaoPai(id) {
    setUsandoIdPessoa(id)
  }
  return (
    <>
    <Container>
      <BarraLateralChat passandoIdPessoa={(id) => funcaoPai(id)}/>
      {usandoIdPessoa ? <ConversaAberta idConversaAberta={usandoIdPessoa} /> : <MensagemInicial/>}
    </Container>

    <ContainerMobile>
      {usandoIdPessoa ? <ConversaAberta idConversaAberta={usandoIdPessoa} /> : <BarraLateralChat passandoIdPessoa={(id) => funcaoPai(id)}/>}
    </ContainerMobile>
    </>
  );
};

const MensagemInicial = () => {
  return (
      <MensagemInicialChat>
        <h3>Bem vindo!</h3>
        <p>Selecione um chat para iniciar uma conversa.</p>
      </MensagemInicialChat>
  );
};


export default Chat;
