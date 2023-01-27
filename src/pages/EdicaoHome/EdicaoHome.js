import React, { useState, useEffect } from "react";
import {
  Corpo, Container,
  TituloPaginaEdicao,
  BoxGenerico,
  MetadeEsquerda,
  MetadeDireita,
  BotaoGenerico,
  ContainerBotoes,
  BoxBemVindo,
  BoxTime,
  BoxSaibaMais,
  BoxAlterarImagem,
  BoxVideo,
  TituloCentral,
  SubtituloCentral,
  TituloEsquerda,
  Conteudo,
  TextoSaibaMais
} from "./Styles";
import { useHistory } from "react-router-dom";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

import Input from "../../styles/Input";


/*const [tituloUm, setTituloUm] = useState([]);

async function GetTituloUm() {
 await managerService.GetInputsHome().then((res) => {
    setTiluloUm(res.dadosTituloUm);
  });
}

useEffect(() => {
  GetTituloUm();
}, []);
*/
function EdicaoHome() {
  //const history = useHistory();

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
              <BotaoGenerico>Alterar vídeo</BotaoGenerico>
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
            <BotaoGenerico>INSCREVA-SE</BotaoGenerico>
            <div>Já possui conta?</div>
            <BotaoGenerico>ENTRAR</BotaoGenerico>
          </BoxTime>

          <BoxSaibaMais backgroundColor="#7757A0"
          >
            <TituloEsquerda>
            <Input
              //placeholder= {tituloUm}
              value="Sobre mim"
              textAlign="center"
              backgroundColor="#7757A0"
              color={Cores.branco}
              fontSize="1em"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              />
            </TituloEsquerda>
            <Conteudo color={Cores.branco}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
            <TextoSaibaMais color={Cores.branco}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>

          <BoxAlterarImagem
          >
            <BotaoGenerico>
              <BotaoGenerico>Alterar Imagens</BotaoGenerico>
            </BotaoGenerico>
          </BoxAlterarImagem>

        </MetadeEsquerda>

        <MetadeDireita>

          <BoxSaibaMais
            backgroundColor="#FBCB4C"
          >
            <Input
              //placeholder= {tituloUm}
              value="Indicações e Sugestões"
              textAlign="center"
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              />
            <Conteudo color={Cores.preto}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
            <TextoSaibaMais color={Cores.preto}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>

          <BoxSaibaMais backgroundColor={Cores.lilas[1]}
          >
            <Input
              //placeholder= {tituloUm}
              value="Comentarios e Depoimentos"
              textAlign="center"
              backgroundColor={Cores.lilas[1]}
              color={Cores.branco}
              fontSize="1em"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              />
            <Conteudo color={Cores.branco}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
            <TextoSaibaMais color={Cores.branco}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>
          <BoxSaibaMais>
          <Input
              //placeholder= {tituloUm}
              value="Grupo AMIE (Epilepsia)"
              textAlign="center"
              backgroundColor={Cores.branco}
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              />
            <Conteudo color={Cores.preto}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book.</Conteudo>
            <TextoSaibaMais color={Cores.preto}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>

          <BotaoGenerico color={Cores.verde}>Salvar Alterações</BotaoGenerico>
          <BotaoGenerico color={Cores.verde}>Cancelar Alterações</BotaoGenerico>

        </MetadeDireita>
      </Container>
    </Corpo>
  );
}

export default EdicaoHome;
