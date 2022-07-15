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
  Rotulo,
  RotuloColuna,
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
  const [erro, setErro] = useState(false);

  const [estado, setEstado] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [cpfMasked, setCpfMasked] = useState({});
  const [dataMasked, setDataMasked] = useState({});
  const [telMasked, setTelMasked] = useState({});

  const errors = {};
  const referenciaFormatacao = {
    cpf: false,
    telefone: false,
    cep: false,
  };

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const maskTelefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };
  const maskApenasNumeros = (value) => {
    return value.replace(/\D/g, "");
  };

  const maskData = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  const maskApenasLetras = (value) => {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
  };

  const maskCEP = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})(\d)/, "$1");
  };

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

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      atualizarDados();
    }
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
    const { name, value } = e.target;

    setEstado({ ...estado, [e.target.name]: e.target.value });

    if (name === "nome") {
      e.target.value = maskApenasLetras(value);
    }
    if (name === "cpf") {
      e.target.value = maskCPF(value);
    }
    if (name === "telefone") {
      e.target.value = maskTelefone(value);
    }

    if (name === "data_nascimento") {
      e.target.value = maskData(value);
    }
    if (
      (name === "cpf" && value.length < 14) ||
      (name === "telefone" && value.length < 15)
    ) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
  }

  function preenchendoEndereco(e) {
    const { name, value } = e.target;

    setEndereco({ ...endereco, [e.target.name]: e.target.value });

    if (name === "cep" && value.length <= 8) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    if (name === "cep") {
      e.target.value = maskCEP(value);
    }
    if (name === "pais") {
      e.target.value = maskApenasLetras(value);
    }
    if (name === "cidade") {
      e.target.value = maskApenasLetras(value);
    }
    if (name === "bairro") {
      e.target.value = maskApenasLetras(value);
    }
    if (name === "numero") {
      e.target.value = maskApenasNumeros(value);
    }
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
            backgroundColor={Cores.branco}
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
            marginTop="2%"
            onChange={preenchendoDados}
          ></Input>
          <RotuloColuna>
            <Input
              placeholder={cpfMasked}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="cpf"
              erro={erro.cpf}
              marginTop="2%"
              onChange={preenchendoDados}
            ></Input>
            {erro.cpf && (
              <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>
            )}
          </RotuloColuna>
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
            marginTop="2%"
            onChange={preenchendoDados}
          ></Input>
          <RotuloColuna>
            <Input
              placeholder={telMasked}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="telefone"
              erro={erro.telefone}
              marginTop="2%"
              onChange={preenchendoDados}
            ></Input>
            {erro.telefone && (
              <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
            )}
          </RotuloColuna>
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
            marginTop="2%"
            onChange={preenchendoDados}
          ></Input>
          <RotuloColuna>
            <Input
              placeholder={endereco.cep}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="cep"
              erro={erro.cep}
              marginTop="2%"
              onChange={preenchendoEndereco}
            ></Input>
            {erro.cep && <Rotulo>Digite um cep no formato xxxxx-xxx</Rotulo>}
          </RotuloColuna>
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
            marginTop="2%"
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
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.cidade}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="cidade"
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
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
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
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
            marginTop="2%"
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
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          {complemento === null ? (
            <Input
              placeholder="Complemento: "
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.preto}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="49%"
              name="complemento"
              marginTop="2%"
              onChange={preenchendoEndereco}
              onKeyPress={verificandoEnter}
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
              width="49%"
              name="complemento"
              marginTop="2%"
              onChange={preenchendoEndereco}
              onKeyPress={verificandoEnter}
            ></Input>
          )}
        </CaixaInputs>
        <CaixaBotao>
          <Button
            width="30%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            height="50px"
            color={Cores.branco}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            fontSize="1.5em"
            fontWeight="bold"
            marginTop="2%"
            onClick={() => atualizarDados()}
          >
            {carregando ? <Spin indicator={antIcon} /> : <>CONFIRMAR</>}
          </Button>
        </CaixaBotao>
      </ColunaDireita>
    </ContainerEditarPerfil>
  );
}
export default EditarPerfil;
