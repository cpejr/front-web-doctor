import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Body,
  DadosLogin,
  Botoes,
  BotoesAlternativos,
  Estetica,
  BarraEstetica,
  Logo,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService"
import { Cores } from "../../variaveis";
import AddToast from "../../components/AddToast/AddToast";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function entrar () {
    setCarregando(true);
    await managerService.requisicaoLogin(email, senha)
    setCarregando(false);
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
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.azul}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Senha"
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.azul}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          ></Input>
          <Button
            width="100%"
            height="50px"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
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
            color={Cores.azul}
            fontSize="1em"
            textDecoration="underline"
            height="50px"
            onClick={() => {
              history.push("/web/alterarsenha");
            }}
          >
            Esqueceu sua senha?
          </Button>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color={Cores.lilas[1]}
            fontSize="1em"
            textDecoration="underline"
            height="50px"
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
            borderColor={Cores.azul}
            color={Cores.azul}
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
            borderColor={Cores.azul}
            color={Cores.azul}
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
      <AddToast/>
    </div>
  );
}

export default Login;
