import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  TopoPagina,
  ContainerListadeReceitas,
  Filtros,
  FiltroDatas,
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
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [tipoSelect, setTipoSelect] = useState("");
  const [busca, setBusca] = useState("");
  const [carregandoPagina, setCarregandoPagina] = useState(false);

  const lowerBusca = busca.toLowerCase();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const antIconPagina = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const tipoUsuarioLogado = sessionStorage.getItem("@doctorapp-Tipo");

  const receitasFiltradas = receitas.filter((receita) => {
    if (lowerBusca === "" && tipoSelect === "") {
      console.log(receita)
      return receita;
    } else {
      return (
        receita?.titulo?.toLowerCase().includes(lowerBusca));
    }
  });

  function secretariosFiltrados(value) {
    setTipoSelect(value);
  }

  async function pegandoDadosReceitas() {
    setCarregandoPagina(true);
    setReceitas([]);
    const resposta = await managerService.GetReceitas();
    if (tipoUsuarioLogado === "MASTER") {
      resposta.forEach((receita) => {
        if (1) {
          setReceitas((receitas) => [...receitas, receita]);
          console.log(receita);
          setCarregando(false);
        }
      });
    }
    setCarregandoPagina(false);
  }

  useEffect(() => {
    pegandoDadosReceitas();
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
            {tipoUsuarioLogado === "MASTER" ? (
              <FiltroReceita>
                <Select
                  defaultValue=""
                  style={{ width: 200 }}
                  onChange={(value) => secretariosFiltrados(value)}
                >
                  <Option value="">Todos os Pacientes</Option>
                  <Option value="PACIENTE">Pacientes</Option>
                </Select>
              </FiltroReceita>
            ) : (
              <></>
            )}
            <FiltroDatas>
              <Select
                defaultValue="Todas as datas"
                style={{ width: 200 }}
              ></Select>
            </FiltroDatas>
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
                  <Titulo>{value.titulo}</Titulo>
                  <DataCriacao>{value.data_criacao}</DataCriacao>
                  <Nome>{value.nome}</Nome>
                  <BotaoAdicionar>
                    <Button
                      backgroundColor="transparent"
                      borderColor="transparent"
                      color={Cores.preto}
                      fontSize="1em"
                      textDecoration="underline"
                      height="50px"
                    >
                      Editar Receita
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
