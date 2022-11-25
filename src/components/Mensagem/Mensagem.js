import React from "react";
import dayjs from "dayjs";
import { MensagemEnviada, DataHoraMensagem } from "./Styles";
import { MdLink } from "react-icons/md";

export default function Mensagem({
  scrollRef,
  pertenceAoUsuarioAtual,
  conteudo,
  media_url,
  data_criacao,
}) {

  console.log(media_url);
  return (
    <MensagemEnviada
      pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}
      ref={scrollRef}
    >
      <a href={media_url} target="_blank" rel="noopener noreferrer">
        <MdLink style={{ marginRight: 8 }} size={50} color="#222" />
      </a>
      {conteudo}
      <DataHoraMensagem>
        {dayjs(data_criacao).format("DD/MM/YYYY HH:mm")}
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}
