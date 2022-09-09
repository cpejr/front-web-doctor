import React from 'react';
import dayjs from 'dayjs';
import { MensagemEnviada, DataHoraMensagem } from './Styles';

export default function Mensagem({
  pertenceAoUsuarioAtual,
  conteudo,
  data_criacao,
}) {
  return (
    <MensagemEnviada pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}>
      {conteudo}
      <DataHoraMensagem>
        {dayjs(data_criacao).format('DD/MM/YYYY HH:mm')}
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}
