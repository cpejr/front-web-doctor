import React, { useState } from "react";
import _ from "lodash";
import { isEqual } from "lodash";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Spin } from "antd";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Body,
  DadosCadastro,
  Logo,
  InputMesmaLinha,
  Rotulo,
  InputMesmaLinha2,
  Botao,
  RotuloColuna,
} from "./Styles";
import "react-toastify/dist/ReactToastify.min.css";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";

import * as managerService from "../../services/ManagerService/managerService";

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

function Cadastro() {
  const history = useHistory();

  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);

  const [enderecoBack, setEnderecoBack] = useState({});
  const [estado, setEstado] = useState({});
  const [estadoBack, setEstadoBack] = useState({});

  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
    if (!regEx.test(e.target.value)) {
      setErro({ ...erro, [e.target.name]: true });
    } else {
      setErro({ ...erro, [e.target.name]: false });
    }

    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function preenchendoDados(e) {
    const { value, name } = e.target;
    if (value) setCamposVazios({ ...camposVazios, [name]: false });

    if (
      (name === "cpf" && value.length < 14) ||
      (name === "telefone" && value.length < 15) ||
      (name === "data_nascimento" && value.length < 10) ||
      ((name === "senha" || name === "senhaConfirmada") && value.length < 8)
    ) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setUsuario({ ...usuario, [name]: value });
    setEstado({ ...estado, [e.target.name]: e.target.value });

    if (e.target.name === "nome") {
      setEstado({
        ...estado,
        [e.target.name]: maskApenasLetras(e.target.value),
      });
    }
    if (e.target.name === "telefone") {
      setEstado({ ...estado, [e.target.name]: maskTelefone(e.target.value) });
    }
    if (e.target.name === "data_nascimento") {
      setEstado({ ...estado, [e.target.name]: maskData(e.target.value) });
      setEstadoBack({ ...estadoBack, [e.target.name]: maskData(e.target.value) });
    }
    if (e.target.name === "cpf") {
      setEstado({ ...estado, [e.target.name]: maskCPF(e.target.value) });
    }
  }

  function preenchendoEndereco(e) {
    const { value, name } = e.target;
    if (value) setCamposVazios({ ...camposVazios, [name]: false });

    if (name === "cep" && value.length <= 8) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
    setEnderecoBack({ ...enderecoBack, [e.target.name]: e.target.value });

    if (e.target.name === "cep") {
      setEndereco({ ...endereco, [e.target.name]: maskCEP(e.target.value) });
    }
    if (e.target.name === "pais") {
      setEndereco({
        ...endereco,
        [e.target.name]: maskApenasLetras(e.target.value),
      });
    }
    if (e.target.name === "cidade") {
      setEndereco({
        ...endereco,
        [e.target.name]: maskApenasLetras(e.target.value),
      });
    }
    if (e.target.name === "numero") {
      setEndereco({
        ...endereco,
        [e.target.name]: maskApenasNumeros(e.target.value),
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
          <Botao onClick={() => history.push("/login")}>
            <LeftOutlined /> Voltar para login
          </Botao>
          <Select
            id="tipos"
            backgroundColor="#E4E6F4"
            color="#8D8D8D"
            width="100%"
            name="tipo"
            onChange={preenchendoDados}
            camposVazios={camposVazios.tipo}
          >
            <option value="">Tipo de Usuário</option>
            <option value="SECRETARIA" borderColor="#151B57">
              Secretária
            </option>
            <option value="PACIENTE" borderColor="#151B57">
              Paciente
            </option>
          </Select>
          <Input
            placeholder="Nome Completo"
            status="error"
            backgroundColor="#E4E6F4"
            color="black"
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
                backgroundColor="#E4E6F4"
                color="black"
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
                backgroundColor="#E4E6F4"
                color="#807D7D"
                fontSize="1em"
                width="100%"
                marginTop="2%"
                name="data_nascimento"
                value={estado.data_nascimento}
                onChange={preenchendoDados}
                erro={erro.data_nascimento}
                camposVazios={camposVazios.dataNascimento}
              ></Input>

              {erro.data_nascimento && (
                <Rotulo>Digite uma data no formato xx/xx/xxxx</Rotulo>
              )}
            </RotuloColuna>
          </InputMesmaLinha>

          <Input
            placeholder="CPF"
            backgroundColor="#E4E6F4"
            color="black"
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
            backgroundColor="#E4E6F4"
            color="black"
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
          <Input
            placeholder="CEP"
            backgroundColor="#E4E6F4"
            color="black"
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
            backgroundColor="#E4E6F4"
            color="black"
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
            backgroundColor="#E4E6F4"
            color="#8D8D8D"
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
            backgroundColor="#E4E6F4"
            color="black"
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
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="bairro"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.bairro}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor="#E4E6F4"
            color="black"
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
              backgroundColor="#E4E6F4"
              color="black"
              fontSize="1em"
              width="48%"
              name="numero"
              value={endereco.numero}
              onChange={preenchendoEndereco}
              camposVazios={camposVazios.numero}
            ></Input>
            <Input
              placeholder="Complemento"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              fontSize="1em"
              width="48%"
              marginTop="2%"
              name="complemento"
              onChange={preenchendoEndereco}
            ></Input>
          </InputMesmaLinha2>

          <Input
            placeholder="Defina sua senha"
            backgroundColor="#E4E6F4"
            color="black"
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
            backgroundColor="#E4E6F4"
            color="black"
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
            backgroundColor="#434B97"
            borderColor="#151B57"
            color="white"
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
