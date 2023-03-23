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
  const [reacarregaPagina, setRecarregaPagina] = useState(false);
  const [imgAtual, setImgAtual] = useState(0);
  const [img0, setImg0] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [carregandoImg, setCarregandoImg] = useState(false);
  const history = useHistory();
  const [indexImagens, setIndexImagens] = useState([]);


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

  function avancaCarrosselEsquerda(posicao) {
    if (posicao === 0) {
      posicao = 3
    }
    else {
      posicao -= 1;
    }
    setImgAtual(posicao);
  }

  function avancaCarrosselDireita(posicao) {
    if (posicao === 3) {
      posicao = 0
    }
    else {
      posicao += 1;
    }
    setImgAtual(posicao);
  }
  async function atualizandoDados() {
    setCarregando(true);
    

    for (const index of indexImagens) {
      if (index === 0) {
        await managerService.updateImagemCarrossel(0, img0);
      }
      else if (index === 1) {
        await managerService.updateImagemCarrossel(1, img1);
      }
      else if (index === 2) {
        await managerService.updateImagemCarrossel(2, img2);
      }
      else if (index === 3) {
        await managerService.updateImagemHomes(homes.id, img3);
      }
    }

    if (houveAlteracao === true) {
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
    }

    if (houveAlteracao === true || alterouCarrossel === true) {
        toast.success("Página Home Editada Com Sucesso!");
        setRecarregaPagina(true);
    } else {
      toast.error("Altere algum dado!");
    }

    setTimeout(() => {
      document.location.reload(true);
      setRecarregaPagina(false);
    }, 4500);

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
    const novoIndexImagem = [...indexImagens, imgAtual];
    setIndexImagens(novoIndexImagem);
    setCarregandoImg(true);
    setAlterouCarrossel(true);

    if (imgAtual === 0) {
      getBase64(info.file.originFileObj, (url) => {
        setImg0(url);
        setCarregandoImg(false);

      });
    }

    if (imgAtual === 1) {
      getBase64(info.file.originFileObj, (url) => {
        setImg1(url);
        setCarregandoImg(false);
      });
    }

    if (imgAtual === 2) {
      getBase64(info.file.originFileObj, (url) => {
        setImg2(url);
        setCarregandoImg(false);
      });
    }

    if (imgAtual === 3) {
      getBase64(info.file.originFileObj, (url) => {
        setImg3(url);
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
    setImg3(arquivo);
    const responses = await Promise.all(carrossel);
    setImg0(responses[0]);
    setImg1(responses[1]);
    setImg2(responses[2]);
    setCarregandoImg(false);
  }

  useEffect(() => {
    setandoImagemCarrossel();
  }, [homes]);

  var imagens = [img0, img1, img2, img3];

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
                  avancaCarrosselEsquerda(imgAtual);
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
                  <InteriorCarrossel style={{ backgroundImage: `url(${imagens[imgAtual]})` }}
                  >
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
                  avancaCarrosselDireita(imgAtual);
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
              onClick={() => atualizandoDados()}
            >
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <div>Salvar Alterações</div>
              )}
            </Button>
            <Button
              backgroundColor={Cores.vermelhoClaro}
              borderRadius="3px"
              borderWidth="3px"
              borderColor={Cores.vermelho}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="1.2em"
              height="50px"
              width="90%"
              marginTop="0%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              fontSizeMedia361="0.9em"
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
