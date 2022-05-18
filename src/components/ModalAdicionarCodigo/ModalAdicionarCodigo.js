import React from "react";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { ContainerModalCodigo, Titulo } from "./Styles";

function ModalAdicionarCodigo() {
  return (
    <ContainerModalCodigo>
      <Titulo>Adicione um codigo</Titulo>
      <Input
        placeholder="Codigo"
        backgroundColor="#E4E6F4"
        borderColor="#151B57"
        color="black"
        fontSize="1em"
        width="100%"
        marginTop="2%"
      ></Input>

      <Button
        width="100%"
        height="50px"
        backgroundColor="#434B97"
        borderColor="#151B57"
        color="white"
        fontSize="1.5em"
        fontWeight="bold"
        fontSizeMedia="1.2em"
      >Confirmar</Button>
    </ContainerModalCodigo>
  );
}

export default ModalAdicionarCodigo;
