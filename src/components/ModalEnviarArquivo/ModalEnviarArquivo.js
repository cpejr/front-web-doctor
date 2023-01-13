import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "../../styles/Button";
import {
  LoadingOutlined,
  FilePdfOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Spin, Upload } from "antd";
import AddToast from "../AddToast/AddToast";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";
import { Cores } from "../../variaveis";
import {
  ContainerModalExcluir,
  ContainerFooterModalExcluir,
  CaixaLoader,
  Titulo,
  ArquivoSelecionado,
} from "./Styles";
import { toast } from "react-toastify";

const ModalEnviarArquivo = forwardRef((props, ref) => {
  const [carregandoDeletar, setCarregandoDeletar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [file, setFile] = useState();
  const [urlArquivo, setUrlArquivo] = useState();
  const [nomeArquivo, setNomeArquivo] = useState();
  const antIconModal = (
    <LoadingOutlined style={{ fontSize: 15, color: Cores.azul }} spin />
  );

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  async function handleChange(info) {
    // Get this url from response in real world.
    setCarregando(true);
    getBase64(info.file.originFileObj, (url) => {
      setCarregando(false);
      setFile(url);
      setNomeArquivo(info.file.name);
    });
  }

  const TestantoTipoArquivo = (file) => {
    const isPdf = file.type === "application/pdf";

    if (!isPdf) {
      toast.error("Transforme para pdf antes de enviar");
      setCarregando(true);
    }

    return isPdf;
  };

  async function enviarArquivo() {
    if (file) {
      setCarregandoDeletar(true);
      const res = await managerService.enviarArquivoMensagem(file);
      setUrlArquivo(res);

      props.pegandoDados();

      setFile(null);
      setNomeArquivo(null);

      // Toda vez que confirmar o envio, vai pegar os dados lá em conversa aberta em EnviandoMensagemComArquivo()

      props.fecharModal();

      //document.location.reload(true);
      setCarregandoDeletar(false);
    } else {
      toast.error("Selecione um arquivo para enviar!");
    }
  }

  useImperativeHandle(ref, () => ({
    getPDF: () => {
      let res = {};

      if (file && urlArquivo) {
        res = {
          file: file,
          url: urlArquivo,
        };

        return res;
      }

      return null;
    },
  }));

  return (
    <div>
      <ContainerModalExcluir>
        <Titulo>Selecione uma arquivo para enviar:</Titulo>
        {file ? (
          <ArquivoSelecionado>
            <FilePdfOutlined style={{ fontSize: 20 }} />
            <div>{nomeArquivo}</div>
          </ArquivoSelecionado>
        ) : (
          <Upload
            name="file"
            showUploadList={false}
            beforeUpload={TestantoTipoArquivo}
            onChange={handleChange}
            style={{ width: "400" }}
          >
            <Button
              color={Cores.azulEscuro}
              backgroundColor={Cores.branco}
              fontWeight="normal"
              borderColor={Cores.cinza[3]}
              height="28px"
              width="100%"
              widthMedia670="50%"
              fontSize="13px"
              padding="5px"
              gap="5px"
            >
              <FolderOpenOutlined style={{ fontSize: 18 }} />
              Abrir Pastas
            </Button>
          </Upload>
        )}
        <ContainerFooterModalExcluir>
          <Button
            color={Cores.azulEscuro}
            fontWeight="normal"
            borderColor={Cores.cinza[3]}
            height="28px"
            width="35%"
            widthMedia670="50%"
            fontSize="13px"
            onClick={props.fecharModal}
          >
            Cancelar
          </Button>

          <Button
            backgroundColor={Cores.lilas[2]}
            color={Cores.azulEscuro}
            borderColor={Cores.azulEscuro}
            fontWeight="normal"
            height="28px"
            width="35%"
            widthMedia670="50%"
            fontSize="13px"
            onClick={() => {
              enviarArquivo();
            }}
          >
            {carregandoDeletar ? (
              <CaixaLoader>
                <Spin indicator={antIconModal} />
              </CaixaLoader>
            ) : (
              "Enviar"
            )}
          </Button>
        </ContainerFooterModalExcluir>
      </ContainerModalExcluir>
    </div>
  );
});

export default ModalEnviarArquivo;
