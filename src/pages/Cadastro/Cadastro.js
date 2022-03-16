import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import {
  Body,
  DadosCadastro,
  Logo,
  InputMesmaLinha,
  BotoesMesmaLinha,
} from "./Styles";

function Cadastro() {
  const history = useHistory();
  // const [nome, setNome] = useState();
  // const [telefone, setTelefone] = useState();
  // const [dataNascimento, setDataNascimento] = useState();
  // const [email, setEmail] = useState();
  // const [cep, setCep] = useState();
  // const [pais, setPais] = useState();
  // const [estado, setEstado] = useState();
  // const [cidade, setCidade] = useState();
  // const [rua, setRua] = useState();
  // const [numero, setNumero] = useState();
  // const [complemento, setComplemento] = useState();
  // const [senha, setSenha] = useState();
  // const [confirmarSenha, setConfirmarSenha] = useState();
  // const [tipo, setTipo] = useState();
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
          <Input
            placeholder="Nome Completo"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={nome}
            // onChange={(e) => setNome(e.target.value)}
          ></Input>
          <InputMesmaLinha>
            <Input
              placeholder="Telefone"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              width="48%"
              // value={telefone}
              // onChange={(e) => setTelefone(e.target.value)}
            ></Input>
            <Input
              placeholder="Data de Nascimento"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              width="48%"
              // value={dataNascimento}
              // onChange={(e) => setDataNascimento(e.target.value)}
            ></Input>
          </InputMesmaLinha>
          <Input
            placeholder="Endereço de e-mail"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="CEP"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={cep}
            // onChange={(e) => setCep(e.target.value)}
          ></Input>
          <Input
            placeholder="País"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={pais}
            // onChange={(e) => setPais(e.target.value)}
          ></Input>
          <Input
            placeholder="Estado"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={estado}
            // onChange={(e) => setEstado(e.target.value)}
          ></Input>
          <Input
            placeholder="Cidade"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={cidade}
            // onChange={(e) => setCidade(e.target.value)}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={rua}
            // onChange={(e) => setRua(e.target.value)}
          ></Input>
          <Input
            placeholder="Número"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={numero}
            // onChange={(e) => setNumero(e.target.value)}
          ></Input>
          <Input
            placeholder="Complemento"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={complemento}
            // onChange={(e) => setComplemento(e.target.value)}
          ></Input>
          <Input
            placeholder="Defina sua senha"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={senha}
            // onChange={(e) => setSenha(e.target.value)}
          ></Input>
          <Input
            placeholder="Confirme sua senha"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            // value={senha}
            // onChange={(e) => setSenha(e.target.value)}
          ></Input>
          <Select
            id="tipos"
            name="tipos"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="#8D8D8D"
            width="100%"
            // value={senha}
            // onChange={(e) => setSenha(e.target.value)}
          >
            <option value="">Tipo de Usuário</option>
            <option value="secretaria" borderColor="#151B57" >Secretária</option>
            <option value="paciente" borderColor="#151B57">Paciente</option>
          </Select>
          <BotoesMesmaLinha>
            <Button
              width="42%"
              backgroundColor="#FFFFFF"
              borderColor="rgba(255, 0, 0, 0.25)"
              color="#8D8D8D"
              fontSize="1.5em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={() => history.push("/login")}
            >
              CANCELAR
            </Button>
            <Button
              width="42%"
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
          </BotoesMesmaLinha>
        </DadosCadastro>
      </Body>
    </div>
  );
}

export default Cadastro;
