import styled from "styled-components";
import { Cores } from "../../variaveis";

export const ContainerCriacaoReceitas = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
`;

export const CardCriacaoReceitas = styled.div`
	width: 570px;
	margin-top: 3%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-style: solid;
	border-width: 2.5px;
	border-color: ${Cores.cinza[3]};
	background-color: #f7f7f780;
	border-radius: 4px;
	padding-left: 4%;
	padding-right: 4%;
	padding-bottom: 1%;
	padding-top: 1%;

	@media (max-width: 600px) {
		width: 80%;
	}

	@media (max-width: 360px) {
		width: 94%;
	}

	@media (max-width: 280px) {
		width: 90%;
	}
`;

export const CriacaoReceitaNome = styled.div`
	display: flex;
	font-size: 35px;
	line-height: 46.88px;
	font-weight: 400;
	margin-bottom: 3%;
	margin-top: 2%;
	color: ${Cores.azulEscuro};

	@media (max-width: 450px) {
		font-size: 30px;
	}
	@media (max-width: 360px) {
		font-size: 30px;
	}

	@media (max-width: 280px) {
		font-size: 25px;
	}
`;

export const CriacaoReceitaCorpo = styled.div`
	width: 85%;

	@media (max-width: 280px) {
		width: 90%;
	}
`;

export const Titulo = styled.div`
	display: flex;
	font-size: 17px;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: 0em;

	@media (max-width: 280px) {
		font-size: 16px;
	}
`;

export const NomeDoPaciente = styled.div`
	display: flex;
	font-size: 17px;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: 0em;
	margin-top: 4%;

	@media (max-width: 280px) {
		font-size: 16px;
	}
`;

export const SelectContainer = styled.div`
	height: 50px;
	width: 100%;
	background-color: ${Cores.cinza[7]};
	border-color: ${(props) =>
		props.camposVazios ? Cores.vermelho : Cores.azulEscuro};
	border-style: solid;
	border-width: 2px;
	border-radius: 3px;
	margin-top: 2%;
	box-shadow: 0px 4px 4px 0px #00000040;
`;

export const Descricao = styled.div`
	display: flex;
	font-size: 17px;
	font-weight: 500;
	line-height: 24px;
	margin-top: 4%;

	@media (max-width: 280px) {
		font-size: 16px;
	}
`;

export const DescricaoTextarea = styled.textarea`
	padding-bottom: 100px;
	background-color: ${Cores.cinza[7]};
	color: ${Cores.preto};
	font-size: 1em;
	width: 100%;
	height: 150px;
	margin-top: 2%;
	box-shadow: 0px 4px 4px 0px #00000040;
	padding-right: 3px;
	border-radius: 3px;
	border-style: solid;
	border-width: 2px;
	border-color: ${(props) => {
		let cor;
		if (!props.borderColor) {
			if (props.erro || props.camposVazios) {
				cor = Cores.vermelho;
			} else {
				cor = Cores.azulEscuro;
			}
		} else {
			cor = props.borderColor;
		}
		return cor;
	}};
	padding: 2%;
	padding-top: 3%;
	overflow: hidden;
	max-height: 150px;
	min-height: 150px;
	font-size: 1em;
`;

export const CriacaoReceitaBotoes = styled.div`
	display: flex;
	width: 80%;
	margin-top: 6%;
	align-self: center;
	justify-content: center;

	@media (max-width: 280px) {
		margin-bottom: 7px;
		width: 85%;
	}
`;

export const BotaoCancelar = styled.div`
	display: flex;
	width: 40%;
	margin-right: 5%;

	@media (max-width: 280px) {
		width: 55%;
	}
`;

export const BotaoEnviar = styled.div`
	display: flex;
	width: 40%;
	margin-left: 5%;

	@media (max-width: 280px) {
		width: 55%;
	}
`;
