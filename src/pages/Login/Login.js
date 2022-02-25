import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
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
  // const [email, setEmail] = useState();
  // const [senha, setSenha] = useState();
  return (
    <div>
      <Body>
        <DadosLogin>
          <Logo>
            <img
              src={logoGuilherme}
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
            width="100%"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Senha"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={senha}
            // onChange={(e) => setSenha(e.target.value)}
          ></Input>
          <Button
            width="100%"
            backgroundColor="#434B97"
            borderColor="#151B57"
            color="white"
            fontSize="1.5em"
            fontWeight="bold"
            fontSizeMedia="1.2em"
            onClick={() => history.push("/home")}
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
              history.push("/");
            }}
          >
            Cadastre-se
          </Button>
        </Botoes>
        <Estetica>
          <BarraEstetica> </BarraEstetica>
          ou
          <BarraEstetica> </BarraEstetica>
        </Estetica>
        <BotoesAlternativos>
          <Button
            width="100%"
            backgroundColor="green"
            borderColor="#151b57"
            color="#151b57"
            fontSize="1em"
            gap="1%"
            onClick={() => {
              history.push("/");
            }}
          >
            <FcGoogle></FcGoogle>Continuar com o Google
          </Button>
          <Button
            width="100%"
            backgroundColor="green"
            borderColor="#151b57"
            color="#151b57"
            fontSize="1em"
            gap="1%"
            onClick={() => {
              history.push("/");
            }}
          >
            <ImFacebook></ImFacebook>Continuar com o Facebook
          </Button>
        </BotoesAlternativos>
      </Body>
    </div>
  );
}

export default Login;
