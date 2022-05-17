import React from "react";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import {
    ContainerModalCodigo,
  } from "./Styles";

function ModalAdicionarCodigo() {
  return (
    <div> <ContainerModalCodigo>
        <Input
          placeholder="Email"
          backgroundColor="#E4E6F4"
          borderColor="#151B57"
          color="black"
          fontSize="1em"
          width="50%"
          marginTop="2%"
        ></Input>

        <Button
          width="50%"
          height="50px"
          backgroundColor="#434B97"
          borderColor="#151B57"
          color="white"
          fontSize="1.5em"
          fontWeight="bold"
          fontSizeMedia="1.2em"
        ></Button>
        </ContainerModalCodigo>
    </div>
  );
}

export default ModalAdicionarCodigo;
