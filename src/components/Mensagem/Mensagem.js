import React from "react";
import dayjs from "dayjs";
import { MensagemEnviada, DataHoraMensagem } from "./Styles";
import { format, register } from "timeago.js";
import pt_BR from "timeago.js/lib/lang/pt_BR";

register("pt_BR", pt_BR);

export default function Mensagem({
	pertenceAoUsuarioAtual,
	conteudo,
	data_criacao,
}) {
	return (
		<MensagemEnviada pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}>
			{conteudo}
			<DataHoraMensagem>
				{dayjs(data_criacao).format("DD/MM/YYYY HH:mm")}
			</DataHoraMensagem>
			{/* <DataHoraMensagem>{format(data_criacao, "pt_BR")}</DataHoraMensagem> */}
		</MensagemEnviada>
	);
}
