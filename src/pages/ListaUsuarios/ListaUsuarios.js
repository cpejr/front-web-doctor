import React from "react";
import { Input, Select } from "antd";
import {
  TopoPagina,
  ContainerListadeUsuarios,
  Filtros,
  FiltroDatas,
  FiltroUsuario,
  BarraEstetica,
  DadosUsuario,
  Titulo,
  ContainerUsuarios,
  Usuario,
  Imagem
} from "./Styles";
import logoGuilherme from "../../assets/logoGuilherme.png";

function ListaUsuarios() {
  const { Search } = Input;

  return (
    <ContainerListadeUsuarios>
      <TopoPagina>
        <Search placeholder="BUSCAR" style={{ width: 600 }} />
        <Filtros>
          <FiltroUsuario>
            <Select
              defaultValue="Todos os Usuários"
              style={{ color: "#151B57", width: 200 }}
            ></Select>
          </FiltroUsuario>
          <FiltroDatas>
            <Select
              defaultValue="Todas as datas"
              style={{ color: "#151B57", width: 200  }}
            ></Select>
          </FiltroDatas>
        </Filtros>
      </TopoPagina>
      <BarraEstetica></BarraEstetica>
      <DadosUsuario>
        <Titulo></Titulo>
        <Titulo>Nome do Usuário</Titulo>
        <Titulo>Telefone</Titulo>
        <Titulo>Última Visita</Titulo>
        <Titulo>Agendamento</Titulo>
        <Titulo>Código do Paciente</Titulo>
      </DadosUsuario>
      <ContainerUsuarios>
        <Usuario>
        <Titulo><Imagem src={logoGuilherme}  alt="logoGuilherme"></Imagem></Titulo>
        <Titulo>Mateus</Titulo>
        <Titulo>Telefone</Titulo>
        <Titulo>Última Visita</Titulo>
        <Titulo>Agendamento</Titulo>
        <Titulo>Código do Paciente</Titulo>
        </Usuario>
        <Usuario>
        <Titulo><Imagem src={logoGuilherme}  alt="logoGuilherme"></Imagem></Titulo>
        <Titulo>Nome do Usuário</Titulo>
        <Titulo>Telefone</Titulo>
        <Titulo>Última Visita</Titulo>
        <Titulo>Agendamento</Titulo>
        <Titulo>Código do Paciente</Titulo>
        </Usuario>
      </ContainerUsuarios>
    </ContainerListadeUsuarios>
  );
}

export default ListaUsuarios;
