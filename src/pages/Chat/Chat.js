import React, { useState, useContext, useEffect, useRef } from "react";
import BarraLateralChat from "../../components/BarraLateralChat";
import ConversaAberta from "../../components/ConversaAberta";
import { ChatContext } from "../../contexts/ChatContext";
import checarObjVazio from "../../utils/checarObjVazio";
import { Container, MensagemInicialChat, ContainerMobile } from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import io from "socket.io-client";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import moverArray from "../../utils/moverArray";

const BACK_END_URL = "http://localhost:3333";

const Chat = () => {
	const [mensagemRecebida, setMensagemRecebida] = useState({});
	const [conversaRecebida, setConversaRecebida] = useState({});
	const {
		usuarioId,
		conversas,
		setConversas,
		conversaSelecionada,
		setMensagens,
		componenteEstaMontadoRef,
	} = useContext(ChatContext);
	const socket = useRef();

	useEffect(() => {
		socket.current = io(BACK_END_URL);

		socket.current.emit("adicionarUsuario", usuarioId);

		socket.current.on("mensagemRecebida", (novaMensagem) => {
			setMensagemRecebida(novaMensagem);
		});

		socket.current.on("conversaRecebida", (novaConversa) => {
			setConversaRecebida(novaConversa);
		});

		return () => {
			socket.current.off();
			socket.current.close();
		};
	}, []);

	useEffect(() => {
		if (checarObjVazio(mensagemRecebida)) return;

		componenteEstaMontadoRef.current = true;

		async function atualizarBarraLateralNovaMensagem(novaMensagem) {
			const index = conversas?.findIndex(
				({ id }) => id === novaMensagem.id_conversa
			);
			const copiaConversas = objCopiaProfunda(conversas);
			const conversaNaLista = copiaConversas[index];

			novaMensagem.pertenceAoUsuarioAtual = false;
			if (novaMensagem.id_conversa === conversaSelecionada.id) {
				setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);
				await managerService.UpdateMensagemVisualizada(novaMensagem.id, {
					foi_visualizado: true,
				});
			} else {
				conversaNaLista.mensagensNaoVistas++;
			}

			conversaNaLista.ultima_mensagem = novaMensagem;
			if (componenteEstaMontadoRef.current) {
				setConversas(moverArray(copiaConversas, index, 0));
			}
		}

		atualizarBarraLateralNovaMensagem(mensagemRecebida);

		return () => (componenteEstaMontadoRef.current = false);
	}, [mensagemRecebida]);

	useEffect(() => {
		if (checarObjVazio(conversaRecebida)) return;

		setConversas((conversasLista) => [conversaRecebida, ...conversasLista]);
	}, [conversaRecebida]);

	return (
		<>
			<Container>
				<BarraLateralChat />
				{checarObjVazio(conversaSelecionada) ? (
					<MensagemInicial />
				) : (
					<ConversaAberta socket={socket.current} />
				)}
			</Container>

			<ContainerMobile>
				{checarObjVazio(conversaSelecionada) ? (
					<BarraLateralChat />
				) : (
					<ConversaAberta socket={socket.current} />
				)}
			</ContainerMobile>
		</>
	);
};

const MensagemInicial = () => {
	return (
		<MensagemInicialChat>
			<h3>Bem vindo!</h3>
			<p>Selecione um chat para iniciar uma conversa.</p>
		</MensagemInicialChat>
	);
};

export default Chat;
