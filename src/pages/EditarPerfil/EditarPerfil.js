import React, { useEffect, useState } from "react";
import {
  ContainerEditarPerfil,
  ColunaEsquerda,
  ColunaDireita,
  AlterarDados,
  CaixaInputs,
  CaixaBotao,
  ImagemPerfil,
  BlocoSuperior,
  BlocoInferior,
  BotaoData,
} from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { useHistory } from "react-router-dom";
import * as managerService from "../../services/ManagerService/managerService";

function EditarPerfil() {
  const history = useHistory();

  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [testeTelefone, setTesteTelefone] = useState(false);
  const [testeData, setTesteData] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [estado, setEstado] = useState({});

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(email);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setCarregando(false);
  }

  async function atualizarDados() {
    setCarregando(true);
    await managerService.UpdateDadosUsuario(usuario.id,endereco.id, endereco, estado);
    setCarregando(false);
  }
  function preenchendoDados(e) {
    setEstado({ ...estado, [e.target.name]: e.target.value });
  }

  function preenchendoEndereco(e) {
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
  }

  

  useEffect(() => {
    pegandoDados();
  }, []);

  return (
    <ContainerEditarPerfil>
      <ColunaEsquerda>
        <BlocoSuperior>
          <ImagemPerfil>
            <img
              src={fotoPerfil}
              className="fotoPerfil"
              alt="fotoPerfil"
              width="100%"
              height="90%"
            ></img>
          </ImagemPerfil>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="#151B57"
            fontSize="1em"
            textDecoration="underline"
            height="10px"
            onClick={() => {}}
          >
            Alterar Foto de Perfil
          </Button>
        </BlocoSuperior>
        <BlocoInferior>
          <Button
            width="100%"
            backgroundColor="#A7ADE8"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            height="50px"
            borderColor="#151B57"
            color="#151B57"
            onClick={() => {
              history.push("/web/alterarsenha");
            }}
          >
            ALTERAR SENHA
          </Button>
          <Button
            width="100%"
            backgroundColor="white"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderColor="#DD0D0D"
            height="50px"
            color="#DD0D0D"
            onClick={() => {
              history.push("/web/perfil");
            }}
          >
            CANCELAR
          </Button>
        </BlocoInferior>
      </ColunaEsquerda>
      <ColunaDireita>
        <AlterarDados>Alterar Dados:</AlterarDados>
        <CaixaInputs>
          <Input
            placeholder={usuario.nome}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoDados}
          ></Input>
          <Input
            placeholder={usuario.cpf}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoDados}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={usuario.email}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoDados}
          ></Input>
          {testeTelefone ? (
            <Input
              backgroundColor="#E4E6F4"
              borderColor="black"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color="black"
              fontSize="1em"
              width="50%"
              onChange={preenchendoDados}
            ></Input>
          ) : (
            <BotaoData
              backgroundColor="#E4E6F4"
              borderColor="black"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color="black"
              fontSize="1em"
              width="50%"
              onClick={() => setTesteTelefone(true)}
            >
              ({telefone.slice(0, -9)}) {telefone.slice(2, -4)}-
              {telefone.slice(-4)}
            </BotaoData>
          )}
        </CaixaInputs>
        <CaixaInputs>
          {testeData ? (
            <Input
              backgroundColor="#E4E6F4"
              borderColor="black"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color="black"
              fontSize="1em"
              width="50%"
              onChange={preenchendoDados}
            ></Input>
          ) : (
            <BotaoData
              backgroundColor="#E4E6F4"
              borderColor="black"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color="black"
              fontSize="1em"
              width="50%"
              onClick={() => setTesteData(true)}
            >
              {dataNascimento.slice(8, -14)}/{dataNascimento.slice(5, -17)}/
              {dataNascimento.slice(0, -20)}
            </BotaoData>
          )}

          <Input
            placeholder={endereco.cep}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.pais}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.estado}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.bairro}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.complemento}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.rua}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.numero}
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaBotao>
          <Button
            width="30%"
            backgroundColor="#434B97"
            borderColor="#151B57"
            height="50px"
            color="white"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            onClick={() => atualizarDados()}
          >
            CONFIRMAR
          </Button>
        </CaixaBotao>
      </ColunaDireita>
    </ContainerEditarPerfil>
  );
}
export default EditarPerfil;
