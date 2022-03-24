import React from "react";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import {
  Body,
  BoardCima,
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
  return (
    <div>
      <Body>
        <BoardCima>
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
            <Nome> Nome Nome de nome</Nome>
            <DataNascimento>12/12/2001</DataNascimento>
          </NomeData>
          <BotoesColuna>
            <Button
              width="100%"
              backgroundColor="#A7ADE8"
              borderColor="#0A0E3C"
              color="#0A0E3C"
              fontSize="1em"
              fontWeight="bold"
            >
              ALTERAR DADOS
            </Button>
            <Button
              width="100%"
              backgroundColor="#A7ADE8"
              borderColor="#0A0E3C"
              color="#0A0E3C"
              fontSize="1em"
              fontWeight="bold"
            >
              ALTERAR SENHA
            </Button>
          </BotoesColuna>
        </BoardCima>
        
        <BoardBaixo>
          <BoardEsquerda>
            <EnderecoContato>Endereço</EnderecoContato>
            <DadosEndereco>País</DadosEndereco>
            <DadosEndereco>CEP</DadosEndereco>
            <DadosEndereco>Estado</DadosEndereco>
            <DadosEndereco>Cidade</DadosEndereco>
            <DadosEndereco>Bairro</DadosEndereco>
            <RuaNumeroComplemento>
              <Rua>Rua Lorem Ipsum is simply 999</Rua>
              <Complemento>apto 999</Complemento>
            </RuaNumeroComplemento>
          </BoardEsquerda>
          <ContatoExcluirConta>
          <BoardDireita>
            <EnderecoContato>Contato</EnderecoContato>
            <DadosContato>(31) 99999-9999</DadosContato>
            <DadosContato>nomenomedenome@gmail.com</DadosContato>
          </BoardDireita>
          <ExcluirConta>EXCLUIR CONTA</ExcluirConta>
        </ContatoExcluirConta>
        </BoardBaixo>
      </Body>
    </div>
  );
}

export default Perfil;
