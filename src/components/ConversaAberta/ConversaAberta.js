import React, { useEffect } from "react";
import { HeaderConversaAberta, Conversa, NomePessoa, CorpoConversaAberta, FooterConversaAberta } from "./Styles";
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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

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
          <img src={pessoas[props.idConversaAberta - 1].foto} alt="61"  height="70px" width="76px"></img>
          <NomePessoa
          >{pessoas[props.idConversaAberta - 1].nome}</NomePessoa> 
        </HeaderConversaAberta>
        <CorpoConversaAberta>
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
            <AttachFileIcon/>
          </Button>
          <Input
            placeholder="Mensagem"
            backgroundColor="white"
            borderColor= {Cores.cinza[3]}
            width="90%"
            height="100%"
            minHeight="45px"
            maxHeight="40px"
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
            <SendIcon/>
          </Button>
        </FooterConversaAberta>
      </Conversa>
      </>
    );
  };

