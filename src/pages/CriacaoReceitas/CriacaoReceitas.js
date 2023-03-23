import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import Select from "../../styles/Select";
import { Cores } from "../../variaveis";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import _ from "lodash";
import { toast } from "react-toastify";
import * as managerService from "../../services/ManagerService/managerService";
import {
	ContainerCriacaoReceitas,
	CardCriacaoReceitas,
	SelectContainer,
	CriacaoReceitaNome,
	DescricaoTextarea,
	CriacaoReceitaCorpo,
	Titulo,
	NomeDoPaciente,
	Assinatura,
	Descricao,
	CriacaoReceitaBotoes,
	BotaoEnviar,
	BotaoCancelar,
} from "./Styles";

import {
	Text,
	Document,
	Page,
	Image,
	PDFDownloadLink,
	StyleSheet
} from '@react-pdf/renderer';

import LogoPdf from "../../assets/LogoPdf.png"
import footerPDF from "../../assets/footerPDF.png"

const camposVaziosReferencia = {
	id_usuario: false,
	titulo: false,
	assinatura: false,
	descricao: false,
};

const estadoIncial = {
	id_usuario: "",
	titulo: "",
	assinatura: "",
	descricao: "",
};

function CriacaoReceitas() {
	const [usuarios, setUsuarios] = useState([]);
	const [estado, setEstado] = useState(estadoIncial);
	const [camposVazios, setCamposVazios] = useState({});
	const [carregandoCriacao, setCarregandoCriacao] = useState(false);
	const [NomePaciente, setNomePaciente] = useState();
	const [tituloReceita, setTituloReceita] = useState();
	const [dataNascimentoPaciente, setDataNascimentoPaciente] = useState();
	const [descricaoReceita, setDescricaoReceita] = useState();
	const [tipoAssinatura, setTipoAssinatura] = useState();
	const [preenchido, setPreenchido] = useState(false);
	const history = useHistory();

	function preenchendoDados(e) {
		e.preventDefault();
		const { value, name } = e.target;


		if (camposVazios[name])
			setCamposVazios((valorAnterior) => ({ ...valorAnterior, [name]: false }));

		setEstado({ ...estado, [name]: value });

		if (name === "titulo") {
			setTituloReceita(value);
		}

		if (name === "id_usuario") {
			armazenaInformacoesUsuario(value);
		}

		if (name === "assinatura") {
			setTipoAssinatura(value);
		}

		if (name === "descricao") {
			setDescricaoReceita(value);
		}
	}

	async function armazenaInformacoesUsuario(id) {
		const resposta = await managerService.GetUsuarioPorId(id);

		const dataDesformatada = resposta.data_nascimento;
		const dia = dataDesformatada.slice(8, 10);
		const mes = dataDesformatada.slice(5, 7);
		const ano = dataDesformatada.slice(0, 4);
		const dataFormatada = dia + '/' + mes + '/' + ano;

		setDataNascimentoPaciente(dataFormatada);
		setNomePaciente(resposta.nome);
	}



	useEffect(() => {
		async function pegandoPacientes() {
			setCarregandoCriacao(true);
			const resposta = await managerService.GetDadosPessoais();
			const pacientes = resposta.filter(
				(usuario) => usuario.tipo === "PACIENTE"
			);

			setUsuarios(pacientes);
			setCarregandoCriacao(false);
		}

		pegandoPacientes();
	}, []);

	useEffect(() => {
		if (tituloReceita !== "" && tipoAssinatura !== "" && descricaoReceita !== "" && NomePaciente !== "") {
			if (tituloReceita !== undefined && tipoAssinatura !== undefined && descricaoReceita !== undefined && NomePaciente !== undefined) {
				setPreenchido(true);
			}
		} else {
			setPreenchido(false);
		}

	}, [tituloReceita, descricaoReceita, tipoAssinatura, NomePaciente, preenchido]);


	function cancelarCriacaoReceita() {
		history.push("/web/areareceitas");
	}

	async function criarReceita(e) {
		e.preventDefault();

		const camposVaziosAtual = {
			id_usuario: !estado.id_usuario,
			titulo: !estado.titulo,
			assinatura: !estado.assinatura,
			descricao: !estado.descricao,
		};

		setCamposVazios(camposVaziosAtual);

		if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
			toast.warn("Preencha todos os campos");
			return;
		}

		setCarregandoCriacao(true);
		const id = estado.id_usuario;

		if (tipoAssinatura === 'sem') {
			setCarregandoCriacao(false);
			return;
		}


		await managerService.CriandoReceita(id, NomePaciente, dataNascimentoPaciente, tituloReceita, descricaoReceita, {
			mensagemSucesso: "Receita criada com sucesso",
			tempo: 1500,
			onClose: () => {
				history.push("/web/areareceitas");
			},
		});

		setCarregandoCriacao(false);
	}

	const antIcon = (
		<LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
	);

	const PdfTeste = () => {
		return (
			<Document>
				<Page style={styles.corpo} size="A4">
					<Image style={styles.logo} src={LogoPdf} />
					<Text style={styles.texto}>Nome do paciente: {NomePaciente}</Text>
					<Text style={styles.texto}>Data de nascimento: {dataNascimentoPaciente}</Text>
					<Text style={styles.titulo}>{tituloReceita}</Text>
					<Text style={styles.texto}>{descricaoReceita}</Text>
					<Image style={styles.footer} src={footerPDF} />
				</Page>
			</Document>
		)
	}

	const styles = StyleSheet.create({
		corpo: {
			paddingBottom: 5,
			paddingHorizontal: 30,
		},
		logo: {
			marginHorizontal: 150,
			size: 8,
			marginBottom: 20,
		},
		texto: {
			margin: 12,
			fontSize: 14,
			textAlign: "justify",
			fontFamily: "Times-Roman",
		},
		titulo: {
			fontSize: 18,
			marginBottom: 20,
			textAlign: "center",
		},
		footer: {
			width: '100%',
			marginTop: '83.5%',
		},
	});

	const ordenarusuarios = (a, b) => {
		var nome1 = a.nome.toUpperCase();
		var nome2 = b.nome.toUpperCase();
	
		  if (nome1 > nome2) {
			return 1;
		  } else {
			return -1;
		  };
	}

	return (
		<ContainerCriacaoReceitas>
			<CardCriacaoReceitas>
				<CriacaoReceitaNome>Criação de Receita</CriacaoReceitaNome>
				<CriacaoReceitaCorpo>
					<Titulo>Título:</Titulo>
					<Input
						placeholder="Título"
						backgroundColor={Cores.cinza[7]}
						color={Cores.preto}
						fontSize="1em"
						width="100%"
						marginTop="2%"
						boxShadow="0px 4px 4px 0px #00000040"
						name="titulo"
						camposVazios={camposVazios.titulo}
						onChange={preenchendoDados}
					/>
					<NomeDoPaciente>Nome do paciente:</NomeDoPaciente>
					<SelectContainer camposVazios={camposVazios.id_usuario}>
						<Select
							backgroundColor={Cores.cinza[7]}
							color={Cores.preto}
							borderColor="transparent"
							fontSize="1em"
							width="97%"
							marginTop="0px"
							size="large"
							name="id_usuario"
							placeholder="Nome do usuário"
							height="45px"
							borderWidth820="97%"
							nome="id_usuario"
							onChange={preenchendoDados}
						>
							<option value="" disabled selected>
								Nome do paciente
							</option>
							{usuarios.sort(ordenarusuarios).map((usuario) => (
								<option key={usuario.id} value={usuario.id} color="red">
									{usuario.nome}
								</option>
							))}
						</Select>
					</SelectContainer>
					<Assinatura>Assinatura:</Assinatura>
					<SelectContainer camposVazios={camposVazios.assinatura}>
						<Select
							backgroundColor={Cores.cinza[7]}
							color={Cores.preto}
							borderColor="transparent"
							fontSize="1em"
							width="97%"
							marginTop="0px"
							size="large"
							placeholder="Tipo da Assinatura"
							height="45px"
							borderWidth820="97%"
							name="assinatura"
							onChange={preenchendoDados}
						>
							<option value="">
								Tipo da Assinatura
							</option>
							<option value="auto">
								Assinatura Automática
							</option>
							<option value="sem">
								Sem Assinatura
							</option>

						</Select>
					</SelectContainer>
					<Descricao>Descrição:</Descricao>
					<DescricaoTextarea
						placeholder="Descrição"
						name="descricao"
						camposVazios={camposVazios.descricao}
						onChange={preenchendoDados}
					/>
				</CriacaoReceitaCorpo>
				<CriacaoReceitaBotoes>
					<BotaoCancelar>
						<Button
							height="47px"
							width="100%"
							backgroundColor={Cores.branco}
							borderColor={Cores.cinza[3]}
							color={Cores.cinza[2]}
							fontSize="1em"
							onClick={cancelarCriacaoReceita}
						>
							CANCELAR
						</Button>
					</BotaoCancelar>
					<BotaoEnviar>
						{tipoAssinatura === 'sem' && preenchido === true ? (
							<PDFDownloadLink document={<PdfTeste />} fileName={ "Receita - " + tituloReceita }>
								<Button height="47px"
									width="142px"
									backgroundColor={Cores.lilas[1]}
									borderColor={Cores.azul}
									color={Cores.branco}
									fontSize="1em"
								>
									ENVIAR

								</Button>
							</PDFDownloadLink>
						) : (
							<Button
								height="47px"
								width="100%"
								backgroundColor={Cores.lilas[1]}
								borderColor={Cores.azul}
								color={Cores.branco}
								fontSize="1em"
								onClick={criarReceita}
							>
								{carregandoCriacao ? (
									<Spin indicator={antIcon} />
								) : (
									<div>ENVIAR</div>
								)}
							</Button>
						)}
					</BotaoEnviar>
				</CriacaoReceitaBotoes>
			</CardCriacaoReceitas>
		</ContainerCriacaoReceitas>
	);
}

export default CriacaoReceitas;
