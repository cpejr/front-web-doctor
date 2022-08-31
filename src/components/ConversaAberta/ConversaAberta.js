import React, { useEffect } from "react";
import { HeaderConversaAberta, Conversa,  NomePessoa, BotaoVoltar, CorpoConversaAberta, FooterConversaAberta, MensagemRecebida, MensagemEnviada, DataHoraMensagem } from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import pato from "./../../assets/pato.jpeg";
import patao from "./../../assets/patao.jpg";
import patinho from "./../../assets/patinho.jpg";
import patobravo from "./../../assets/patobravo.jpg";
import patomarreco from "./../../assets/patomarreco.jpg";
import patopato from "./../../assets/patopato.jpg";
import patotimido from "./../../assets/patotimido.jpg";
import { ArrowLeftOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons';

const pessoas = [
  {
      id: 1,
      foto: `${pato}`,
      nome: "Pato",
      mensagem: "quack",
      
  },
  {
      id: 2,
      foto:`${patao}`,
      nome: "Patão",
      mensagem: "quackão",
  },
  {
      id: 3,
      foto:`${patinho}`,
      nome: "Patinho",
      mensagem: "quack",
  },
  {
    id: 4,
    foto:`${patobravo}`,
    nome: "Pato da silva",
    mensagem: "quack",
  },
  {
    id: 5,
    foto:`${patomarreco}`,
    nome: "Marreco",
    mensagem: "quack",
  },
  {
    id: 6,
    foto:`${patotimido}`,
    nome: "Patinho timido",
    mensagem: "quack",
  },
  {
    id: 7,
    foto:`${patopato}`,
    nome: "Pato Tirado",
    mensagem: "quack",
  },
]

export default function ConversaAberta(props) {

  useEffect(() => {
    pegandoId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function pegandoId() {
    console.log(pessoas[props.idConversaAberta - 1].nome);
  }

    return (
      <>
      <Conversa>
        <HeaderConversaAberta>
          <BotaoVoltar>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color={Cores.lilas[1]}
            width="10%"
            widthres="15%"
            height="10%"
            marginTop="0%"
            onClick={() => {window.location.reload()}}
            >
            <ArrowLeftOutlined style={{ fontSize: '30px', color: '{Cores.lilas[1]}' }}/>
          </Button>
          </BotaoVoltar>
          <img src={pessoas[props.idConversaAberta - 1].foto} alt="61"  height="70px" width="76px"></img>
          <NomePessoa
          >{pessoas[props.idConversaAberta - 1].nome}</NomePessoa> 
        </HeaderConversaAberta>
        <CorpoConversaAberta>
          <MensagemRecebida>Oii É preciso ter coragem para enfrentar os inimigos, e ainda mais para enfrentar os amigos.<DataHoraMensagem>15/05/2022 12:12</DataHoraMensagem></MensagemRecebida>
          <MensagemEnviada>oiiii<DataHoraMensagem>15/05/2022 12:12</DataHoraMensagem></MensagemEnviada>
          <MensagemEnviada>É preciso ter coragem para enfrentar os inimigos, e ainda mais para enfrentar os amigos.<DataHoraMensagem>15/05/2022 12:12</DataHoraMensagem></MensagemEnviada>
        </CorpoConversaAberta>
        <FooterConversaAberta>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color={Cores.lilas[1]}
            width="10%"
            widthres="15%"
            height="10%"
            marginTop="0%"
            onClick={() => {}}
            >
            <PaperClipOutlined style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}/>
          </Button>
          <Input
            placeholder="Mensagem"
            backgroundColor="white"
            borderColor= {Cores.cinza[3]}
            width="90%"
            height="100%"
            minHeight="45px"
            maxHeight="40px"
            paddingRight="2%"
          />
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color={Cores.lilas[1]}
            width="10%"
            widthres="15%"
            height="10%"
            marginTop="0%"
            onClick={() => {}}
            >
            <SendOutlined style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}/>
          </Button>
        </FooterConversaAberta>
      </Conversa>
      </>
    );
  };

