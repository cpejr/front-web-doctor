import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
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
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";
import ModalExcluirConta from "../../components/ModalExcluirConta";
import { cep, cpf} from "../../utils/masks";

function Perfil(props) {
  const history = useHistory();
  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [perfilPessoal, setPerfilPessoal] = useState();
  const [perfilSelecionado, setPerfilSelecionado] = useState();
  const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState("");
  const [botaoVisivel, setBotaoVisivel] = useState(true);

  const [modalDeletarConta, setModalDeletarConta] = useState(false);


  const [carregando, setCarregando] = useState(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 45, color: Cores.azul }} spin />
  );

  async function PegandoTipoPerfil() {
    if (props.location.state === undefined) {
      setPerfilPessoal(true);
      setPerfilSelecionado(false);
      pegandoDadosPerfilPessoal();
    } else {
      setPerfilPessoal(false);
      setPerfilSelecionado(true);
      pegandoDadosPerfilSelecionado();
    }
  }
  useEffect(() => {
    PegandoTipoPerfil();
  }, []);

  async function pegandoDadosPerfilPessoal() {
    const resposta = await managerService.GetDadosUsuario(email);
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setDataNascimento(data.toLocaleDateString());
    setEndereco(resposta.dadosEndereco);
    setCarregando(false);
    setTipoUsuarioLogado(resposta.dadosUsuario.tipo);
  }
  async function botaoExcluirVisivel() {
    if (tipoUsuarioLogado === "MASTER") {
      setBotaoVisivel(false);
    }
  }

  useEffect(() => {
    botaoExcluirVisivel();
  }, [tipoUsuarioLogado]);

  async function pegandoDadosPerfilSelecionado() {
    const resposta = await managerService.GetDadosUsuario(
      props.location.state.email
    );
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setDataNascimento(data.toLocaleDateString());
    setEndereco(resposta.dadosEndereco);
    setCarregando(false);
  }
  async function deletarEnderecoEUsuario() {
    await managerService.DeletarEnderecoEUsuario(usuario.id_endereco);
    await sleep(1500); 
    window.location.href = "/login"
  }

  function fechandoModalDeletarConta() {
    setModalDeletarConta(false);
  }

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
                  <DataCPF>Nascimento: {dataNascimento}</DataCPF>
                  <DataCPF>CPF: {cpf(usuario.cpf)}</DataCPF>
                </ConjuntoDataCPF>
              </NomeData>
            </FotoNomeData>
          )}
          {perfilPessoal && (
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                widthMedia480="30%"
                heightMedia560="30px"
                backgroundColor={Cores.lilas[2]}
                borderColor={Cores.azulEscuro}
                color={Cores.azulEscuro}
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
                backgroundColor={Cores.lilas[2]}
                borderColor={Cores.azulEscuro}
                color={Cores.azulEscuro}
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
                <DadosEndereco>País: {endereco.pais}</DadosEndereco>
                <DadosEndereco>CEP: {cep(endereco.cep)}</DadosEndereco>
                <DadosEndereco>Estado: {endereco.estado}</DadosEndereco>
                <DadosEndereco>Cidade: {endereco.cidade}</DadosEndereco>
                <DadosEndereco>Bairro: {endereco.bairro}</DadosEndereco>
                <DadosEndereco>Rua: {endereco.rua}</DadosEndereco>
                <DadosEndereco>Número: {endereco.numero}</DadosEndereco>
                <DadosEndereco>
                  Complemento: {endereco.complemento}
                </DadosEndereco>
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
                    Telefone:
                    ({telefone.slice(0, -9)}) {telefone.slice(2, -4)}-
                    {telefone.slice(-4)}
                  </DadosContato>
                  <DadosContato style={{ wordBreak: "break-word" }}>
                    {"E-mail: "}
                    {usuario.email}
                  </DadosContato>
                </>
              )}
            </CaixaContato>
            {botaoVisivel && (
              <ExcluirConta onClick={() => setModalDeletarConta(true)}>
                EXCLUIR CONTA
              </ExcluirConta>
            )}
          </ContatoExcluirConta>
        </CaixaBaixo>
      </Conteudo>

      <Modal
        visible={modalDeletarConta}
        onCancel={() => setModalDeletarConta(false)}
        style={{ maxWidth: "450px", minWidth: "250px" }}
        width={"50%"}
        centered={true}
        footer={null}
      >
        <ModalExcluirConta
          usuario={usuario}
          fecharModal={() => fechandoModalDeletarConta()}
        />
      </Modal>

    </div>
  );
}

export default Perfil;
