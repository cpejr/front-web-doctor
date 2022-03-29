import React from "react";
import {
  ContainerHeader,
  BotoesHeader,
  MenuHeader,
  Logo,
  Wrapper,
  Separator,
  Section,
} from "./Styles";
import NavItem from "../NavItem";
import Button from "../../styles/Button";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import logoEscrita from "./../../assets/logoEscrita.png";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { Menu, Tooltip } from "antd";

function Header() {
  const history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item>palmeiras</Menu.Item>
      <Menu.Item>vasco</Menu.Item>
      <Menu.Divider />
      <Menu.Item>3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <ContainerHeader>
      <MenuHeader>
        <Section style={{ marginTop: "40px" }}>
          {open && <Section.Title>Cadastro</Section.Title>}
          {registerSelect.map((item) => (
            <Tooltip
              title={!open && item.name}
              placement="rightTop"
              key={item.id}
            >
              <NavItem
                open={open}
                Icon={item.icon}
                onClick={() => handleClick(item.id)}
                selected={selectedKey === item.id}
              >
                {item.name}
              </NavItem>
            </Tooltip>
          ))}
        </Section>
      </MenuHeader>
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
