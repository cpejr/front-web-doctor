import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import api from "../../services/api";
import {
  Body,
  BoardCima,
  FotoNomeData,
  FotoPerfil,
  Nome,
  DataNascimento,
  BotoesColuna,
  NomeData,
  BoardBaixo,
  BoardEsquerda,
  EnderecoContato,
  DadosEndereco,
  Rua,
  Complemento,
  RuaNumeroComplemento,
  BoardDireita,
  DadosContato,
  ExcluirConta,
  ContatoExcluirConta,
} from "./Styles";

function Perfil() {
  const history = useHistory();
  const usuarioId = sessionStorage.getItem("@doctorapp-UserId")
  const[usuario, setUsuario] = useState({});
  const[endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");

    useEffect(() => {
      api.get(`/usuarios/${usuarioId}`).then((res) => {
        setUsuario(res.data)
        setTelefone(res.data.telefone)
        api.get(`/enderecos/${res.data.id_endereco}`).then((res) => {
          setEndereco(res.data)
        })
      })
    },[]);
    
    

  return (
    <div>
      <Body>
        <BoardCima>
          <FotoNomeData>
            <FotoPerfil>
              <img
                src={logoGuilherme}
                className="logo"
                alt="logoGuilherme"
                width="100%"
                height="100%"
              ></img>
            </FotoPerfil>
            <NomeData>
              <Nome>{usuario.nome}</Nome>
              <DataNascimento>{usuario.data}</DataNascimento>
            </NomeData>
          </FotoNomeData>
          <BotoesColuna>
            <Button
              width="100%"
              widthMedia480="30%"
              heightMedia560="30px"
              backgroundColor="#A7ADE8"
              borderColor="#0A0E3C"
              color="#0A0E3C"
              fontSize="1em"
              fontSizeMedia="0.6em"
              fontSizeMedia950="0.7em"
              fontWeight="bold"
              boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              onClick={() => history.push("/web/editarperfil")}
            >
              ALTERAR DADOS
            </Button>
            <Button
              width="100%"
              widthMedia480="30%"
              heightMedia560="30px"
              backgroundColor="#A7ADE8"
              borderColor="#0A0E3C"
              color="#0A0E3C"
              fontSize="1em"
              fontSizeMedia="0.6em"
              fontSizeMedia950="0.7em"
              fontWeight="bold"
              boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              onClick={() => history.push("/web/alterarsenha")}
            >
              ALTERAR SENHA
            </Button>
          </BotoesColuna>
        </BoardCima>

        <BoardBaixo>
          <BoardEsquerda>
            <EnderecoContato>Endereço</EnderecoContato>
            <DadosEndereco>{endereco.pais}</DadosEndereco>
            <DadosEndereco>{endereco.cep}</DadosEndereco>
            <DadosEndereco>{endereco.estado}</DadosEndereco>
            <DadosEndereco>{endereco.cidade}</DadosEndereco>
            <DadosEndereco>{endereco.bairro}</DadosEndereco>
            <RuaNumeroComplemento>
              <Rua>{endereco.rua}  {endereco.numero}</Rua>
              <Complemento>{endereco.complemento}</Complemento>
            </RuaNumeroComplemento>
          </BoardEsquerda>

          <ContatoExcluirConta>
            <BoardDireita>
              <EnderecoContato>Contato</EnderecoContato>
              <DadosContato>({telefone.slice(0,-9)}) {telefone.slice(2,-4)}-{telefone.slice(-4)}</DadosContato>
              <DadosContato>{usuario.email}</DadosContato>
            </BoardDireita>
            <ExcluirConta onClick={() => history.push("/web/homemedico")}>
              EXCLUIR CONTA
            </ExcluirConta>
          </ContatoExcluirConta>
        </BoardBaixo>
      </Body>
    </div>
  );
}

export default Perfil;
