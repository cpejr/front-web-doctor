import React, { useState } from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";

function Login() {
  const history = useHistory();
  // const [email, setEmail] = useState();
  // const [senha, setSenha] = useState();

  const Body = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 1%;

    @media (max-width: 1100px) {
      margin-top: 35%;
    }
  `;
  const DadosLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 41%;
    @media (max-width: 1100px) {
      width: 70%;
    }
  `;
  const Botoes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10%;
    padding-right: 10%;
    font-size: 1em;
  `;
  const BotoesAlternativos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 42%;
    @media (max-width: 1100px) {
      width: 72%;
    }
    @media (max-width: 360px) {
      font-size:0.8em;
    }
  `;
  const Estetica = styled.div`
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    color: #151b57;
    align-items: center;
    justify-content: space-between;
    gap: 5%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1em;
    padding-left: 1%;
    padding-right: 1%;
  `;
  const BarraEstetica = styled.div`
    color: #151b57;
    background-color: #151b57;
    height: 1px;
    width: 27vw;
  `;
  const Logo = styled.div`
    align-items: center;
    justify-content: center;

    @media (max-width: 1100px) {
      width: 100px;
      height: 100px;
    }
  `;

  return (
    <div>
      <Body>
        <Logo>
          <img
            src={logoGuilherme}
            alt="logoGuilherme"
            width="100%"
            height="100%"
          ></img>
        </Logo>
        <DadosLogin>
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
            width="103%"
            backgroundColor="#434B97"
            borderColor="#151B57"
            color="white"
            fontSize="1.5em"
            fontWeight="bold"
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
