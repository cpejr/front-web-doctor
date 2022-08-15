import React, { useState } from "react";
import { BarraPesquisaChat, NomeMensagem, MensagemPessoa, NomePessoa, HeaderBarraLateralChat, ListaPessoasChat, PessoaChat, BarraLateral } from "./Styles";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import pato from "./../../assets/pato.jpeg";
import patao from "./../../assets/patao.jpg";
import patinho from "./../../assets/patinho.jpg";
import patobravo from "./../../assets/patobravo.jpg";
import patomarreco from "./../../assets/patomarreco.jpg";
import patopato from "./../../assets/patopato.jpg";
import patotimido from "./../../assets/patotimido.jpg";



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



export default function BarraLateralChat(props) {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <BarraLateral>
      <HeaderBarraLateralChat>
        <BarraPesquisaChat>
          <Input
          placeholder="Pesquisar conversa"
          backgroundColor="transparent"
          borderColor="transparent"
          width="90%"
          height="100%"
          onChange={(event) => { setSearchTerm(event.target.value); }}
          />
          <SearchIcon color="disabled"/>
        </BarraPesquisaChat>
        <Button
        backgroundColor="transparent"
        borderColor="transparent"
        color="#0A0E3C"
        width="18%"
        widthres="15%"
        height="27%"
        onClick={() => {}}
        >
        <AddCircleOutlineIcon/>
        </Button>
      </HeaderBarraLateralChat>
      <ListaPessoasChat >
        {pessoas.filter((val)=> {
          if (searchTerm === "") {
            return val
         } else if (val.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }}).map((pessoa) => (
          <PessoaChat 
          key={pessoa.id}
          onClick={() => {props.passandoIdPessoa(pessoa.id)}}
           >
          <img src={pessoa.foto} alt="61" border-radius="3px" height="75px" width="81.3px"></img>
          <NomeMensagem>
          <NomePessoa
          >{pessoa.nome}</NomePessoa>
          <MensagemPessoa>{pessoa.mensagem}</MensagemPessoa>
          </NomeMensagem>
          </PessoaChat>
        ))}
      </ListaPessoasChat>
    </BarraLateral>
    </>
  );
}