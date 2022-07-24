import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Spin, Switch } from "antd";
import { LoadingOutlined, bleLeftOutlined, RollbackOutlined } from "@ant-design/icons";
import { BiArrowBack } from "react-icons/bi";
import {
  Body,
  DadosCadastro,
  Logo,
  InputMesmaLinha,
  Rotulo,
  InputMesmaLinha2,
  Botao,
  RotuloColuna,
  PossuiConvenio,
  PossuiCuidador,
} from "./Styles";
import "react-toastify/dist/ReactToastify.min.css";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";
import { brParaPadrao } from "../../utils/date";

import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";

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
const maskApenasNumerosCpfTel = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{11})(\d)/, "$1");
};
const maskApenasNumerosCep = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{8})(\d)/, "$1");
};

const maskData = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

const maskDataBack = (value) => {
  return brParaPadrao(value);
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

function Cadastro() {
  const history = useHistory();

  const email = sessionStorage.getItem("@doctorapp-Email");

  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [erroDataBack, setErroDataBack] = useState(false);

  const [enderecoBack, setEnderecoBack] = useState({});
  const [estado, setEstado] = useState({});

  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [convenio, setConvenio] = useState(false);
  const [cuidador, setCuidador] = useState(false);

  const [verificacaoLogado, setVerificacaoLogado] = useState("");

  function funcaoConvenio() {
    setConvenio(!convenio);
    setUsuario({ ...usuario, convenio: null });
  }
  function funcaoCuidador() {
    setCuidador(!cuidador);
    setUsuario({ ...usuario, nome_cuidador: null, telefone_cuidador: null });
  }

  const errors = {};
  const teste = {
    tipo: false,
    nome: false,
    telefone: false,
    email: false,
    cep: false,
    pais: false,
    estado: false,
    cidade: false,
    rua: false,
    numero: false,
    cpf: false,
    data_nascimento: false,
    bairro: false,
    senha: false,
    senhaConfirmada: false,
  };

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      requisicaoCadastro();
    }
  }

  async function requisicaoCadastro() {
    if (!usuario.nome) errors.nome = true;
    if (!usuario.telefone) errors.telefone = true;
    if (!usuario.tipo) errors.tipo = true;
    if (!usuario.data_nascimento) errors.data_nascimento = true;
    if (!usuario.cpf) errors.cpf = true;
    if (!usuario.email) errors.email = true;
    if (!enderecoBack.cep) errors.cep = true;
    if (!enderecoBack.pais) errors.pais = true;
    if (!enderecoBack.estado) errors.estado = true;
    if (!enderecoBack.cidade) errors.cidade = true;
    if (!enderecoBack.bairro) errors.bairro = true;
    if (!enderecoBack.rua) errors.rua = true;
    if (!enderecoBack.numero) errors.numero = true;
    if (!usuario.senha) errors.senha = true;
    if (!usuario.senhaConfirmada) errors.senhaConfirmada = true;
    if (erro.data_nascimento === true) errors.data_nascimento = true;
    if (erro.email === true) errors.email = true;

    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, teste)) {
      if (usuario.senha === usuario.senhaConfirmada) {
        setCarregando(true);
        await managerService.Cadastrando(usuario, enderecoBack);
        setCarregando(false);
      } else {
        toast.error("As senhas digitadas são diferentes.");
        setCarregando(false);
      }
    } else {
      toast.error("Preencha todos os campos obrigatórios");
    }
  }

  async function validacaoEmail(e) {
    const { value, name } = e.target;
    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    }

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(value)) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setUsuario({ ...usuario, [name]: value });
  }

  async function validacaoData(e) {
    const { value, name } = e.target;
    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    }

    if (name === "data_nascimento" && value.length < 10) {
      setErro({ ...erro, [name]: true });
      setErroDataBack(false);
    } else if (maskDataBack(value) === "Data Invalida") {
      setErro({ ...erro, [name]: true });
      setErroDataBack(true);
    } else {
      setErro({ ...erro, [name]: false });
    }

    setEstado({ ...estado, [name]: maskData(value) });
    setUsuario({ ...usuario, [name]: maskDataBack(value) });
  }

  function preenchendoDados(e) {
    const { value, name } = e.target;
    if (
      name !== "convenio" &&
      name !== "nome_cuidador" &&
      name !== "telefone_cuidador"
    ) {
      if (value) setCamposVazios({ ...camposVazios, [name]: false });
    }
    if (name === "nome_cuidador") {
      e.target.value = maskApenasLetras(value);
    }
    if (name === "telefone_cuidador") {
      e.target.value = maskTelefone(value);
    }
    if (
      (name === "cpf" && value.length < 14) ||
      (name === "telefone" && value.length < 15) ||
      ((name === "senha" || name === "senhaConfirmada") && value.length < 8)
    ) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setUsuario({ ...usuario, [name]: value });
    setEstado({ ...estado, [name]: value });

    if (name === "nome") {
      setEstado({
        ...estado,
        [name]: maskApenasLetras(value),
      });
    }

    if (name === "telefone") {
      setEstado({ ...estado, [name]: maskTelefone(value) });
      setUsuario({ ...usuario, [name]: maskApenasNumerosCpfTel(value) });
    }
    if (name === "telefone_cuidador") {
      setEstado({ ...estado, [name]: maskTelefone(value) });
      setUsuario({ ...usuario, [name]: maskApenasNumerosCpfTel(value) });
    }
    if (name === "cpf") {
      setEstado({ ...estado, [name]: maskCPF(value) });
      setUsuario({ ...usuario, [name]: maskApenasNumerosCpfTel(value) });
    }
    if (name === "tipo") {
      setUsuario({
        ...usuario,
        [name]: value,
        nome_cuidador: null,
        telefone_cuidador: null,
        convenio: null,
      });
      setConvenio(false);
      setCuidador(false);
    }
  }

  async function pegandoDadosPerfilPessoal() {
    const resposta = await managerService.GetDadosUsuario(email);
    setVerificacaoLogado(resposta.dadosUsuario.tipo);
  }

  useEffect(() => {
    pegandoDadosPerfilPessoal();
  }, []);

  async function voltarLoginOuHome() {
    if (verificacaoLogado === "SECRETARIA(O)") {
      history.push("/web/homesecretaria");
    } else {
      if (verificacaoLogado === "MASTER") {
        history.push("/web/homemedico");
      } else {
        history.push("/login");
      }
    }
  }

  function preenchendoEndereco(e) {
    const { value, name } = e.target;
    if (name !== "complemento") {
      if (value) setCamposVazios({ ...camposVazios, [name]: false });
    }

    if (name === "cep" && value.length <= 8) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
    setEndereco({ ...endereco, [name]: value });
    setEnderecoBack({ ...enderecoBack, [name]: value });

    if (name === "cep") {
      setEndereco({ ...endereco, [name]: maskCEP(value) });
      setEnderecoBack({
        ...enderecoBack,
        [name]: maskApenasNumerosCep(value),
      });
    }
    if (name === "pais") {
      setEndereco({
        ...endereco,
        [name]: maskApenasLetras(value),
      });
    }
    if (name === "cidade") {
      setEndereco({
        ...endereco,
        [name]: maskApenasLetras(value),
      });
    }
    if (name === "numero") {
      setEndereco({
        ...endereco,
        [name]: maskApenasNumeros(value),
      });
    }
  }

  return (
    <div>
      <Body>
        <DadosCadastro>
          <Logo>
            <img
              src={logoGuilherme}
              className="logo"
              alt="logoGuilherme"
              width="100%"
              height="100%"
            ></img>
          </Logo>
          <Botao onClick={() => voltarLoginOuHome()}>
            <BiArrowBack/> Voltar
          </Botao>
          <Select
            id="tipos"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            name="tipo"
            onChange={preenchendoDados}
            camposVazios={camposVazios.tipo}
          >
            <option value="">Tipo de Usuário</option>
            <option value="SECRETARIA(O)" borderColor={Cores.azul}>
              Secretária(o)
            </option>
            <option value="PACIENTE" borderColor={Cores.azul}>
              Paciente
            </option>
          </Select>
          <Input
            placeholder="Nome Completo"
            status="error"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="nome"
            value={estado.nome}
            onChange={preenchendoDados}
            erro={erro.nome}
            camposVazios={camposVazios.nome}
          ></Input>
          <InputMesmaLinha>
            <RotuloColuna>
              <Input
                placeholder="Telefone"
                backgroundColor={Cores.cinza[7]}
                color={Cores.preto}
                fontSize="1em"
                marginTop="2%"
                width="100%"
                name="telefone"
                value={estado.telefone}
                onChange={preenchendoDados}
                onKeyPress={verificandoEnter}
                erro={erro.telefone}
                camposVazios={camposVazios.telefone}
              ></Input>
              {erro.telefone && (
                <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
              )}
            </RotuloColuna>
            <RotuloColuna>
              <Input
                placeholder="Data de Nascimento"
                backgroundColor={Cores.cinza[7]}
                color={Cores.preto}
                fontSize="1em"
                width="100%"
                marginTop="2%"
                name="data_nascimento"
                value={estado.data_nascimento}
                onChange={validacaoData}
                erro={erro.data_nascimento}
                camposVazios={camposVazios.data_nascimento}
              ></Input>

              {erro.data_nascimento && (
                <>
                  {erroDataBack ? (
                    <Rotulo>Digite uma data válida.</Rotulo>
                  ) : (
                    <Rotulo>Digite uma data no formato xx/xx/xxxx</Rotulo>
                  )}
                </>
              )}
            </RotuloColuna>
          </InputMesmaLinha>

          <Input
            placeholder="CPF"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            name="cpf"
            value={estado.cpf}
            onChange={preenchendoDados}
            erro={erro.cpf}
            camposVazios={camposVazios.cpf}
          ></Input>
          {erro.cpf && <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>}
          <Input
            placeholder="Endereço de e-mail"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="email"
            onChange={validacaoEmail}
            erro={erro.email}
            camposVazios={camposVazios.email}
          ></Input>
          {erro.email && (
            <Rotulo>Digite um email no formato email@email.com</Rotulo>
          )}

          {usuario.tipo === "PACIENTE" && (
            <>
              <PossuiConvenio>
                {" "}
                Possui Convênio?
                <Switch onChange={funcaoConvenio}></Switch>
              </PossuiConvenio>
              {convenio && (
                <Input
                  placeholder="Nome do Convênio"
                  backgroundColor={Cores.cinza[7]}
                  borderColor={Cores.azul}
                  color={Cores.preto}
                  fontSize="1em"
                  width="100%"
                  marginTop="2%"
                  name="convenio"
                  onChange={preenchendoDados}
                ></Input>
              )}

              <PossuiCuidador>
                {" "}
                Possui Cuidador?<Switch onChange={funcaoCuidador}></Switch>
              </PossuiCuidador>

              {cuidador && (
                <>
                  <Input
                    placeholder="Nome Cuidador"
                    backgroundColor={Cores.cinza[7]}
                    borderColor={Cores.azul}
                    color={Cores.preto}
                    fontSize="1em"
                    width="100%"
                    marginTop="2%"
                    name="nome_cuidador"
                    onChange={preenchendoDados}
                  ></Input>
                  <Input
                    placeholder="Telefone Cuidador"
                    backgroundColor={Cores.cinza[7]}
                    borderColor={Cores.azul}
                    color={Cores.preto}
                    fontSize="1em"
                    width="100%"
                    marginTop="2%"
                    name="telefone_cuidador"
                    onChange={preenchendoDados}
                  ></Input>
                </>
              )}
            </>
          )}

          <Input
            placeholder="CEP"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cep"
            value={endereco.cep}
            onChange={preenchendoEndereco}
            erro={erro.cep}
            camposVazios={camposVazios.cep}
          ></Input>
          {erro.cep && <Rotulo>Digite um CEP no formato xx.xxx-xxx</Rotulo>}
          <Input
            placeholder="País"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="pais"
            value={endereco.pais}
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.pais}
          ></Input>
          <Select
            id="estado"
            name="estado"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            marginTop="2%"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.estado}
          >
            <option value="">Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
          </Select>
          <Input
            placeholder="Cidade"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cidade"
            value={endereco.cidade}
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.cidade}
          ></Input>
          <Input
            placeholder="Bairro"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="bairro"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.bairro}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="rua"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.rua}
          ></Input>
          <InputMesmaLinha2>
            <Input
              placeholder="Número"
              backgroundColor={Cores.cinza[7]}
              color={Cores.preto}
              fontSize="1em"
              width="48%"
              name="numero"
              value={endereco.numero}
              onChange={preenchendoEndereco}
              camposVazios={camposVazios.numero}
            ></Input>
            <Input
              placeholder="Complemento"
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              width="48%"
              marginTop="2%"
              name="complemento"
              onChange={preenchendoEndereco}
            ></Input>
          </InputMesmaLinha2>

          <Input
            placeholder="Defina sua senha"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senha"
            id="senha"
            type="password"
            onChange={preenchendoDados}
            erro={erro.senha}
            camposVazios={camposVazios.senha}
          ></Input>
          {erro.senha && <Rotulo>A senha deve ter no minimo 8 digitos</Rotulo>}
          <Input
            placeholder="Confirme sua senha"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senhaConfirmada"
            id="senhaConfirmada"
            type="password"
            onChange={preenchendoDados}
            onKeyPress={verificandoEnter}
            erro={erro.senhaConfirmada}
            camposVazios={camposVazios.senhaConfirmada}
          ></Input>
          {erro.senhaConfirmada && (
            <Rotulo>A senha deve ter no minimo 8 digitos</Rotulo>
          )}

          <Button
            height="50px"
            width="60%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
            fontSize="1.5em"
            fontSizeMedia="1.2em"
            onClick={() => requisicaoCadastro()}
            fontWeight="bold"
          >
            {carregando ? <Spin indicator={antIcon} /> : "CADASTRAR"}
          </Button>
        </DadosCadastro>
      </Body>
      <AddToast />
    </div>
  );
}

export default Cadastro;
