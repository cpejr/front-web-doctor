import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Corpo,
  Container,
  MetadeEsquerda,
  MetadeDireita,
  BoxBemVindo,
  BoxTime,
  BoxSaibaMais,
  BoxAlterarImagem,
  BoxVideo,
  TituloCentral,
  SubtituloCentral,
  TextoSaibaMais,
  ContainerBotoes,
  CarrosselContainer,
  Centro,
  Direita,
  Esquerda,
  InteriorCarrossel,
  CaixaCarregando,
  CaixaUpload,
} from "./Styles";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import Button from "../../styles/Button";
import TextArea from "../../styles/TextArea";
import Input from "../../styles/Input";
import {
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin, Upload } from "antd";
import { toast } from "react-toastify";

function EdicaoHome() {
  const [homes, setHomes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [houveAlteracao, setHouveAlteracao] = useState(false);
  const [alterouCarrossel, setAlterouCarrossel] = useState(false);

  const [imgAtual, setImgAtual] = useState(0);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [carregandoImg, setCarregandoImg] = useState(false);
  const history = useHistory();

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
  );

  async function pegandoDados() {
    setCarregando(true);
    const dadosHomes = await managerService.GetHomes();
    setHomes(dadosHomes);
    setCarregando(false);
  }
  
  function preenchendoDados(e) {
    const { value, name } = e.target;
    setHomes({ ...homes, [name]: value });
    setHouveAlteracao(true);
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  async function atualizandoDados() {
    setCarregando(true);
    await managerService.updateImagemCarrossel(100, img1);
    await managerService.updateImagemCarrossel(101, img2);
    await managerService.updateImagemCarrossel(102, img3);
    await managerService.updateImagemHomes(
      homes.id,
      homes.imagem_quatro,
      img4

      );

    if (houveAlteracao === true || alterouCarrossel === true) {
      await managerService.UpdateDadosHomes(
        homes.id,
        homes.titulo_um,
        homes.texto_um,
        homes.titulo_dois,
        homes.texto_dois,
        homes.titulo_tres,
        homes.texto_tres,
        homes.titulo_quatro,
        homes.texto_quatro,
        homes.video
      );
      setCarregando(false);
      document.location.reload(true);
    } else {
      toast.warn("Altere algum campo!");
      setCarregando(false);
    }
  }

  function cancelarEdicaoHome() {
    history.push("/web/edicaohome");
    document.location.reload(true);
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const antesUpload = (file) => {
    const ehImagem =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/avif";

    if (!ehImagem) {
      toast.error("Insira uma imagem!");
      setCarregandoImg(true);
    }

    const tamanhoPermitido = file.size / 1024 / 1024 < 2;

    if (!tamanhoPermitido) {
      toast.error("Imagem deve ser menor que 2MB!");
      setCarregandoImg(true);
    }

    return ehImagem && tamanhoPermitido;
  };

  async function preenchendoImagem(info) {
    setCarregandoImg(true);
    if (imgAtual === 0) {
      getBase64(info.file.originFileObj, (url) => {
        setImg1(url);
        setCarregandoImg(false);
      });
    }

    if (imgAtual === 1) {
      getBase64(info.file.originFileObj, (url) => {
        setImg2(url);
        setCarregandoImg(false);
      });
    }

    if (imgAtual === 2) {
      getBase64(info.file.originFileObj, (url) => {
        setImg3(url);
        setCarregandoImg(false);
      });
    }

    if (imgAtual === 3) {

      getBase64(info.file.originFileObj, (url) => {
        setImg4(url);
        setCarregandoImg(false);
      });
    }
  }

  async function setandoImagemCarrossel() {
    setCarregandoImg(true);
    const res = await managerService.GetImagensCarrossel();
    
    const carrossel = res.map(({ imagem }) =>
    managerService.GetArquivoPorChave(imagem)
    );
    
    const arquivo = await managerService.GetArquivoPorChave(homes.imagem_quatro);
    setImg4(arquivo);
  
    const responses = await Promise.all(carrossel);
    console.log(arquivo)
    setImg1(responses[0]);
    setImg2(responses[1]);
    setImg3(responses[2]);
    setCarregandoImg(false);
  }

  useEffect(() => {
    setandoImagemCarrossel();
  }, [homes]);

  var imagens = [{ img: img1 }, { img: img2 }, { img: img3 }, { img: img4 }];
console.log(imagens)
  return (
    <Corpo>
      <Container>
        <MetadeEsquerda>
          <BoxBemVindo>
            <TituloCentral>BEM-VINDO AO DOCTOR APP</TituloCentral>
            <SubtituloCentral>
              Conheça melhor o doutor Guilherme Marques
            </SubtituloCentral>
            <BoxVideo>
              <ReactPlayer url={homes.video} width="100%" height="100%" />
            </BoxVideo>

            <Input
              value={homes.video}
              textAlign="left"
              backgroundColor={Cores.azulClaro}
              borderColor={Cores.azul}
              borderWidth="2px"
              color={Cores.preto}
              fontSize="1em"
              width="70%"
              height="40px"
              marginLeft="10%"
              marginBottom="5%"
              name="video"
              onChange={preenchendoDados}
              paddingLeft="3%"
            ></Input>
          </BoxBemVindo>
          <BoxTime>
            <TituloCentral>VENHA FAZER PARTE DO TIME</TituloCentral>
            <SubtituloCentral>
              Para ter acesso a chat com o doutor, marcar exames e muito mais
            </SubtituloCentral>
            <Button
              backgroundColor="green"
              borderRadius="3px"
              borderWidth="1px"
              borderColor={Cores.preto}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="15px"
              height="50px"
              width="60%"
              marginTop="0%"
              marginBottom="6%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              widthMedia560="60%"
            >
              INSCREVA-SE
            </Button>
            <SubtituloCentral>Já possui conta?</SubtituloCentral>
            <Button
              backgroundColor="green"
              borderRadius="3px"
              borderWidth="1px"
              borderColor={Cores.preto}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="15px"
              height="50px"
              width="60%"
              marginTop="0%"
              marginBottom="4%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              widthMedia560="60%"
            >
              ENTRAR
            </Button>
          </BoxTime>
          <BoxSaibaMais
            backgroundColor="#7757A0"
            borderColor="#7757A0"
            fontSize="140%"
          >
            <TextArea
              value={homes.titulo_um}
              textAlign="left"
              backgroundColor="#7757A0"
              color={Cores.branco}
              fontSize="140%"
              width="100%"
              borderWidth="0px"
              marginLeft="10%"
              name="titulo_um"
              onChange={preenchendoDados}
              paddingLeft="10%"
            />
            <TextArea
              backgroundColor="#7757A0"
              color={Cores.branco}
              width="100%"
              height="auto"
              minHeight="190px"
              borderWidth="0px"
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              overflow="auto"
              value={homes.texto_um}
              name="texto_um"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.branco}>Saiba Mais</TextoSaibaMais>
          </BoxSaibaMais>
          <BoxAlterarImagem>
            <CarrosselContainer>
              <Esquerda
                onClick={() => {
                  imgAtual > 0 && setImgAtual(imgAtual - 1);
                  console.log(imgAtual)
                }}
              >
                <LeftOutlined style={{ fontSize: 25 }} />
              </Esquerda>
              {carregandoImg ? (
                <CaixaCarregando>
                  <Spin size="small" indicator={antIcon} />
                </CaixaCarregando>
              ) : (
                <>
                  <InteriorCarrossel
                  
                   
                  ><img src= 'data:image/jpeg;base64,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'></img>
                  
                    <Centro>
                      <CaixaUpload>
                        <Upload
                          showUploadList={false}
                          beforeUpload={antesUpload}
                          onChange={preenchendoImagem}
                        >
                          Alterar Imagens
                        </Upload>
                      </CaixaUpload>
                    </Centro>
                  </InteriorCarrossel>
                </>
              )}
              <Direita
                onClick={() => {
                  imgAtual < imagens.length - 1 && setImgAtual(imgAtual + 1);
                  console.log(imgAtual)
                }}
              >
                <RightOutlined style={{ fontSize: 25 }} />
              </Direita>
            </CarrosselContainer>
          </BoxAlterarImagem>
        </MetadeEsquerda>
        <MetadeDireita>
          <BoxSaibaMais backgroundColor="#FBCB4C" borderColor="#FBCB4C">
            <TextArea
              textAlign="left"
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              fontSize="140%"
              width="100%"
              marginTop="2%"
              borderWidth="0px"
              value={homes.titulo_dois}
              name="titulo_dois"
              onChange={preenchendoDados}
              paddingLeft="10%"
            />
            <TextArea
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              width="100%"
              height="auto"
              minHeight="190px"
              marginTop="2%"
              borderWidth="0px"
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              lineBreak="auto"
              value={homes.texto_dois}
              name="texto_dois"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.preto}>Saiba Mais</TextoSaibaMais>
          </BoxSaibaMais>
          <BoxSaibaMais
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.lilas[1]}
          >
            <TextArea
              textAlign="left"
              backgroundColor={Cores.lilas[1]}
              color={Cores.branco}
              fontSize="140%"
              width="100%"
              marginTop="2%"
              borderWidth="0px"
              value={homes.titulo_tres}
              name="titulo_tres"
              onChange={preenchendoDados}
              paddingLeft="10%"
            />
            <TextArea
              backgroundColor={Cores.lilas[1]}
              color={Cores.branco}
              width="100%"
              height="auto"
              minHeight="190px"
              marginTop="2%"
              borderWidth="0px"
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              lineBreak="auto"
              value={homes.texto_tres}
              name="texto_tres"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.branco}>Saiba Mais</TextoSaibaMais>
          </BoxSaibaMais>
          <BoxSaibaMais borderColor="white">
            <TextArea
              textAlign="left"
              backgroundColor={Cores.branco}
              color={Cores.preto}
              fontSize="140%"
              width="100%"
              marginTop="2%"
              borderWidth="0px"
              value={homes.titulo_quatro}
              name="titulo_quatro"
              onChange={preenchendoDados}
              paddingLeft="10%"
            />
            <TextArea
              backgroundColor={Cores.branco}
              color={Cores.preto}
              width="100%"
              minHeight="190px"
              height="auto"
              marginTop="2%"
              borderWidth="0px"
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              lineBreak="auto"
              value={homes.texto_quatro}
              name="texto_quatro"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.preto}>Saiba Mais</TextoSaibaMais>
          </BoxSaibaMais>
          <ContainerBotoes>
            <Button
              backgroundColor="#434B97"
              borderRadius="3px"
              borderWidth="3px"
              borderColor={Cores.preto}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.branco}
              fontSize="1.2em"
              height="50px"
              width="90%"
              marginTop="0%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              onClick={atualizandoDados}
            >
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <div>Salvar Alterações</div>
              )}
            </Button>
            <Button
              backgroundColor={Cores.azulClaro}
              borderRadius="3px"
              borderWidth="3px"
              borderColor={Cores.azul}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="1.2em"
              height="50px"
              width="90%"
              marginTop="0%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              onClick={cancelarEdicaoHome}
            >
              Cancelar Alterações
            </Button>
          </ContainerBotoes>
        </MetadeDireita>
      </Container>
    </Corpo>
  );
}

export default EdicaoHome;
