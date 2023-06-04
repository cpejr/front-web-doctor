import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin, Upload } from 'antd';
import React, { useEffect, useRef, useState} from "react";
import { toast } from 'react-toastify';
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from '../../variaveis';
import {
  Botao, BotaoContainer, Container, Divisor, EdicaoContainer, InputAreaTexto, InputContainer, InputImagem, InputImagemContainer, Inputs, InputTextoContainer,
  InputTitulo, Titulo
} from "./Styles";
import { useHistory } from "react-router-dom";
import { sleep } from "../../utils/sleep";

function EdicaoSobreMim() {
  const history = useHistory();
  const [sobreMimDados, setSobreMimDados] = useState({});
  const [carregando, setCarregando] = useState(false);
  const tituloUmRef = useRef(null);
  const textoUmRef = useRef(null);
  const imagemUmRef = useRef(null);
  const tituloDoisRef = useRef(null);
  const textoDoisRef = useRef(null);
  const imagemDoisRef = useRef(null);
  const [houveAlteracao, setHouveAlteracao] = useState(false);
  const [imagens, setImagens] = useState()
  const [imageumUrl, setImageumUrl] = useState()
  const [imagedoisUrl, setImagedoisUrl] = useState()
  const [imagemumAlterada, setImagemumAlterada] = useState(false)
  const [imagemdoisAlterada, setImagemdoisAlterada] = useState(false)

  async function getSobreMimDados() {
    setCarregando(true)
    let dados = await managerService.requisicaoSobreMimDados();
    let imagensPlaceholder = {
      imagem_um: "0",
      imagem_dois: "0"
    }
    imagensPlaceholder.imagem_um = await managerService.GetArquivoPorChave(dados.imagem_um)
    imagensPlaceholder.imagem_dois = await managerService.GetArquivoPorChave(dados.imagem_dois)
    
    setSobreMimDados(dados);
    setImagens(imagensPlaceholder);
    setCarregando(false);
  }
  useEffect(() => {
    getSobreMimDados();
  }, [])

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    console.log(reader)
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const imagemEhValida = (file) => {
    const tiposValidos = ["jpg", "gif", "png", "jpeg", "pjpeg"];
    const tamanhoMaximo = 2 * 1024 * 1024;

    const tipo = file.type.split('/')[1];
    const tamanho = file.size;

    if (!tiposValidos.includes(tipo)){
      toast.error("Tipo de arquivo inválido!")
      return false;
    }

    if (!(tamanho <= tamanhoMaximo)){
      toast.error("Arquivo muito grande!")
      return false
    }

    return true
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (houveAlteracao === false) {toast.error("Altere algum dado!"); return}
    setCarregando(true);
    if (imagemumAlterada) {
        await managerService.updateImagemUmSobreMim(sobreMimDados.id, imageumUrl);
      }
    if (imagemdoisAlterada) {
       await managerService.updateImagemDoisSobreMim(sobreMimDados.id, imagedoisUrl);
      }
    await managerService.atualizarSobreMim(sobreMimDados.id, sobreMimDados.titulo_um,sobreMimDados.texto_um,sobreMimDados.titulo_dois,sobreMimDados.texto_dois);
    setCarregando(false);
    history.push("/web/home")
  };

  const handleCancelar = () => {
    getSobreMimDados();

    imagemUmRef.current.value = null;
    imagemDoisRef.current.value = null;
    history.push("/web/home")
  };

  const antLoadingIcon = (
    <LoadingOutlined style={{ fontSize: 130, color: Cores.azul }} spin />
  );

  if (carregando) return (
    <Spin
      indicator={antLoadingIcon}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
  function preenchendoDados(e) {
    const { value, name } = e.target;
    setSobreMimDados({ ...sobreMimDados, [name]: value });
    setHouveAlteracao(true);
  }
  async function handleChangeUm(info) {
    let ima = {
      imagem_um: "0",
      imagem_dois: "0",
    };
    getBase64(info.file.originFileObj, (url) => {
      setImageumUrl(url);
      setHouveAlteracao(true)
      setImagemumAlterada(true);
      ima.imagem_um = url;
      ima.imagem_dois = imagens.imagem_dois
      setImagens(ima);
    })
    
    
  }
  async function handleChangeDois(info) {
    let ima = {
      imagem_um: "0",
      imagem_dois: "0",
    };
    getBase64(info.file.originFileObj, (url) => {
      setImagedoisUrl(url);
      setHouveAlteracao(true)
      setImagemdoisAlterada(true);
      ima.imagem_um = imagens.imagem_um;
      ima.imagem_dois = url;
      setImagens(ima);
    })
    
    
    
  }

   const uploadButton = (
    <div>
      {carregando ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Container>
      <EdicaoContainer>
        <Titulo>Página sobre mim</Titulo>
          <Inputs onSubmit={handleSubmit}>
            <InputContainer>
              <InputImagemContainer src={imagens?.imagem_um}>
                <Upload
                  // nome de preferência
                  name="imagem_um"
                  // como mostrar as imagens já enviadas, mas não queremos mostrar no nosso programa
                  listType="picture-card"
                  // nome de preferência
                  className="avatar-uploader"
                  // se queremos mostrar os itens já enviados
                  showUploadList={false}
                  // antes tinha a propriedade action, que redirecionava, substituímos por essa para funcionar
                  customRequest={() => {}}
                  // chama a função de beforeUpload
                  beforeUpload={imagemEhValida}
                  // chama a função de handleChange
                  onChange={handleChangeUm}
                >
                  {
                    uploadButton
                  }
                </Upload>
              </InputImagemContainer>
              <InputTextoContainer>
                <InputTitulo 
                  name="titulo_um" 
                  ref={tituloUmRef} 
                  value={sobreMimDados?.titulo_um} 
                  onChange={preenchendoDados}
                />
                <InputAreaTexto
                  name="texto_um"
                  ref={textoUmRef}
                  value={sobreMimDados?.texto_um}
                  onChange={preenchendoDados}
                />
              </InputTextoContainer>
            </InputContainer>
            <Divisor />
            <InputContainer>
              <InputImagemContainer src={imagens?.imagem_dois}>
                <Upload
                  // nome de preferência
                  name="imagem_dois"
                  // como mostrar as imagens já enviadas, mas não queremos mostrar no nosso programa
                  listType="picture-card"
                  // nome de preferência
                  className="avatar-uploader"
                  // se queremos mostrar os itens já enviados
                  showUploadList={false}
                  // antes tinha a propriedade action, que redirecionava, substituímos por essa para funcionar
                  customRequest={() => {}}
                  // chama a função de beforeUpload
                  beforeUpload={imagemEhValida}
                  // chama a função de handleChange
                  onChange={handleChangeDois}
                >
                  {
                    uploadButton
                  }
                </Upload>
              </InputImagemContainer>
              <InputTextoContainer>
                <InputTitulo 
                  name="titulo_dois" 
                  ref={tituloDoisRef} 
                  defaultValue={sobreMimDados?.titulo_dois} 
                />
                <InputAreaTexto
                  name="texto_dois"
                  ref={textoDoisRef}
                  defaultValue={sobreMimDados?.texto_dois}
                />
              </InputTextoContainer>
              <BotaoContainer>
                <Botao type="submit" salvar >Salvar Alterações</Botao>
                <Botao onClick={handleCancelar} type="button" cancelar>Descartar Alterações</Botao>
              </BotaoContainer>
            </InputContainer>
          </Inputs>
      </EdicaoContainer>
    </Container>
  );
}

export default EdicaoSobreMim;
