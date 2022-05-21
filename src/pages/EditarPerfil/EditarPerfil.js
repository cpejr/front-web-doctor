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
} from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";

function EditarPerfil() {
  const history = useHistory();

  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [estado, setEstado] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [cpfMasked, setCpfMasked] = useState({});
  const [dataMasked, setDataMasked] = useState({});
  const [telMasked, setTelMasked] = useState({});

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(email);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setComplemento(resposta.dadosEndereco.complemento);
    setCarregando(false);
  }
  
  useEffect(() => {
    setCpfMasked(
      cpf.slice(+0, -8) +
        "." +
        cpf.slice(+3, -5) +
        "." +
        cpf.slice(+6, -2) +
        "-" +
        cpf.slice(-2)
    );
  }, [cpf]);
  useEffect(() => {
    setTelMasked(
      "(" +
        telefone.slice(0, -9) +
        ")" +
        telefone.slice(2, -4) +
        "-" +
        telefone.slice(-4)
    );
  }, [telefone]);
  useEffect(() => {
    setDataMasked(
      dataNascimento.slice(8, -14) +
        "/" +
        dataNascimento.slice(5, -17) +
        "/" +
        dataNascimento.slice(0, -20)
    );
  }, [dataNascimento]);

  async function atualizarDados() {
    setCarregando(true);
    await managerService.UpdateDadosUsuario(
      usuario.id,
      endereco.id,
      endereco,
      estado
    );
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
            color="green"
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
            backgroundColor={Cores.lilas[2]}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            height="50px"
            borderColor={Cores.azul}
            color={Cores.azul}
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
            borderColor={Cores.vermelho}
            height="50px"
            color={Cores.vermelho}
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
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="nome"
            onChange={preenchendoDados}
          ></Input>
          <Input
            placeholder={cpfMasked}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="cpf"
            onChange={preenchendoDados}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={usuario.email}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="email"
            onChange={preenchendoDados}
          ></Input>

          <Input
            placeholder={telMasked}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="telefone"
            onChange={preenchendoDados}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={dataMasked}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="data_nascimento"
            onChange={preenchendoDados}
          ></Input>

          <Input
            placeholder={endereco.cep}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="cep"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.pais}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="pais"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.estado}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="estado"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.bairro}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="bairro"
            onChange={preenchendoEndereco}
          ></Input>
          {complemento === null ? (
            <Input
              placeholder="Complemento: "
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.preto}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="50%"
              name="complemento"
              onChange={preenchendoEndereco}
            ></Input>
          ) : (
            <Input
              placeholder={complemento}
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.preto}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="50%"
              name="complemento"
              onChange={preenchendoEndereco}
            ></Input>
          )}
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.rua}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="rua"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.numero}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="numero"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaBotao>
          <Button
            width="30%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            height="50px"
            color="white"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            onClick={() => atualizarDados()}
          >
            {carregando ? <Spin indicator={antIcon} /> : <p>CONFIRMAR</p>}
          </Button>
        </CaixaBotao>
      </ColunaDireita>
    </ContainerEditarPerfil>
  );
}
export default EditarPerfil;
