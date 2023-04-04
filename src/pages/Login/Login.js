import React, { useState } from "react";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";
import {
  Body,
  DadosLogin,
  Botoes,
  Logo,
  Rotulo,
  TituloInput
} from "./Styles";
import _ from "lodash";
import * as managerService from "../../services/ManagerService/managerService";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      entrar();
    }
  }

  const errors = {};
  const referenciaCamposNulos = {
    email: false,
    senha: false,
  };

  async function validacaoEmail(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(value)) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setEmail(value);
  }

  async function validacaoSenha(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    if (name === "senha" && value.length < 8) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setSenha(value);
  }

  async function entrar() {
    if (!email) errors.email = true;
    if (!senha) errors.senha = true;
    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, referenciaCamposNulos)) {
      setCarregando(true);
      const resposta = await managerService.GetDadosPessoais();
      let procurandoEmail = 0;
      let contandoForEach = 0;
      let quantidadeUsuarios = resposta.length;
      resposta.forEach((usuario) => {
        contandoForEach++;
        if (usuario.email === email) {
          procurandoEmail++;
        }
        if (quantidadeUsuarios === contandoForEach) {
          if (procurandoEmail === 0)
            toast.error("Esse email não está cadastrado.");
          else managerService.ConferirSenha(email, senha);
        }
      });

      await managerService.requisicaoLogin(email, senha);
      setCarregando(false);
    } else {
      setCarregando(true);
      toast.warn("Preencha todos os campos");
      setCarregando(false);
    }
  }

  return (
    <div>
      <Body>
        <DadosLogin>
          <Logo>
            <img
              src={logoGuilherme}
              className="logo"
              alt="logoGuilherme"
              width="100%"
              height="100%"
            ></img>
          </Logo>
          <TituloInput>Email:
          <Input
            placeholder="Email"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="0%"
            name="email"
            value={email}
            onChange={validacaoEmail}
            camposVazios={camposVazios.email}
            erro={erro.email}
          ></Input>
          </TituloInput>
          {erro.email && (
            <Rotulo>Digite um email no formato email@email.com</Rotulo>
          )}
          <TituloInput>Senha:
          <Input
            placeholder="Senha"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="0%"
            type="password"
            name="senha"
            value={senha}
            onChange={validacaoSenha}
            onKeyPress={verificandoEnter}
            camposVazios={camposVazios.senha}
            erro={erro.senha}
          ></Input>
          </TituloInput>
          {erro.senha && (
            <Rotulo>Digite uma senha com no minimo 8 digitos</Rotulo>
          )}
          <Button
            width="100%"
            height="50px"
            backgroundColor="#434B97"
            borderColor="#151B57"
            color="white"
            fontSize="1.5em"
            fontWeight="bold"
            fontSizeMedia="1.2em"
            onClick={() => entrar()}
          >
            {carregando ? <Spin indicator={antIcon} /> : <div>ENTRAR</div>}
          </Button>
        </DadosLogin>
        <Botoes>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="#151B57"
            fontSize="1em"
            textDecoration="underline"
            height="50px"
            onClick={() => {
              window.location.href="/alterarsenha_requisicao"
            }}
          >
            Esqueceu sua senha? Clique aqui para recuperá-la.
          </Button>
        </Botoes>
      </Body>
      <AddToast />
    </div>
  );
}

export default Login;
