import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  TopoPagina,
  ContainerListadeReceitas,
  Filtros,
  FiltroReceita,
  BarraPesquisa,
  BarraEstetica,
  DadosReceita,
  Titulo,
  ContainerReceitas,
  Receita,
  Nome,
  DataCriacao,
  CódigoPaciente,
  BotaoAdicionar,
  CaixaVazia,
  BotaoMedico,
} from "./Styles";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";

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
  const antIconPagina = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  const receitasFiltradas = receitas.filter((receita) => {
    if (lowerBusca === "" && pacienteSelect === "") {
      return receita;
    } else if (lowerBusca === "" && pacienteSelect !== ""){
      return receita?.nome?.toLowerCase().includes(pacienteSelect);
    } else if (lowerBusca !== "" && pacienteSelect === ""){
      return receita?.titulo?.toLowerCase().includes(lowerBusca);
    } else{
      return receita?.nome?.toLowerCase().includes(pacienteSelect) && receita?.titulo?.toLowerCase().includes(lowerBusca);
    }
  });

  function pacientesFiltrados(value) {
    setPacienteSelect(value);
  }

  async function pegandoDadosReceitas() {
    setCarregandoPagina(true);
    setReceitas([]);
    const resposta = await managerService.GetReceitas();
    resposta.forEach((receita) => {
      setReceitas((receitas) => [...receitas, receita]);
      console.log(receita);
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
              style={{ width: 400 }}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </BarraPesquisa>
          <Filtros>
            <FiltroReceita>
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
            </FiltroReceita>
          </Filtros>
          <BotaoMedico>
            <Button
              backgroundColor={Cores.cinza[7]}
              color={Cores.azul}
              width="50%"
              display="flex"
              height="50px"
              borderColor={Cores.azul}
              fontSize="1em"
              gap="1%"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              widthMedia600="100%"
            >
              Cadastrar Nova Receita
              <PlusCircleOutlined style={{ color: Cores.azul }} />
            </Button>
          </BotaoMedico>
        </TopoPagina>

        <BarraEstetica></BarraEstetica>
        <DadosReceita>
          <Titulo>Título</Titulo>
          <DataCriacao>Data de Criação</DataCriacao>
          <CódigoPaciente>Nome do Paciente</CódigoPaciente>
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
                  <DataCriacao>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.data_criacao}</div>
                    )}
                  </DataCriacao>
                  <Nome>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.nome}</div>
                    )}
                  </Nome>
                  <BotaoAdicionar>
                    <Button
                      backgroundColor="transparent"
                      borderColor="transparent"
                      color={Cores.preto}
                      fontSize="1em"
                      textDecoration="underline"
                      height="50px"
                    >
                      Deletar
                    </Button>
                  </BotaoAdicionar>
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
