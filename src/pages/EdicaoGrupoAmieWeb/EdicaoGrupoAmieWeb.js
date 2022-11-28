import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from "antd";

import {
  ContainerEditarGrupoAmieWeb,
  DadosGrupoAmie,
  Botoes,
  TextArea,
  Titulo,
  TheOneAboveAll,
  UploadButton,
  UploadSymbol

} from "./Styles";
import Button from "../../styles/Button";
import { sleep } from "../../utils/sleep";

import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

import { toast } from "react-toastify";
import { CaixaBotaoUpload } from "../../components/ModalAlterarFoto/Styles";


function EdicaoGrupoAmieWeb() {

  const [carregando, setCarregando] = useState(false);
  const [id, setId] = useState();
  const [imagem_um, setImagem_um] = useState();
  const [texto, setTexto] = useState('');
  const [imagem_dois, setImagem_dois] = useState();
  const [alterou, setAlterou] = useState(false);


  async function getAmie() {
    const res = await managerService.getAmie();
    console.log(res);
    setImagem_um(res[0].imagem_um);
    setTexto(res[0].texto);
    setImagem_dois(res[0].imagem_dois);
    setId(res[0].id);
  }


  async function setandoImagens() {
    const chave1 = imagem_um;
    const chave2 = imagem_dois;
    if (chave1 === null || chave1 === "" || chave2 === null || chave2 === "")
      return;
    setCarregando(true);
    const imagem1 = await managerService.GetArquivoPorChave(chave1);
    const imagem2 = await managerService.GetArquivoPorChave(chave2);
    setImagem_um(imagem1);
    setImagem_dois(imagem2);
    await sleep(1500);
    setCarregando(false);
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const uploadButton = (
    <UploadButton>
      {carregando ? <LoadingOutlined /> :
        (
          <UploadSymbol
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Alterar Imagem
            </div>
          </UploadSymbol>
        )}
    </UploadButton>
  );

  async function handleChange1(info) {
    // Get this url from response in real world.
    setCarregando(true);
    getBase64(info.file.originFileObj, (url) => {
      setCarregando(false);
      setImagem_um(url);
      setAlterou(true);
    });
  }

  async function handleChange2(info) {
    // Get this url from response in real world.
    setCarregando(true);
    getBase64(info.file.originFileObj, (url) => {
      setCarregando(false);
      setImagem_dois(url);
      setAlterou(true);
    });
  }

  async function updateAmie() {
    if (alterou) {
      await managerService.UpdateAmie(id, imagem_um, texto, imagem_dois);
    } else {
      toast.error('Selecione uma foto para editar!');
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!');
      setCarregando(true);
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!');
      setCarregando(true);
    }

    return isJpgOrPng && isLt2M;
  };

  useEffect(() => {
    getAmie();
  }, []);

  useEffect(() => {
    console.log(texto)
  }, [texto]);

  useEffect(() => {
    setandoImagens()
  }, [id]);

  return (
    <TheOneAboveAll>
      <ContainerEditarGrupoAmieWeb>
        <Titulo>
          Página Grupo AMIE
        </Titulo>

        <DadosGrupoAmie>
          <Upload
            name='imagem1'
            listType='picture'
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange1}
          >
            {!carregando ? (
              <img
                src={imagem_um}
                alt='imagem1'
                style={{
                  maxHeight: '300px',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : ('')}
            {uploadButton}
          </Upload>
          <TextArea
            value={texto}
            onChange={(event) => {
              setTexto(event.target.value)
              if (!alterou) {
                setAlterou(true)
              }
            }
            }
          ></TextArea>
          <CaixaBotaoUpload>
            <Upload
              name='avatar'
              listType='picture'
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange2}
            >
              {!carregando ? (
                <img
                  src={imagem_dois}
                  alt='imagem2'
                  style={{
                    maxHeight: '300px',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : ('')
              }
              {uploadButton}
            </Upload>
          </CaixaBotaoUpload>
        </DadosGrupoAmie>

        <Botoes>
          <Button
            width='300px'
            height='60px'
            backgroundColor={Cores.cinza[2]}
            color={Cores.branco}
            fontSize='24px'
            onClick={() => (updateAmie())}
          >
            Salvar Alterações
          </Button>
          <Button
            width='300px'
            height='60px'
            backgroundColor={Cores.amarelo}
            fontSize='24px'
          >
            Cancelar Alterações
          </Button>
        </Botoes>

      </ContainerEditarGrupoAmieWeb>

    </TheOneAboveAll>
  )
}
export default EdicaoGrupoAmieWeb;
