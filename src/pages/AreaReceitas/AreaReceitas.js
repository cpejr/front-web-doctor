import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Spin, Modal } from "antd";
import { compararDataRecente, FormatarDataShort } from "../../utils/tratamentoErros";
import {
  TopoPagina,
  BarraPesquisa,
  Botoes,
  FiltroPaciente,
  BotaoAdicionar,
  ContainerListadeReceitas,
  BarraEstetica,
  DadosReceita,
  ContainerReceitas,
  Receita,
  Titulo,
  DataCriacao,
  NomePaciente,
  BotaoDeletar,
} from "./Styles";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";
import { blue } from "@mui/material/colors";
import ModalExcluirReceita from "../../components/ModalExcluirReceita";

function AreaReceitas() {
  const { Option } = Select;
  const { Search } = Input;
  const [pacientes, setPacientes] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pacienteSelect, setPacienteSelect] = useState("");
  const [busca, setBusca] = useState("");
  const [modalDeletarReceita, setModalDeletarReceita] = useState(false);
  const [receitaEspecifica, setReceitaEspecifica] = useState({});
  const [carregandoPagina, setCarregandoPagina] = useState(false);

  const lowerBusca = busca
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const antIconPagina = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azulEscuro }} spin />
  );

  const receitasFiltradas = receitas.filter((receita) => {
    if (lowerBusca === "" && pacienteSelect === "") return receita;
    else {
      return (
        receita?.nome
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(pacienteSelect) &&
        receita?.titulo
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(lowerBusca)
      );
    }
  });

  function pacientesFiltrados(value) {
    setPacienteSelect(value);
  }

  async function pegandoDadosReceitas() {
    setCarregandoPagina(true);
    setReceitas([]);
    const resposta = await managerService.GetReceitas();
    resposta.sort(compararDataRecente).forEach((receita) => {
      receita.data_criacao = FormatarDataShort(receita.data_criacao);
      setReceitas((receitas) => [...receitas, receita]);
      setCarregando(false);
    });
    setCarregandoPagina(false);
  }


  async function pegandoDadosPacientes() {
    setCarregandoPagina(true);
    setPacientes([]);
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === "PACIENTE") {
        setPacientes((usuarios) => [...usuarios, usuario]);
        setCarregando(false);
      }
    });
  }

  function fechandoModalDeletarReceita() {
    setModalDeletarReceita(false);
  }

  function abreModalDeletarReceita(receita){
    setModalDeletarReceita(true);
    setReceitaEspecifica(receita)

  }

  useEffect(() => {
    pegandoDadosReceitas();
    pegandoDadosPacientes();
  }, []);

  return (
    <div>
      <ContainerListadeReceitas>
        <TopoPagina>
          <Botoes>
            <BarraPesquisa>
              <Search
                placeholder="BUSCAR"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </BarraPesquisa>

            <FiltroPaciente
              defaultValue=""
              onChange={(value) => pacientesFiltrados(value)}
            >
              <Option value="">Todos os Pacientes</Option>
              {pacientes.map((value) => (
                <Option value={value.nome.toLowerCase()}> {value.nome} </Option>
              ))}
            </FiltroPaciente>
          </Botoes>
          <BotaoAdicionar>
            <Button
              backgroundColor={Cores.verde}
              color={Cores.branco}
              borderColor={Cores.preto}
              widthMedia600="100%"
              marginTop="15px"
              width="45%"
              height="50px"
              fontSize="1.45em"
              fontWeight="bold"
              fontSizeMedia950="1.1em"
              fontSizeMedia480="1em"
              fontSizeMedia1080="1.3em"
              gap="1%"
              widthMedia="100%"
            >
              Adicionar receita
            </Button>
          </BotaoAdicionar>
        </TopoPagina>
        <BarraEstetica></BarraEstetica>
        <DadosReceita>
          <Titulo>Título</Titulo>
          <NomePaciente>Nome do Paciente</NomePaciente>
          <DataCriacao>Data de Criação</DataCriacao>
          <BotaoDeletar></BotaoDeletar>
        </DadosReceita>
        {carregandoPagina ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "47.5%",
            }}
          >
            <Spin indicator={antIconPagina} />
          </div>
        ) : (
          <>
            <ContainerReceitas>
              {receitasFiltradas.map((value) => (
                <Receita key={value.id}>
                  <Titulo>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.titulo}</div>
                    )}
                  </Titulo>
                  <NomePaciente>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.nome}</div>
                    )}
                  </NomePaciente>
                  <DataCriacao>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div> {value.data_criacao} </div>
                    )}
                  </DataCriacao>
                  <BotaoDeletar>
                    <Button
                      backgroundColor={Cores.cinza[7]}
                      borderColor={Cores.azul}
                      color={Cores.azul}
                      fontSize="1em"
                      height="30px"
                      width="50%"
                      onClick={() => abreModalDeletarReceita(value)}
                    >
                      Deletar
                    </Button>
                  </BotaoDeletar>
                </Receita>
              ))}
            </ContainerReceitas>
          </>
        )}
      </ContainerListadeReceitas>

      <Modal
        visible={modalDeletarReceita}
        onCancel={() => setModalDeletarReceita(false)}
        style={{ maxWidth: "450px", minWidth: "250px" }}
        width={"50%"}
        centered={true}
        footer={null}
      >
        <ModalExcluirReceita
          fecharModal={() => fechandoModalDeletarReceita()}
          receita={receitaEspecifica}
        />
      </Modal>

    </div>
  );
}

export default AreaReceitas;
