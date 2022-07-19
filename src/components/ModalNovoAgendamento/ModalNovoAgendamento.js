import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Input } from "antd";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import {
    Container,
    Caixa,
    InfoEsquerdaEDireita,
    Usuario,
    Imagem,
    Nome,
    TipoAgendamento,
    TextoTipoAgendamento,
    TextoCheckbox,
    DoisSelect,
    TamanhoInput,
    InputHora,
    InputDuracao,
    SelecioneUmaData,
    TextoSelecioneUmaData,
    TextAreaDescricao,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Cores } from "../../variaveis";
import moment from "moment";

function ModalNovoAgendamento() {
    const { Option } = Select;
    const [usuarios, setUsuarios] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    const [carregando, setCarregando] = useState();
    const [carregandoCadastro, setCarregandoCadastro] = useState();
    const [carregandoConsultorios, setCarregandoConsultorios] = useState();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [consulta, setConsulta] = useState({
        data_hora: "",
        duracao_em_minutos: "",
        descricao: "",
        avaliacao: "",
        id_usuario: "",
        id_consultorio: "",
    });
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [duracaoEmMinutos, setDuracaoEmMinutos] = useState("");
    // const [selectValue, setSelectValue] = useState("");
    moment.locale("pt-br");


    async function pegandoDadosUsuarios() {
        const resposta = await managerService.GetDadosPessoais();
        resposta.forEach((usuario) => {
            if (usuario.tipo === "PACIENTE") {
                setUsuarios((usuarios) => [...usuarios, usuario]);

            }
        });
    }

    async function pegandoConsultorios() {
        setCarregandoConsultorios(true)
        const res = await managerService.GetDadosConsultorios();
        setConsultorios(res.dadosConsultorios);
        setCarregandoConsultorios(false)
    }

    useEffect(() => {
        pegandoDadosUsuarios();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        pegandoConsultorios();
    }, []);

    async function requisicaoCriarConsulta() {
        setCarregandoCadastro(true);
        formatacaoDataHora();
        await managerService.CriandoColsulta(consulta);
        setCarregandoCadastro(false);
    }

    function formatacaoDataHora() {
        try {
            const dataHora = `${data} ${hora}:00`;
            consulta.data_hora = dataHora;
        } catch {
            alert("DataHora inválida.");
        }
    }

    function preenchendoDadosConsulta(e) {
        if (e.target.name === "hora") {
            setHora(e.target.value);
            return hora;
        } else if (e.target.name === "data") {
            setData(e.target.value)
            return data;
        } else {
            setConsulta({ ...consulta, [e.target.name]: e.target.value });
            return consulta;
        }
    }

    return (
        <Container>
            <Caixa>
                <InfoEsquerdaEDireita>
                    <Usuario>
                        <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
                        {carregando ? (
                            <Spin indicator={antIcon} />
                        ) : (
                            <Nome>
                                <Select
                                    style={{
                                        width: "100%",
                                        color: "black",
                                        borderColor: "black",
                                        borderWidth: "1px",
                                    }}
                                    size="large"
                                    name="tipo"
                                    placeholder="Tipo"
                                >
                                    <option value="" disabled selected >
                                        Paciente
                                    </option>

                                    {usuarios.map((usuario) => (
                                        <>
                                            {carregando ? (
                                                <Spin indicator={antIcon} />
                                            ) : (
                                                <option key={usuario.id} value={usuario.id} color="red">
                                                    {usuario.nome}
                                                </option>
                                            )}
                                        </>
                                    ))}
                                </Select>
                            </Nome>
                        )}
                    </Usuario>
                    <TipoAgendamento>
                        <TextoTipoAgendamento>
                            Selecione o Tipo de Agendamento:
                        </TextoTipoAgendamento>
                        <Row gutter={60} justify={"space-around"}>
                            <Col>
                                <Checkbox>
                                    <TextoCheckbox>Exame</TextoCheckbox>
                                </Checkbox>
                            </Col>
                            <Col>
                                <Checkbox>
                                    <TextoCheckbox>Consulta</TextoCheckbox>
                                </Checkbox>
                            </Col>
                        </Row>
                    </TipoAgendamento>
                    <TextAreaDescricao
                        placeholder="Adicione uma descrição"
                        rows={4}
                        name="descricao"
                        value={consulta.descricao}
                        onChange={preenchendoDadosConsulta}
                        style={{
                            borderWidth: "1px",
                            borderColor: "black",
                            color: "black",
                        }}
                    />
                </InfoEsquerdaEDireita>
                <InfoEsquerdaEDireita>
                    <SelecioneUmaData>
                        <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
                        <Input
                            placeholder="Selecione uma data"
                            type="date"
                            size="large"
                            name="data"
                            onChange={(e) => {
                                preenchendoDadosConsulta(e);
                            }}
                            style={{
                                borderWidth: "1px",
                                borderColor: "black",
                                color: "black",
                            }}
                        ></Input>
                    </SelecioneUmaData>
                    <DoisSelect>
                        <TamanhoInput>
                            <Select
                                style={{
                                    width: "100%",
                                    color: "black",
                                    borderColor: "black",
                                    borderWidth: "1px",
                                }}
                                size="large"
                                name="tipo"
                                placeholder="Tipo"
                                onChange={(e) => {
                                    preenchendoDadosConsulta(e);
                                }}
                            >
                                <option value="" disabled selected >Tipo</option>
                                <option value="1">Tipo 1</option>
                                <option value="2">Tipo 2</option>
                                <option value="3">Tipo 3</option>
                            </Select>
                        </TamanhoInput>
                        <TamanhoInput>
                            <Select
                                id="id_consultorio"
                                name="id_consultorio"
                                style={{
                                    width: "100%",
                                    borderColor: "black",
                                    borderWidth: "1px",
                                    color: "black"
                                }}
                                size="large"
                                onChange={(e) => {
                                    preenchendoDadosConsulta(e);
                                }}

                            >
                                <option value="" disabled selected >
                                    Consultório
                                </option>
                                {consultorios.map((consultorio) => (
                                    <>
                                        {carregandoConsultorios ? (
                                            <Spin indicator={antIcon} />
                                        ) : (
                                            <option key={consultorio.id} value={consultorio.id} color="red">
                                                {consultorio.nome}
                                            </option>
                                        )}
                                    </>
                                ))}



                            </Select>
                        </TamanhoInput>
                    </DoisSelect>

                    <DoisSelect>
                        <TamanhoInput>
                            <InputHora
                                type="text"
                                onFocus={(e) => (e.target.type = "time")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="Horário"
                                name="hora"
                                onChange={preenchendoDadosConsulta}
                                style={{ color: "black" }}
                            />
                        </TamanhoInput>

                        <TamanhoInput>
                            <InputDuracao
                                placeholder="Duração"
                                name="duracao_em_minutos"
                                onChange={preenchendoDadosConsulta}
                                suffix="min"
                            />
                        </TamanhoInput>
                    </DoisSelect>
                    <Checkbox>
                        <TextoCheckbox>Notificar paciente</TextoCheckbox>
                    </Checkbox>

                    <Button
                        width="80%"
                        height="50px"
                        backgroundColor={Cores.lilas[2]}
                        borderColor={Cores.azul}
                        color={Cores.azulEscuro}
                        fontSize="1.1em"
                        fontWeight="bold"
                        fontSizeMedia="0.9em"
                        fontSizeMedia950="1.1em"
                        onClick={() => requisicaoCriarConsulta()}
                    >
                        {carregandoCadastro ? (
                            <Spin indicator={antIcon} />
                        ) : (
                            <div>Cadastrar novo agendamento</div>
                        )}
                    </Button>
                </InfoEsquerdaEDireita>
            </Caixa>
        </Container>
    );
}

export default ModalNovoAgendamento;
