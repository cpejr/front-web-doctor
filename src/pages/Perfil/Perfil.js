import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Conteudo,
  CaixaCima,
  FotoNomeData,
  FotoPerfil,
  Nome,
  DataCPF,
  ConjuntoDataCPF,
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
import * as managerService from "../../services/ManagerService/managerService"

function Perfil(props) {
  const history = useHistory();
  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  
  const [perfilPessoal, setPerfilPessoal] = useState(); 
  const [perfilSelecionado, setPerfilSelecionado] = useState(); 
  
  const [carregando, setCarregando] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 45, color: "#151B57" }} spin />;

  async function PerfilSecretariaOuMedico(){
    if(props.location.state === undefined){
      setPerfilPessoal(true);
      setPerfilSelecionado(false);
      pegandoDadosPerfilPessoal();
      
    } else {
      setPerfilPessoal(false);
      setPerfilSelecionado(true);
      pegandoDadosPerfilSelecionado();
    }
  }

  async function pegandoDadosPerfilPessoal(){
    const resposta = await managerService.GetDadosUsuario(email)
    setUsuario(resposta.dadosUsuario)
    setTelefone(resposta.dadosUsuario.telefone)
    setDataNascimento(resposta.dadosUsuario.data_nascimento)
    setEndereco(resposta.dadosEndereco)
    setCarregando(false);
  }

  async function pegandoDadosPerfilSelecionado(){
    const resposta = await managerService.GetDadosUsuario(props.location.state.email)
    console.log(resposta)
    setUsuario(resposta.dadosUsuario)
    setTelefone(resposta.dadosUsuario.telefone)
    setDataNascimento(resposta.dadosUsuario.data_nascimento)
    setEndereco(resposta.dadosEndereco)
    setCarregando(false);
  }

  useEffect(() => {
    PerfilSecretariaOuMedico();
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
                <ConjuntoDataCPF>
                <DataCPF>
                  {dataNascimento.slice(8, -14)}/{dataNascimento.slice(5, -17)}/
                  {dataNascimento.slice(0, -20)}
                </DataCPF>
                <DataCPF>
                  {usuario.cpf}
                </DataCPF>
                </ConjuntoDataCPF>
              </NomeData>
            </FotoNomeData>
          )}
          { perfilPessoal &&(
            <BotoesColuna>
            <Button
              width="100%"
              height="50px"
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
              height="50px"
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
          )}
          
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
