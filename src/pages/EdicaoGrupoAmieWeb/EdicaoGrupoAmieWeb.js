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
  UploadContainer,
  UploadButton,

} from "./Styles";
import Button from "../../styles/Button";
import { sleep } from "../../utils/sleep";

import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

import { toast } from "react-toastify";
import { CaixaBotaoUpload } from "../../components/ModalAlterarFoto/Styles";


function EdicaoGrupoAmieWeb() {

  const [carregando, setCarregando] = useState(true);
  const [id, setId] = useState();
  const [imagem_um, setImagem_um] = useState();
  const [texto, setTexto] = useState('');
  const [imagem_dois, setImagem_dois] = useState();
  const [alterou, setAlterou] = useState(false);


  async function getAmie() {
    const res = await managerService.getAmie();
    console.log(res[0]);
    setImagem_um(res[0].imagem_um);
    setTexto(res[0].texto);
    setImagem_dois(res[0].imagem_dois);
    setId(res[0].id);
  }


  async function setandoImagens() {
    const imagem1 = await managerService.GetArquivoPorChave(imagem_um);
    const imagem2 = await managerService.GetArquivoPorChave(imagem_dois);
    setImagem_um(imagem1);
    setImagem_dois(imagem2);
    await sleep(1000);
    setCarregando(false);
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  async function handleChange(index, info) {
    // Get this url from response in real world.
    setCarregando(true);
    getBase64(info.file.originFileObj, (url) => {
      setCarregando(false);
      setAlterou(true);
      if (index === 1) { setImagem_um(url); }
      else { setImagem_dois(url); }
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
    setandoImagens();
  }, []);

  useEffect(() => {
    console.log(texto);
  }, [texto]);

  return (
    <TheOneAboveAll>
      <ContainerEditarGrupoAmieWeb>
        <Titulo>
          Página Grupo AMIE
        </Titulo>

        <DadosGrupoAmie>

          {carregando ? <LoadingOutlined /> :
            (
              <UploadContainer
                src={imagem_um}
              >
                <UploadButton>
                  <Upload
                    name='imagem1'
                    listType='picture'
                    showContainerList={false}
                    beforeUpload={beforeUpload}
                    onChange={(e) => handleChange(1, e)}
                  >
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Alterar Imagem
                    </div>
                  </Upload>
                </UploadButton>
              </UploadContainer>
            )}

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
          <UploadContainer
            src={imagem_dois}
          >
            {carregando ? <LoadingOutlined /> :
              (
                <Upload
                  name='imagem2'
                  listType='picture'
                  showContainerList={false}
                  beforeUpload={beforeUpload}
                  onChange={(e) => handleChange(2, e)}
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Alterar Imagem
                  </div>
                </Upload>
              )}
          </UploadContainer>
          {/* <CaixaBotaoUpload>
            <Upload
              name='imagem2'
              listType='picture'
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={(e) => handleChange(2, e)}
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
          </CaixaBotaoUpload> */}
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
