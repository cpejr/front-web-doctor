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
  Imagem,
  Nome,
  Telefone,
  UltimaVisita,
  Agendamento,
  CódigoPaciente,
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
              style={{ color: "#151B57", width: 200 }}
            ></Select>
          </FiltroDatas>
        </Filtros>
      </TopoPagina>
      <BarraEstetica></BarraEstetica>
      <DadosUsuario>
        <Titulo></Titulo>
        <Nome>Nome do Usuário</Nome>
        <Telefone>Telefone</Telefone>
        <UltimaVisita>Última Visita</UltimaVisita>
        <Agendamento>Agendamento</Agendamento>
        <CódigoPaciente>Código do Paciente</CódigoPaciente>
      </DadosUsuario>
      <ContainerUsuarios>
        <Usuario>
          <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
          <Nome>Mateus Pardini</Nome>
          <Telefone>(19)94002-8922</Telefone>
          <UltimaVisita>21/04/2022</UltimaVisita>
          <Agendamento>30/04/2022 - 15h</Agendamento>
          <CódigoPaciente>923902-2823092</CódigoPaciente>
        </Usuario>
        <Usuario>
          <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
          <Nome>Nome do Usuário</Nome>
          <Telefone>Telefone</Telefone>
          <UltimaVisita>Última Visita</UltimaVisita>
          <Agendamento>Agendamento</Agendamento>
          <CódigoPaciente>Código do Paciente</CódigoPaciente>
        </Usuario>
      </ContainerUsuarios>
    </ContainerListadeUsuarios>
  );
}

export default ListaUsuarios;
