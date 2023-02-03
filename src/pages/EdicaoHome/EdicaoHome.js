import React, { useState, useEffect } from "react";
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
import CarrosselEditarHome from "../../components/CarrosselEditarHome.js/CarrosselEditarHome";

function EdicaoHome() {
  const [homes, setHomes] = useState([]);

  async function pegandoDados() {
    const dadosHomes = await managerService.GetHomes();
    setHomes(dadosHomes);

  }

  function preenchendoDados(e) {
    const { value, name } = e.target;
    setHomes({ ...homes, [name]: value });
  }

  useEffect(() => {
    pegandoDados();
  }, []);



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
                marginLeft="0%"
                fontSizeMedia950="0.9em"
              >
                Alterar vídeo
              </Button>
            </BoxVideo>
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
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              widthMedia560 = "60%"
            >
              INSCREVA-SE
            </Button>
            
            <div>Já possui conta?</div>
 
            <Button
              backgroundColor="green"
              borderRadius="3px"
              borderWidth="1px"
              borderColor={Cores.preto}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="15px"
              height="50px"
              width="50%"
              marginTop="0%"
              marginBottom="4%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
              widthMedia560 = "50%"
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
              backgroundColor="green"
              borderRadius="3px"
              borderWidth="1px"
              borderColor={Cores.preto}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="15px"
              height="50px"
              width="90%"
              marginTop="0%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
            >
              Salvar Alterações
            </Button>
            <Button
              backgroundColor="green"
              borderRadius="3px"
              borderWidth="1px"
              borderColor={Cores.preto}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              color={Cores.preto}
              fontSize="15px"
              height="50px"
              width="90%"
              marginTop="0%"
              marginLeft="0%"
              fontSizeMedia950="0.9em"
            >Cancelar Alterações
            </Button>
          </ContainerBotoes>
        </MetadeDireita>
      </Container>
    </Corpo>
  );
}

export default EdicaoHome;
