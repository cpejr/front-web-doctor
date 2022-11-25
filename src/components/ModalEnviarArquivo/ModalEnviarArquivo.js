import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "../../styles/Button";
import {
  LoadingOutlined,
  PlusOutlined,
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
  CaixaBotaoUpload,
  Titulo,
} from "./Styles";
import { toast } from "react-toastify";

const ModalEnviarArquivo = forwardRef((props, ref) => {
  const [carregandoDeletar, setCarregandoDeletar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [file, setFile] = useState();
  const [urlArquivo, setUrlArquivo] = useState();
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
    });
  }
  
  async function enviarArquivo() {
    if (file) {
      setCarregandoDeletar(true);
      const res = await managerService.enviarArquivoMensagem(file);
      setUrlArquivo(res);

      props.pegandoDados();

      setFile(null);

      // Toda vez que confirmar o envio, vai pegar os dados lá em conversa aberta em EnviandoMensagemComArquivo()

      props.fecharModal();

      //document.location.reload(true);
      setCarregandoDeletar(false);
    } else {
      toast.error("Selecione uma arquivo para enviar!");
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
          <FilePdfOutlined />
        ) : (
          /*  <CaixaBotaoUpload>
           <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
         
        </CaixaBotaoUpload> */
          <Upload name="file" showUploadList={false} onChange={handleChange}>
            <Button icon={<FolderOpenOutlined />}>
              <FolderOpenOutlined />
              Click to Upload
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
              "Confirmar"
            )}
          </Button>
        </ContainerFooterModalExcluir>
      </ContainerModalExcluir>
    </div>
  );
});

export default ModalEnviarArquivo;
