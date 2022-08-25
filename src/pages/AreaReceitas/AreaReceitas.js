import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { compararDataRecente, FormatarDataShort } from "../../utils/tratamentoErros";
import {
  TopoPagina,
  ContainerListadeReceitas,
  FiltroPaciente,
  BarraPesquisa,
  BarraEstetica,
  DadosReceita,
  Titulo,
  ContainerReceitas,
  Receita,
  Nome,
  DataCriacao,
  CodigoPaciente,
  BotaoDeletar,
  CaixaVazia,
  BotaoAdicionar,
  Botoes,
} from "./Styles";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";
import { blue } from "@mui/material/colors";

function AreaReceitas() {
  const { Option } = Select;
  const { Search } = Input;
  const [pacientes, setPacientes] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pacienteSelect, setPacienteSelect] = useState("");
  const [busca, setBusca] = useState("");
  const [carregandoPagina, setCarregandoPagina] = useState(false);

  const lowerBusca = busca.toLowerCase();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const antIconPagina = <LoadingOutlined style={{ fontSize: 40, color: blue.A700 }} spin />;

  const receitasFiltradas = receitas.filter((receita) => {
    if (lowerBusca === "" && pacienteSelect === "")
      return receita;
    else {
      return (
        receita?.nome?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(pacienteSelect)
        && receita?.titulo?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(lowerBusca));
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

  useEffect(() => {
    pegandoDadosReceitas();
    pegandoDadosPacientes();
  }, []);

  return (
    <div>
      <ContainerListadeReceitas>
        <TopoPagina>
          <BarraPesquisa>
            <Search
              placeholder="BUSCAR"
              style={{ width: 500 }}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </BarraPesquisa>
          <Botoes>
            <FiltroPaciente>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                onChange={(value) => pacientesFiltrados(value)}
              >
                <Option value="">Todos os Pacientes</Option>
                {pacientes.map((value) => (
                  <Option value={value.nome.toLowerCase()} > {value.nome} </Option>
                ))}
              </Select>
            </FiltroPaciente>
            <BotaoAdicionar>
              <Button
                backgroundColor={Cores.cinza[9]}
                color={Cores.verde}
                width="50%"
                display="flex"
                height="32px"
                borderColor={Cores.verde}
                fontSize="1em"
                gap="1%"
                widthMedia600="100%"
              >
                Receita
                <PlusCircleOutlined style={{ color: Cores.azul }} />
              </Button>
            </BotaoAdicionar>
          </Botoes>
        </TopoPagina>
        <BarraEstetica></BarraEstetica>
        <DadosReceita>
          <Titulo>Título</Titulo>
          <CodigoPaciente>Nome do Paciente</CodigoPaciente>
          <DataCriacao>Data de Criação</DataCriacao>
          <CaixaVazia></CaixaVazia>
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
                  <Nome>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.nome}</div>
                    )}
                  </Nome>
                  <DataCriacao>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div> {value.data_criacao} </div>
                    )}
                  </DataCriacao>
                  <BotaoDeletar>
                    <Button
                      backgroundColor="transparent"
                      borderColor={Cores.verde}
                      color={Cores.verde}
                      fontSize="1em"
                      height="30px"
                      width="50%"
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
    </div>
  );
}

export default AreaReceitas;
