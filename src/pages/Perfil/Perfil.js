import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import api from "../../services/api";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Conteudo,
  CaixaCima,
  FotoNomeData,
  FotoPerfil,
  Nome,
  DataNascimento,
  BotoesColuna,
  NomeData,
  CaixaBaixo,
  CaixaEndereco,
  EnderecoContato,
  DadosEndereco,
  Rua,
  Complemento,
  RuaNumeroComplemento,
  CaixaContato,
  DadosContato,
  ExcluirConta,
  ContatoExcluirConta,
  CaixaCimaCarregando,
  CaixaEnderecoCarregando,
} from "./Styles";

function Perfil() {
  const history = useHistory();
  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [carregando, setCarregando] = useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 45, color: "#151B57" }} spin />;

  useEffect(() => {
    api.get(`/usuarios/${email}`).then((res) => {
      setUsuario(res.data);
      setTelefone(res.data.telefone);
      setDataNascimento(res.data.data_nascimento);
      api.get(`/enderecos/${res.data.id_endereco}`).then((res) => {
        setEndereco(res.data);
        setCarregando(false);
      });
    });
  }, []);

  return (
    <div>
      <Conteudo>
        <CaixaCima>
          {carregando ? (
            <CaixaCimaCarregando>
              <Spin indicator={antIcon} />
            </CaixaCimaCarregando>
          ) : (
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
                <DataNascimento>
                  {dataNascimento.slice(8, -14)}/{dataNascimento.slice(5, -17)}/
                  {dataNascimento.slice(0, -20)}
                </DataNascimento>
              </NomeData>
            </FotoNomeData>
          )}
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
        </CaixaCima>

        <CaixaBaixo>
          <CaixaEndereco>
            {carregando ? (
              <CaixaEnderecoCarregando>
                <Spin indicator={antIcon} />
              </CaixaEnderecoCarregando>
            ) : (
              <>
                <EnderecoContato>Endereço</EnderecoContato>
                <DadosEndereco>{endereco.pais}</DadosEndereco>
                <DadosEndereco>{endereco.cep}</DadosEndereco>
                <DadosEndereco>{endereco.estado}</DadosEndereco>
                <DadosEndereco>{endereco.cidade}</DadosEndereco>
                <DadosEndereco>{endereco.bairro}</DadosEndereco>
                <RuaNumeroComplemento>
                  <Rua>
                    {endereco.rua} {endereco.numero}
                  </Rua>
                  <Complemento>{endereco.complemento}</Complemento>
                </RuaNumeroComplemento>
              </>
            )}
          </CaixaEndereco>

          <ContatoExcluirConta>
            <CaixaContato>
              {carregando ? (
                <CaixaEnderecoCarregando>
                  <Spin indicator={antIcon} />
                </CaixaEnderecoCarregando>
              ) : (
                <>
                  <EnderecoContato>Contato</EnderecoContato>
                  <DadosContato>
                    ({telefone.slice(0, -9)}) {telefone.slice(2, -4)}-
                    {telefone.slice(-4)}
                  </DadosContato>
                  <DadosContato>{usuario.email}</DadosContato>
                </>
              )}
            </CaixaContato>
            <ExcluirConta onClick={() => history.push("/web/homemedico")}>
              EXCLUIR CONTA
            </ExcluirConta>
          </ContatoExcluirConta>
        </CaixaBaixo>
      </Conteudo>
    </div>
  );
}

export default Perfil;
