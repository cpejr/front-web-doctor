import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import {
  Body,
  DadosCadastro,
  Logo,
  InputMesmaLinha,
  InputMesmaLinha2,
  Botao,
} from "./Styles";

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
  const [estado, setEstado] = useState({});
  const [endereco, setEndereco] = useState({});
  const [estadoBack, setEstadoBack] = useState({});
  const [enderecoBack, setEnderecoBack] = useState({});
  const [carregando, setCarregando] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function requisicaoCadastro() {

    if (estado.senha === estado.senhaConfirmada) {
      setCarregando(true);
      await managerService.Cadastrando(estadoBack, enderecoBack);
      setCarregando(false);
    } else {
      alert("As senhas digitadas são diferentes.");
      setCarregando(false);
    }
  }

  function preenchendoDados(e) {
    setEstado({ ...estado, [e.target.name]: e.target.value });
    setEstadoBack({ ...estadoBack, [e.target.name]: e.target.value });

    if (e.target.name === "nome") {
      setEstado({ ...estado, [e.target.name]: maskApenasLetras(e.target.value)});
    }
    if (e.target.name === "telefone") {
      setEstado({ ...estado, [e.target.name]: maskTelefone(e.target.value) });
    }
    if (e.target.name === "data_nascimento") {
      setEstado({ ...estado, [e.target.name]: maskData(e.target.value) });
    }
    if (e.target.name === "cpf") {
      setEstado({ ...estado, [e.target.name]: maskCPF(e.target.value) });
    }
  }

  function preenchendoEndereco(e) {
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
          <Input
            placeholder="Nome Completo"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="nome"
            value={estado.nome}
            onChange={preenchendoDados}
          ></Input>
          <InputMesmaLinha>
            <Input
              placeholder="Telefone"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              fontSize="1em"
              marginTop="2%"
              width="48%"
              name="telefone"
              value={estado.telefone}
              onChange={preenchendoDados}
            ></Input>
            <Input
              placeholder="Data de Nascimento"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              fontSize="1em"
              width="48%"
              marginTop="2%"
              name="data_nascimento"
              value={estado.data_nascimento}
              onChange={preenchendoDados}
            ></Input>
          </InputMesmaLinha>
          <Input
            placeholder="CPF"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            name="cpf"
            value={estado.cpf}
            onChange={preenchendoDados}
          ></Input>
          <Input
            placeholder="Endereço de e-mail"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="email"
            onChange={preenchendoDados}
          ></Input>
          <Input
            placeholder="CEP"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cep"
            value={endereco.cep}
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder="País"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="pais"
            value={endereco.pais}
            onChange={preenchendoEndereco}
          ></Input>
          <Select
            id="estado"
            name="estado"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="#8D8D8D"
            width="100%"
            marginTop="2%"
            onChange={preenchendoEndereco}
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
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cidade"
            value={endereco.cidade}
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder="Bairro"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="bairro"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="rua"
            onChange={preenchendoEndereco}
          ></Input>
          <InputMesmaLinha2>
            <Input
              placeholder="Número"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              fontSize="1em"
              width="48%"
              name="numero"
              value={endereco.numero}
              onChange={preenchendoEndereco}
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
            borderColor="#151B57"
            color="black"
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senha"
            id="senha"
            type="password"
            onChange={preenchendoDados}
          ></Input>

          <Input
            placeholder="Confirme sua senha"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senhaConfirmada"
            id="senhaConfirmada"
            type="password"
            onChange={preenchendoDados}
          ></Input>

          <Select
            id="tipos"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="#8D8D8D"
            width="100%"
            name="tipo"
            onChange={preenchendoDados}
          >
            <option value="">Tipo de Usuário</option>
            <option value="SECRETARIA" borderColor="#151B57">
              Secretária
            </option>
            <option value="PACIENTE" borderColor="#151B57">
              Paciente
            </option>
          </Select>

          <Button
            height="50px"
            width="60%"
            backgroundColor="#434B97"
            borderColor="#151B57"
            color="white"
            fontSize="1.5em"
            fontWeight="bold"
            fontSizeMedia="1.2em"
            onClick={() => requisicaoCadastro()}
          >
            {carregando ? <Spin indicator={antIcon} /> : "CADASTRAR"}
          </Button>
        </DadosCadastro>
      </Body>
    </div>
  );
}

export default Cadastro;
