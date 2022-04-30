import React, { useState, useEffect } from "react";
import {
  ContainerPerfil,
  Perfil,
  Formularios,
  Receitas,
  PerfilSuperior,
  PerfilInferior,
  FotoPerfil,
  Dados,
  Nome,
  DataAnos,
  Data,
  Anos,
  PerfilEsquerda,
  PerfilDireita,
  Titulo,
  Botoes,
  Botao,
  Formulario,
  DadosFormulario,
  DadosContato,
  DadosGeo,
  InfoContato,
  Receita,
  BotaoReceita,
  DadosReceita,
  TituloFormulario,
  RespostaPendente,
  Resposta,
  TituloReceita,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
import logoGuilherme from "../../assets/logoGuilherme.png";
import Button from "../../styles/Button";

function PerfilPaciente() {
  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(email);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  return (
    <ContainerPerfil>
      <Perfil>
        <PerfilEsquerda>
          <PerfilSuperior>
            <FotoPerfil>
              <img src={logoGuilherme} className="foto"></img>
            </FotoPerfil>
            <Dados>
              <Nome>{usuario.nome}</Nome>
              <Data>{telefone}</Data>
            </Dados>
          </PerfilSuperior>
          <PerfilInferior>
            <Titulo>Endereço:</Titulo>
            <DadosGeo>{endereco.pais}:</DadosGeo>
            <DadosGeo>{endereco.estado}:</DadosGeo>
            <DadosGeo>{endereco.cidade}:</DadosGeo>
            <DadosGeo>{endereco.cep}:</DadosGeo>
            <DadosGeo>{endereco.rua}:</DadosGeo>
            <DadosGeo style={{ color: "green" }}>Apartamento:</DadosGeo>
          </PerfilInferior>
        </PerfilEsquerda>
        <PerfilDireita>
          <DadosContato>
            <Titulo>Contato</Titulo>
            <InfoContato>Celular:</InfoContato>
            <InfoContato textDecoration="underline">Email:</InfoContato>
          </DadosContato>
          <Botoes>
            <Botao>
              <Button
                backgroundColor="green"
                color="#0A0E3C"
                fontWeight="bold"
                borderColor="#0A0E3C"
                height="40px"
                width="100%"
                fontSize="1.3em"
              >
                Iniciar Conversa
              </Button>
            </Botao>
            <Botao>
              <Button
                backgroundColor="green"
                color="#0A0E3C"
                fontWeight="bold"
                borderColor="#0A0E3C"
                height="40px"
                width="100%"
                fontSize="1.3em"
              >
                Agendamentos
              </Button>
            </Botao>
            <Botao>
              <Button
                backgroundColor="green"
                color="#0A0E3C"
                fontWeight="bold"
                borderColor="#0A0E3C"
                height="40px"
                width="100%"
                fontSize="1.3em"
              >
                Excluir Usuário
              </Button>
            </Botao>
          </Botoes>
        </PerfilDireita>
      </Perfil>
      <Formularios>
        <Titulo>FORMULÁRIOS</Titulo>
        <Formulario>
          <DadosFormulario>
            <TituloFormulario
              textDecoration="underline"
              color="black"
              fontSize="1.5em"
            >
              Título do Formulário
            </TituloFormulario>
            <TituloFormulario color="#434B97" fontSize="1.2em">
              xx/xx/2022
            </TituloFormulario>
            <TituloFormulario color="#434B97" fontSize="1.2em">
              Tipo:
            </TituloFormulario>
            <TituloFormulario color="#434B97" fontSize="1.2em">
              Urgência <StarOutlined />
              <StarFilled />
              <StarFilled />
            </TituloFormulario>
          </DadosFormulario>
          <RespostaPendente>
            <Resposta>Resposta Pendente</Resposta>
            <Button
              backgroundColor="green"
              color="#0A0E3C"
              fontWeight="bold"
              borderColor="#0A0E3C"
              height="40px"
              width="100%"
            >
              ENVIAR LEMBRETE
            </Button>
          </RespostaPendente>
        </Formulario>
      </Formularios>
      <Receitas>
        <Titulo>RECEITAS</Titulo>
        <Receita>
          <DadosReceita>
            <TituloReceita
              textDecoration="underline"
              color="black"
              fontSize="1.5em"
            >
              Título
            </TituloReceita>
            <TituloReceita color="#434B97" fontSize="1.2em">
              xx/xx/2022
            </TituloReceita>
          </DadosReceita>
          <BotaoReceita>
            <Button
              backgroundColor="green"
              color="#0A0E3C"
              fontWeight="bold"
              borderColor="#0A0E3C"
              height="40px"
              width="100%"
            >
              DOWNLOAD
            </Button>
          </BotaoReceita>
        </Receita>
      </Receitas>
    </ContainerPerfil>
  );
}

export default PerfilPaciente;
