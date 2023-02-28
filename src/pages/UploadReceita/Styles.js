import styled from "styled-components";
import { Cores } from "../../variaveis";
import { Upload } from "antd";

export const ContainerUploadReceitas = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
`;

export const CardUploadReceitas = styled.div`
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

export const UploadReceitaNome = styled.div`
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

export const UploadReceitaCorpo = styled.div`
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

export const UploadBox = styled.div`
	display: flex;
	font-size: 17px;
	font-weight: 500;
	line-height: 24px;
	margin-top: 4%;
	margin-bottom: 2%;

	@media (max-width: 280px) {
		font-size: 16px;
	}
`;

export const Area = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${Cores.cinza[7]};
	color: ${Cores.preto};
	font-size: 1em;
	width: 100%;
	height: auto;
	box-shadow: 0px 4px 4px 0px #00000040;
	padding-right: 3px;
	border-radius: 3px;
	border-style: solid;
	border-width: 2px;
	border-color: ${(props) =>
		props.camposVazios ? Cores.vermelho : Cores.azulEscuro};
	
	overflow: hidden;
	font-size: 1em;
`;

export const EnviarUploadArea = styled(Upload)`
.ant-upload{
	width:100%;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
`;

export const UploadText = styled.div`
	font-size: 20px;
	flex-direction: column;	
	line-height: 30px;
	margin-bottom: 2%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: grey;
`;

export const UploadReceitaBotoes = styled.div`
	display: flex;
	width: 80%;
	margin-top: 6%;
	align-self: center;
	justify-content: center;

	@media (max-width: 280px) {
		margin-bottom: 7px;
		width: 85%;
	}

	@media (max-width: 400px) {
		margin-bottom: 7px;
		width: 85%;
		flex-direction: column;
	}
`;

export const BotaoCancelar = styled.div`
	display: flex;
	width: 40%;
	margin-right: 5%;

	@media (max-width: 280px) {
		width: 55%;
	}

	@media (max-width: 400px) {
		align-self: center;
		margin-right: 0%;
		margin-bottom: 2%;
	}
`;

export const BotaoEnviar = styled.div`
	display: flex;
	width: 40%;
	margin-left: 5%;

	@media (max-width: 280px) {
		width: 55%;
	}

	@media (max-width: 400px) {
		align-self: center;
		margin-left: 0%;
	}
`;

export const ArquivoSelecionado = styled.div`
   width: 100%;
   height: auto;
   padding: 5px;
   gap: 5px;

   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   
   font-size: 16px;
   color: ${Cores.azul};

`;

export const UploadVazio = styled.div`
	word-break: break-all;
  	text-align: center;
	padding: 10px;
`;