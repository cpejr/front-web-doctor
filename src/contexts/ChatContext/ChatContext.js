import React, { createContext, useRef, useState, useEffect } from 'react';
import { recebeUsuarioId } from '../../services/auth';

const imagemPerfilPadrão =
  'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const usuarioId = recebeUsuarioId();
  const [conversas, setConversas] = useState([]);
  const [conversaSelecionada, setConversaSelecionada] = useState({});
  const [mensagens, setMensagens] = useState([]);
  // Ref para uso em casos específicos de useEffects --> Prevenir erros
  const inputMensagemRef = useRef(null);

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
