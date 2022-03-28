import React from "react";
import { ContainerHeader, BotoesHeader, MenuHeader, Logo } from "./Styles";
import Button from "../../styles/Button";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import logoEscrita from "./../../assets/logoEscrita.png";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { GiHamburgerMenu } from "react-icons/gi";
function Header() {
  const history = useHistory();
  const SubMenu = Menu.SubMenu;

  return (
    <ContainerHeader>
      <MenuHeader></MenuHeader>
      <Logo>
        <img src={logoGuilherme} className="logo1" alt="logoGuilherme"></img>
        <img src={logoEscrita} className="logo2" alt="logoEscrita"></img>
      </Logo>
      <BotoesHeader>
        <Button
          fontSizeMedia1080="1rem"
          backgroundColor="transparent"
          borderColor="transparent"
          color="#ffffff"
          fontSize="1.1rem"
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
          fontSize="1.1rem"
          onClick={() => {
            history.push("/web/criacaoformulario");
          }}
        >
          Receitas
        </Button>
        <Button
          fontSizeMedia1080="1rem"
          backgroundColor="transparent"
          borderColor="transparent"
          color="#E4E6F4"
          fontSize="1.1rem"
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
          fontSize="1.1rem"
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
          fontSize="1.1rem"
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
          fontSize="1.1rem"
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
      </BotoesHeader>
    </ContainerHeader>
  );
}
export default Header;
