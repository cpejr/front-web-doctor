import React, { createContext, useRef, useState, useEffect } from 'react';
import { recebeEmail } from '../../services/auth';
import * as managerService from '../../services/ManagerService/managerService';

const imagemPerfilPadrão =
  'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [usuarioId, setUsuarioId] = useState('');
  const [conversas, setConversas] = useState([]);
  const [conversaSelecionada, setConversaSelecionada] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const inputMensagemRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function GetUsuarioId() {
      const {
        dadosUsuario: { id },
      } = await managerService.GetDadosUsuario(recebeEmail());
      if (isMounted) setUsuarioId(id);
    }

    GetUsuarioId();

    return () => (isMounted = false);
  }, [recebeEmail]);

  return (
    <ChatContext.Provider
      value={{
        usuarioId,
        conversaSelecionada,
        setConversaSelecionada,
        conversas,
        setConversas,
        mensagens,
        setMensagens,
        imagemPerfilPadrão,
        inputMensagemRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
