import React, { useEffect, useContext, useState } from "react";
import { 
  HeaderConversaAberta, 
  Conversa,  
  NomePessoa, 
  BotaoVoltar, 
  CorpoConversaAberta, 
  FooterConversaAberta 
} from "./Styles";
import Mensagem from "../Mensagem"
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import { ChatContext } from "../../contexts/ChatContext";
import * as managerService from "../../services/ManagerService/managerService"
import checarObjVazio from "../../utils/checarObjVazio"
import moverArray from "../../utils/moverArray"
import { ArrowLeftOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons';


export default function ConversaAberta({ socket }) {
  const [inputMensagemConteudo, setInputMensagemConteudo] = useState("")
  const { usuarioId, conversaSelecionada, imagemPerfilPadrão, conversas, setConversas, mensagens, setMensagens } = useContext(ChatContext)
  
  const verificarEnter = (e) =>  {
    if (e.key === "Enter") {
      enviarMensagem(e);
    }
  }

  useEffect(() => {
    async function getMensagens() {
      const resposta = await managerService.GetMensagensPorConversaUsuario(usuarioId, conversaSelecionada.id)
      setMensagens(resposta)
    }

    getMensagens()
  }, [conversaSelecionada])

  const atualizarBarraLateral = (novaMensagem) => {
    
    const id_conversa = novaMensagem.id_conversa
    const index = conversas.findIndex(({ id }) => id === id_conversa)

    conversas[index].ultima_mensagem = novaMensagem
    setConversas((conversasLista) => moverArray(conversasLista, index, 0))
  }
  const atualizarConversaInativa = async () => {
    if (conversaSelecionada.ativada) return
    
    const index = conversas.findIndex(({ id }) => id === conversaSelecionada.id)
    const newConversas = [...conversas]
    newConversas[index].ativada = true

    await managerService.UpdateConversaAtiva(conversaSelecionada.id)

    socket.emit("enviarConversa", newConversas[index])
    
    setConversas(newConversas)
  }
  const enviarMensagem = async (e) => {
    e.preventDefault()
    
    const dadosParaCriarNovaMensagem = {
      id_conversa: conversaSelecionada.id,
      id_usuario: usuarioId,
      media_url: "nenhuma",
      foi_visualizado: false,
      conteudo: inputMensagemConteudo,
    };
    const { data_cricao, data_atualizacao, media_url, ...dados } = await managerService.CriandoMensagem(dadosParaCriarNovaMensagem)

    const novaMensagem = {
      ...dados,
      pertenceAoUsuarioAtual: true
    }
    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem])
    socket.emit('enviarMensagem', { novaMensagem, receptorId: conversaSelecionada.conversaCom.id });

    atualizarConversaInativa()
    atualizarBarraLateral(novaMensagem)
  
    setInputMensagemConteudo("")
  }

  return (
    <Conversa>
      <HeaderConversaAberta>
        <BotaoVoltar>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color={Cores.lilas[1]}
            width="10%"
            widthres="15%"
            height="10%"
            marginTop="0%"
            onClick={() => {window.location.reload()}}
            >
              <ArrowLeftOutlined style={{ fontSize: '30px', color: '{Cores.lilas[1]}' }}/>
          </Button>
        </BotaoVoltar>
        <img 
          src={
            conversaSelecionada?.conversaCom?.avatar_url || 
            imagemPerfilPadrão
          } 
          alt="61"  height="70px" width="76px"
        ></img>
        <NomePessoa>
          {conversaSelecionada?.conversaCom?.nome}
        </NomePessoa> 
      </HeaderConversaAberta>
      <CorpoConversaAberta>
        {mensagens?.map((m) => 
          <Mensagem
            key={m.id}
            pertenceAoUsuarioAtual={m.pertenceAoUsuarioAtual} 
            conteudo={m.conteudo} 
            data_criacao={m.data_criacao}
          />
        )}
      </CorpoConversaAberta>
      <FooterConversaAberta>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.lilas[1]}
          width="10%"
          widthres="15%"
          height="10%"
          marginTop="0%"
          onClick={() => {}}
          >
            <PaperClipOutlined style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}/>
        </Button>
        <Input
          placeholder="Mensagem"
          backgroundColor="white"
          borderColor= {Cores.cinza[3]}
          width="90%"
          height="100%"
          minHeight="45px"
          maxHeight="40px"
          paddingRight="2%"
          onKeyPress={verificarEnter}
          onChange={(e) => setInputMensagemConteudo(e.target.value)}
          value={inputMensagemConteudo}
          disabled={checarObjVazio(conversaSelecionada)}
        />
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.lilas[1]}
          width="10%"
          widthres="15%"
          height="10%"
          marginTop="0%"
          onClick={enviarMensagem}
          disabled={checarObjVazio(conversaSelecionada) || !inputMensagemConteudo}
        >
          <SendOutlined style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}/>
        </Button>
      </FooterConversaAberta>
    </Conversa>
  );
};

 