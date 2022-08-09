import React from "react";
import { HeaderBarraLateralChat, ListaUsuariosChat, UsuarioChat } from "./Styles";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Cores } from "../../variaveis";

export default function BarraLateralChat() {
  return (
    <>
    <HeaderBarraLateralChat>
      <Input
      placeholder="Pesquisar no chat"
      backgroundColor={Cores.cinza[6]}
      borderColor={Cores.cinza[2]}
      width="80%"
      height="5%"
      >
      </Input>
      <Button
      backgroundColor="transparent"
      borderColor="transparent"
      color="#0A0E3C"
      width="18%"
      height="2.5%"
      onClick={() => {}}
      >
      <AddCircleOutlineIcon></AddCircleOutlineIcon>
      </Button>
    </HeaderBarraLateralChat>
    <ListaUsuariosChat>
      <UsuarioChat></UsuarioChat>
    </ListaUsuariosChat>
    </>
  );
}