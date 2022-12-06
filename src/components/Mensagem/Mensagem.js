import React from "react";
import dayjs from "dayjs";
import { MensagemEnviada, DataHoraMensagem } from "./Styles";
import { FilePdfOutlined, PictureOutlined } from "@ant-design/icons";
import { Cores } from "../../variaveis";

export default function Mensagem({
  scrollRef,
  pertenceAoUsuarioAtual,
  conteudo,
  media_url,
  data_criacao,
}) {
  return (
    <MensagemEnviada
      pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}
      ref={scrollRef}
    >
      {media_url ? (
        <a href={media_url} target="_blank" rel="noopener noreferrer">
          {conteudo === "Imagem" ? <PictureOutlined  style={{ marginRight: 8, fontSize: 20, color: Cores.azul }} />:
          <FilePdfOutlined
            style={{ marginRight: 8, fontSize: 20, color: Cores.azul }}
          />}
        </a>
      ) : (
        <></>
      )}
      {conteudo}
      <DataHoraMensagem>
        {dayjs(data_criacao).format("DD/MM/YYYY HH:mm")}
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}
