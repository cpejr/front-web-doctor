import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import api from "../../services/api";
import {
  TopoPagina,
  ContainerListadeUsuarios,
  Filtros,
  FiltroDatas,
  FiltroUsuario,
  BarraPesquisa,
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
import Button from "../../styles/Button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function ListaUsuariosSecretaria() {
  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    api.get("/usuarios").then((response) => {
      setUsuarios(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <ContainerListadeUsuarios>
      <TopoPagina>
        <BarraPesquisa>
          <Search placeholder="BUSCAR" style={{ width: 400 }} />
        </BarraPesquisa>
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
        {usuarios.map((value) => (
          <Usuario key={value.id}>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            <Nome>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <div>{value.nome}</div>
              )}
            </Nome>
            <Telefone>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <div>{value.telefone}</div>
              )}
            </Telefone>
            <UltimaVisita>21/04/2022</UltimaVisita>

            <UltimaVisita>21/04/2022</UltimaVisita>

            <Agendamento>
              <Button
                backgroundColor="transparent"
                borderColor="transparent"
                color="green"
                fontSize="1em"
                textDecoration="underline"
                height="50px"
              >
                Marcar Agendamento
              </Button>
            </Agendamento>
            <CódigoPaciente>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <div>{value.codigo}</div>
              )}
            </CódigoPaciente>
          </Usuario>
        ))}
      </ContainerUsuarios>
    </ContainerListadeUsuarios>
  );
}

export default ListaUsuariosSecretaria;
