import React, { useState } from "react";
import BarraLateralChat from "../../components/BarraLateralChat"
// import ConversaAberta from "../../components/ConversaAberta";
import { Container } from "./Styles";


const Chat = () => {
  const [usandoIdPessoa, setUsandoIdPessoa] = useState();

  function funcaoPai(id) {
    setUsandoIdPessoa(id)
    console.log(id)
  }
  return (
    <Container>
      <BarraLateralChat passandoIdPessoa={(id) => funcaoPai(id)}/>
      {usandoIdPessoa ? <ConversaAberta /> : <MensagemInicial/>}
    </Container>
  );
};

const MensagemInicial = () => {
  return (
      <div>
        <h3>Bem vindo!</h3>
        <p>Selecione um chat para iniciar uma conversa.</p>
      </div>
  );
};

const ConversaAberta = () => {
  return (
      <div>
        <h3>maria chata</h3>
        <p>Selecione um chat para iniciar uma conversa.</p>
      </div>
  );
};

export default Chat;
