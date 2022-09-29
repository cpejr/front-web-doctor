import React from "react";
import { Carregar, Container } from "./Styles";

export default function Carregando() {
  return (
    <Container>
      <Carregar animation="0s"></Carregar>
      <Carregar animation=".3s"></Carregar>
      <Carregar animation=".6s"></Carregar>
    </Container>
  );
}
