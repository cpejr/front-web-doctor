import React, { useEffect } from "react";
import dayjs from "dayjs";
import { MensagemEnviada, DataHoraMensagem } from "./Styles";
import { FilePdfOutlined, PictureOutlined } from "@ant-design/icons";
import { Cores } from "../../variaveis";
import axios from 'axios';

export default function Mensagem({
  scrollRef,
  pertenceAoUsuarioAtual,
  conteudo,
  media_url,
  data_criacao,
  tipo,
}) {

  useEffect(() => {
    console.log(media_url);
  }, []);

  const downloadFile = async () => {
    const response = await axios.get(media_url, { responseType: 'arraybuffer' });
    console.log(response);
    const blob = new Blob([response.data], { type: 'application/octet-stream' });
    console.log(blob);
    const url = URL.createObjectURL(blob);
    console.log(url);
    window.open(blob, '_blank');
  };
  return (
    <MensagemEnviada
      pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}
      ref={scrollRef}
    >
      {(tipo !== "TEXTO") ? (
        <a href="#" onClick={downloadFile}>
          {conteudo === "Imagem" ? <PictureOutlined style={{ marginRight: 8, fontSize: 20, color: Cores.azul }} /> :
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
