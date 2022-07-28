import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Modal } from "antd";
import {
  TopoPagina,
  ContainerListadeFormularios,
  Filtros,
  FiltroEspecifico,
  BarraPesquisa,
  BarraEstetica,
  ContainerFormulario,
  BotaoFinal,
  UrgenciaFormulario,
  TipoFormulario,
  TituloFormulario,
  Formulario,
  DadosFormulario,
  BotoesVertical,
  ContainerFormularioEspecifico,
} from "./Styles";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import * as managerService from "../../services/ManagerService/managerService";

function ListaFormularios() {
  const history = useHistory();

  const { Search } = Input;
  const [formularios, setFormularios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  useEffect(() => {
    pegandoDadosFormularios();
  }, []);

  async function pegandoDadosFormularios() {
    setCarregando(true);
    const resposta = await managerService.GetFormularios();
    setFormularios(resposta);
    setCarregando(false);
  }

  async function editarFormulario(id) {
    history.push({
      pathname: "/web/editarformulario",
      state: { id },
    });
  }

  async function deletarFormulario(id) {
    await managerService.DeletarFormulario(id);
  }

  return (
    <div>
      <ContainerListadeFormularios>
        {carregando ? (
          <Spin indicator={antIcon} />
        ) : (
          <>
            <TopoPagina>
              <BarraPesquisa>
                <Search placeholder="BUSCAR" style={{ width: "100%" }} />
              </BarraPesquisa>
              <Filtros>
                <FiltroEspecifico>
                  <Select
                    defaultValue="Tipos"
                    style={{ color: "green", width: "100%" }}
                  ></Select>
                </FiltroEspecifico>
                <FiltroEspecifico>
                  <Select
                    defaultValue="Finalidades"
                    style={{ color: "green", width: "100%" }}
                  ></Select>
                </FiltroEspecifico>
                <FiltroEspecifico>
                  <Select
                    defaultValue="Urgências"
                    style={{ color: "green", width: "100%" }}
                  ></Select>
                </FiltroEspecifico>
              </Filtros>
            </TopoPagina>
            <BarraEstetica />
            <ContainerFormulario>
              {formularios?.map((value) => (
                <ContainerFormularioEspecifico>
                  <Formulario>
                    <DadosFormulario>
                      <TituloFormulario>{value.titulo}</TituloFormulario>
                      <TipoFormulario>Tipo: {value.tipo}</TipoFormulario>
                      <UrgenciaFormulario>
                        <>Urgência: </>
                        {value.urgencia === 1 ? (
                          <>
                            <StarOutlined />
                            <StarOutlined />
                            <StarFilled />
                          </>
                        ) : value.urgencia === 2 ? (
                          <>
                            <StarOutlined />
                            <StarFilled />
                            <StarFilled />
                          </>
                        ) : (
                          <>
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                          </>
                        )}
                      </UrgenciaFormulario>
                    </DadosFormulario>
                  </Formulario>
                  <BotoesVertical>
                    <Button
                      backgroundColor="green"
                      // {Cores.lilas[1]}
                      color={Cores.branco}
                      fontWeight="bold"
                      borderColor={Cores.azulEscuro}
                      height="37px"
                      width="90%"
                    >
                      ENVIAR
                    </Button>
                    <Button
                      backgroundColor="green"
                      // {Cores.cinza[7]}
                      color={Cores.azulEscuro}
                      fontWeight="bold"
                      borderColor={Cores.azulEscuro}
                      height="37px"
                      width="90%"
                      onClick={() => editarFormulario(value.id)}
                    >
                      EDITAR
                    </Button>
                    <Button
                      backgroundColor="green"
                      // {Cores.branco}
                      color={Cores.cinza[2]}
                      fontWeight="bold"
                      borderColor="rgba(255, 0, 0, 0.25)"
                      height="37px"
                      width="90%"
                      onClick={() => deletarFormulario(value.id)}
                    >
                      DELETAR
                    </Button>
                  </BotoesVertical>
                </ContainerFormularioEspecifico>
              ))}
              <BotaoFinal>
                <Button
                  backgroundColor={Cores.cinza[7]}
                  color={Cores.azul}
                  width="35%"
                  height="50px"
                  borderColor={Cores.azul}
                  fontSize="1em"
                  gap="2%"
                  boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                  onClick={() => history.push("/web/criacaoformulario")}
                >
                  <PlusCircleOutlined style={{ color: Cores.azul }} />
                  Adicionar Formularios
                </Button>
              </BotaoFinal>
            </ContainerFormulario>
          </>
        )}
      </ContainerListadeFormularios>
    </div>
  );
}

export default ListaFormularios;
