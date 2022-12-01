import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Modal } from "antd";
import { compararDataRecente } from "../../utils/tratamentoErros";
import {
	TopoPagina,
	BarraPesquisa,
	Botoes,
	FiltroData,
	SelectData,
	InputData,
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
import ModalExcluirReceita from "../../components/ModalExcluirReceita";

function AreaReceitas() {
	const history = useHistory();
	const { Option } = Select;
	const { Search } = Input;
	const [receitas, setReceitas] = useState([]);
	const [dataSelect, setDataSelect] = useState("");
	const [dataInput, setDataInput] = useState('');
	const [busca, setBusca] = useState("");
	const [modalDeletarReceita, setModalDeletarReceita] = useState(false);
	const [receitaEspecifica, setReceitaEspecifica] = useState({});
	const [carregandoPagina, setCarregandoPagina] = useState(false);

	const lowerBusca = busca
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	const antIconPagina = (
		<LoadingOutlined style={{ fontSize: 40, color: Cores.azulEscuro }} spin />
	);

	const receitasFiltradas = receitas.filter((receita) => {
		if (lowerBusca === "" && dataSelect === "") return receita;
		else {
			let dataFormatada = moment(receita.data_criacao).format("YYYY-MM-DD");
			return (
				dataFormatada === dataInput &&
				receita?.titulo
					?.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.includes(lowerBusca)
			);
		}
	});

	function dataFiltrada(value) {
		setDataSelect(value);
	}

	function criandoReceita() {
		history.push({
			pathname: "/web/criacaoreceitas",
		});
	}

	async function pegandoDadosReceitas() {
		setCarregandoPagina(true);
		const resposta = await managerService.GetReceitas();
		const receitasFormatadas = resposta.sort(compararDataRecente);
		setReceitas(receitasFormatadas);
		setCarregandoPagina(false);
	}

	function fechandoModalDeletarReceita() {
		setModalDeletarReceita(false);
	}

	function abreModalDeletarReceita(receita) {
		setModalDeletarReceita(true);
		setReceitaEspecifica(receita);
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
							value={busca}
							onChange={(e) => setBusca(e.target.value)}
						/>
					</BarraPesquisa>
					<Botoes>
						<FiltroData>
							<SelectData
								defaultValue=''
								bordered={false}
								FiltrarData={dataSelect}
								onChange={(value) => dataFiltrada(value)}
							>
								<Option value=''>Todas as datas</Option>
								<Option value='filtrado'>Data filtrada</Option>
							</SelectData>
							{dataSelect === '' ? (
								<></>
							) : (
								<InputData
									size='large'
									name='data'
									type='date'
									border={dataSelect}
									onChange={(e) => setDataInput(e.target.value)}
									value={dataInput}
								/>
							)}
						</FiltroData>
						<BotaoAdicionar>
							<Button
								backgroundColor={Cores.cinza[7]}
								color={Cores.azul}
								width="75%"
								display="flex"
								height="32px"
								borderColor={Cores.preto}
								fontSize="1em"
								gap="5%"
								widthMedia600="100%"
								onClick={() => criandoReceita()}
							>
								Adicionar Receita
							</Button>
						</BotaoAdicionar>
					</Botoes>
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
								<Receita key={value?.id}>
									<Titulo>{value?.titulo}</Titulo>
									<NomePaciente>{value?.nome}</NomePaciente>
									<DataCriacao>{moment(value?.data_criacao).format("DD/MM/YYYY")}</DataCriacao>
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