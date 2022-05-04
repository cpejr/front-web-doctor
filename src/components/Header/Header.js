import React, { useEffect, useState } from "react";
import { ContainerHeader, BotoesHeader, MenuHeader, Logo } from "./Styles";
import Button from "../../styles/Button";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import logoEscrita from "./../../assets/logoEscrita.png";
import { useHistory } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import * as managerService from "../../services/ManagerService/managerService";

function Header(props) {
  const email = sessionStorage.getItem("@doctorapp-Email");
  const [tipo, setTipo] = useState([]);

  async function pegandoTipo() {
    const resposta = await managerService.GetDadosUsuario(email);
    setTipo(resposta.dadosUsuario.tipo);
  }

  useEffect(() => {
    pegandoTipo();
  }, []);
  const history = useHistory();
  const menu = (
    <Menu>
      {tipo === "MASTER" ? (
        <Menu.Item>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="black"
            fontSize="1rem"
            height="50px"
            onClick={() => {
              history.push("/web/homemedico");
            }}
          >
            Home
          </Button>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="black"
            fontSize="1rem"
            height="50px"
            onClick={() => {
              history.push("/web/homesecretaria");
            }}
          >
            Home
          </Button>
        </Menu.Item>
      )}
      {tipo === "MASTER" ? (
        <Menu.Item>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="black"
            fontSize="1rem"
            height="50px"
            onClick={() => {
              history.push("/web/areareceitas");
            }}
          >
            Receitas
          </Button>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="white"
            fontSize="1rem"
            height="50px"
            onClick={() => {
              history.push("/web/agendamentos");
            }}
          >
            Agendamentos
          </Button>
        </Menu.Item>
      )}
      <Menu.Item>
        {tipo === "MASTER" ? (
          <Menu.Item>
            <Button
              backgroundColor="transparent"
              borderColor="transparent"
              color="black"
              fontSize="1rem"
              height="50px"
              onClick={() => {
                history.push("/web/listadeusuariosmedico");
              }}
            >
              Lista de Usuários
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Button
              backgroundColor="transparent"
              borderColor="transparent"
              color="black"
              fontSize="1rem"
              height="50px"
              onClick={() => {
                history.push("/web/listadeusuariossecretaria");
              }}
            >
              Lista de Usuários
            </Button>
          </Menu.Item>
        )}
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color="black"
          fontSize="1rem"
          height="50px"
          onClick={() => {
            history.push("/web/criacaoformulario");
          }}
        >
          Formulários
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color="black"
          fontSize="1rem"
          height="50px"
          onClick={() => {
            history.push("/web/chat");
          }}
        >
          Chat
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <ContainerHeader>
        <MenuHeader>
          <Dropdown
            onClick={(e) => e.preventDefault()}
            overlay={menu}
            placement={"bottom"}
          >
            <MenuOutlined style={{ color: "white", fontSize: "1.5em" }} />
          </Dropdown>
        </MenuHeader>
        <Logo>
          <img src={logoGuilherme} className="logo1" alt="logoGuilherme"></img>
          <img src={logoEscrita} className="logo2" alt="logoEscrita"></img>
        </Logo>
        <BotoesHeader>
          {tipo === "MASTER" ? (
            <Button
              fontSizeMedia1080="1rem"
              backgroundColor="transparent"
              borderColor="transparent"
              color="#ffffff"
              fontSize="1.1rem"
              height="50px"
              onClick={() => {
                history.push("/web/homemedico");
              }}
            >
              Home
            </Button>
          ) : (
            <Button
              fontSizeMedia1080="1rem"
              backgroundColor="transparent"
              borderColor="transparent"
              color="#ffffff"
              fontSize="1.1rem"
              height="50px"
              onClick={() => {
                history.push("/web/homesecretaria");
              }}
            >
              Home
            </Button>
          )}
          {tipo === "MASTER" ? (
            <Button
              fontSizeMedia1080="1rem"
              backgroundColor="transparent"
              borderColor="transparent"
              color="#ffffff"
              fontSize="1.1rem"
              height="50px"
              onClick={() => {
                history.push("/web/areareceitas");
              }}
            >
              Receitas
            </Button>
          ) : (
            <Button
              fontSizeMedia1080="1rem"
              backgroundColor="transparent"
              borderColor="transparent"
              color="white"
              fontSize="1.1rem"
              height="50px"
              onClick={() => {
                history.push("/web/agendamentos");
              }}
            >
              Agendamentos
            </Button>
          )}
          {tipo === "MASTER" ? (
            <Button
              fontSizeMedia1080="1rem"
              backgroundColor="transparent"
              borderColor="transparent"
              color="#E4E6F4"
              fontSize="1.1rem"
              height="50px"
              onClick={() => {
                history.push("/web/listadeusuariosmedico");
              }}
            >
              Lista de Usuários
            </Button>
          ) : (
            <Button
              fontSizeMedia1080="1rem"
              backgroundColor="transparent"
              borderColor="transparent"
              color="#E4E6F4"
              fontSize="1.1rem"
              height="50px"
              onClick={() => {
                history.push("/web/listadeusuariossecretaria");
              }}
            >
              Lista de Usuários
            </Button>
          )}
          <Button
            fontSizeMedia1080="1rem"
            backgroundColor="transparent"
            borderColor="transparent"
            color="#ffffff"
            fontSize="1.1rem"
            height="50px"
            onClick={() => {
              history.push("/web/criacaoformulario");
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
            height="50px"
            onClick={() => {
              history.push("/web/chat");
            }}
          >
            Chat
          </Button>
          <Button
            fontSizeMedia1080="1rem"
            backgroundColor="green"
            borderColor="transparent"
            color="#ffffff"
            height="50px"
            onClick={() => {
              history.push("/login");
            }}
          >
            <UserOutlined style={{ fontSize: "1.5em" }} />
          </Button>
        </BotoesHeader>
      </ContainerHeader>
      {props.children}
    </div>
  );
}
export default Header;
