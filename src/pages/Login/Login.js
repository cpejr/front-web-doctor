import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import api from "../../services/api";
import { login } from "../../services/auth";
import requisicaoErro from "../../utils/HttpErros";
import {
  Body,
  DadosLogin,
  Botoes,
  BotoesAlternativos,
  Estetica,
  BarraEstetica,
  Logo,
} from "./Styles";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function requisicaoLogin() {
    if (email.length === 0 || senha.length === 0) {
      alert("Preencha os campos email e senha!");
    } else {
      try {
        const resposta = await api.post("/login", {
          email,
          senha,
        });
        alert("Bem vindo")
        login(resposta.data.token, resposta.data.email)
        history.push("/");
      } catch (error) {
        setEmail("");
        setSenha("");
        requisicaoErro(error, () => history.push("/login"));
        alert(email,senha)
      }
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
          <Input
            placeholder="Email"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Senha"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          ></Input>
          <Button
            width="100%"
            height="50px"
            backgroundColor="#434B97"
            borderColor="#151B57"
            color="white"
            fontSize="1.5em"
            fontWeight="bold"
            fontSizeMedia="1.2em"
            onClick={() => requisicaoLogin()}
          >
            ENTRAR
          </Button>
        </DadosLogin>
        <Botoes>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="#151B57"
            fontSize="1em"
            textDecoration="underline"
            onClick={() => {
              history.push("/");
            }}
          >
            Esqueceu sua senha?
          </Button>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="#434B97"
            fontSize="1em"
            textDecoration="underline"
            onClick={() => {
              history.push("/cadastro");
            }}
          >
            Cadastre-se
          </Button>
        </Botoes>
        <Estetica>
          <BarraEstetica />
          ou
          <BarraEstetica />
        </Estetica>
        <BotoesAlternativos>
          <Button
            width="100%"
            height="50px"
            backgroundColor="green"
            borderColor="#151b57"
            color="#151b57"
            fontSize="1em"
            gap="1%"
            onClick={() => {
              history.push("/");
            }}
          >
            <FcGoogle />
            Continuar com o Google
          </Button>
          <Button
            width="100%"
            height="50px"
            backgroundColor="green"
            borderColor="#151b57"
            color="#151b57"
            fontSize="1em"
            gap="1%"
            onClick={() => {
              history.push("/");
            }}
          >
            <ImFacebook />
            Continuar com o Facebook
          </Button>
        </BotoesAlternativos>
      </Body>
    </div>
  );
}

export default Login;
