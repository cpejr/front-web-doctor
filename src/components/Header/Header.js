import React from "react";
import { ContainerHeader, Logo } from "./Styles";
import Button from "../../styles/Button";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import logoEscrita from "./../../assets/logoEscrita.png";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <ContainerHeader>
      <Logo>
        <img src={logoGuilherme} className="logo1" alt="logoGuilherme"></img>
        <img src={logoEscrita} className="logo2" alt="logoEscrita"></img>
      </Logo>
      <Button
        fontSizeMedia1080="1rem"
        backgroundColor="transparent"
        borderColor="transparent"
        color="#ffffff"
        fontSize="1.25rem"
        onClick={() => {
          console.log("vasco");
          history.push("/web/homemedico");
        }}
      >
        Home
      </Button>
      <Button
        fontSizeMedia1080="1rem"
        backgroundColor="transparent"
        borderColor="transparent"
        color="#ffffff"
        fontSize="1.25rem"
        onClick={() => {
          history.push("/web/listadeusuarios");
        }}
      >
        Lista de Usuários
      </Button>
      <Button
        fontSizeMedia1080="1rem"
        backgroundColor="transparent"
        borderColor="transparent"
        color="#ffffff"
        fontSize="1.25rem"
        onClick={() => {
          history.push("/web/homemedico");
        }}
      >
        Agendamentos
      </Button>
      <Button
        fontSizeMedia1080="1rem"
        backgroundColor="transparent"
        borderColor="transparent"
        color="#ffffff"
        fontSize="1.25rem"
        onClick={() => {
          history.push("/web/homemedico");
        }}
      >
        Formulários
      </Button>
      <Button
        fontSizeMedia1080="1rem"
        backgroundColor="transparent"
        borderColor="transparent"
        color="#ffffff"
        fontSize="1.25rem"
        onClick={() => {
          history.push("/web/criacaoformulario");
        }}
      >
        Chat
      </Button>
      <Button
        fontSizeMedia1080="1rem"
        backgroundColor="green"
        borderColor="transparent"
        color="#ffffff"
        onClick={() => {
          history.push("/login");
        }}
      >
        <CgProfile size="2em" />
      </Button>
    </ContainerHeader>
  );
}
export default Header;
