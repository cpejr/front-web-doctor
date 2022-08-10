import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import BarraLateralChat from "../../components/BarraLateralChat"
import ConversaAberta from "../../components/ConversaAberta";
import { Cores } from "../../variaveis";
import { Container } from "./Styles";

function Chat() {

  
  return (
    <Container>
      <BarraLateralChat></BarraLateralChat>
      
    </Container>
  );
}

export const HomeComp = () => {
  const { user } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);


  return (
    <div className="home-cont">
      <BarraLateralChat />
      {chatting._id ? <ConversaAberta /> : <MensagemInicial {...user} />}
    </div>
  );
};

const MensagemInicial = ({ pic }) => {
  return (
    <div className="chattingpage start-msg">
      <div>
        <Avatar src={pic} sx={{ width: 70, height: 70 }} />
        <h3>Bem vindo!</h3>
        <p>Selecione um chat para iniciar uma conversa.</p>
      </div>
    </div>
  );
};

export default Chat;
