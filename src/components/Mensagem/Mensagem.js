import React from 'react';
import dayjs from 'dayjs';
import { MensagemEnviada, DataHoraMensagem } from './Styles';

export default function Mensagem({
  scrollRef,
  pertenceAoUsuarioAtual,
  conteudo,
  data_criacao,
}) {
  return (
    <MensagemEnviada
      pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}
      ref={scrollRef}
    >
      <pre style={{whiteSpace : "pre-wrap", marginBottom : "0px"}}>
        {conteudo}
      </pre>
      <DataHoraMensagem>
        {dayjs(data_criacao).format('DD/MM/YYYY HH:mm')}
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}
