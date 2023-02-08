import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import {
  Corpo, Container,
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
} from "./Styles";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import Button from "../../styles/Button";
import TextArea from "../../styles/TextArea";
import Input from "../../styles/Input";
import CarrosselEditarHome from "../../components/CarrosselEditarHome.js/CarrosselEditarHome";

function EdicaoHome() {
  const [homes, setHomes] = useState([]);
  const history = useHistory();

  async function pegandoDados() {
    const dadosHomes = await managerService.GetHomes();
    setHomes(dadosHomes);

  }

  function preenchendoDados(e) {
    const { value, name } = e.target;
    setHomes({ ...homes, [name]: value });

    console.log(homes)
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  async function atualizandoDados() {
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
  }

  function cancelarEdicaoHome() {
    history.push("/web/edicaohome");
  }

  return (
    <Corpo>
      <Container>
        <MetadeEsquerda>
          <BoxBemVindo
          >
            <TituloCentral>
              BEM-VINDO AO DOCTOR APP
            </TituloCentral>
            <SubtituloCentral>
              Conheça melhor o doutor Guilherme Marques
            </SubtituloCentral>
            <BoxVideo>
              <ReactPlayer
                url={homes.video}
                width='100%'
                height='100%'
              />
            </BoxVideo>

            <Input
              value={homes.video}
              textAlign="left"
              backgroundColor={Cores.azulClaro}
              borderColor={Cores.azul}
              borderWidth='2px'
              color={Cores.preto}
              fontSize="1em"
              width="70%"
              height="40px"
              marginLeft="10%"
              marginBottom="5%"
              name="video"
              onChange={preenchendoDados}
              paddingLeft="3%"
            >
            </Input>
          </BoxBemVindo>
          <BoxTime
          >
            <TituloCentral>
              VENHA FAZER PARTE DO TIME
            </TituloCentral>
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
            <SubtituloCentral>
              Já possui conta?
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
              borderWidth='0px'
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
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              overflow="auto"
              value={homes.texto_um}
              name="texto_um"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.branco}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>
          <BoxAlterarImagem
          >
            <CarrosselEditarHome />
          </BoxAlterarImagem>
        </MetadeEsquerda>
        <MetadeDireita>
          <BoxSaibaMais
            backgroundColor="#FBCB4C"
            borderColor="#FBCB4C"
          >
            <TextArea
              textAlign="left"
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              fontSize="140%"
              width="100%"
              marginTop="2%"
              borderWidth='0px'
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
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              lineBreak="auto"
              value={homes.texto_dois}
              name="texto_dois"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.preto}>
              Saiba Mais
            </TextoSaibaMais>
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
              borderWidth='0px'
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
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              lineBreak="auto"
              value={homes.texto_tres}
              name="texto_tres"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.branco}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>
          <BoxSaibaMais
            borderColor="white"
          >
            <TextArea
              textAlign="left"
              backgroundColor={Cores.branco}
              color={Cores.preto}
              fontSize="140%"
              width="100%"
              marginTop="2%"
              borderWidth='0px'
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
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="100%"
              textAlign="left"
              lineBreak="auto"
              value={homes.texto_quatro}
              name="texto_quatro"
              onChange={preenchendoDados}
            />
            <TextoSaibaMais color={Cores.preto}>
              Saiba Mais
            </TextoSaibaMais>
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
              Salvar Alterações
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
