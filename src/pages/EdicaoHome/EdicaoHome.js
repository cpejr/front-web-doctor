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
  TextoSaibaMais,
  ScrollSobreMim
} from "./Styles";
import { useHistory } from "react-router-dom";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

import Input from "../../styles/Input";

function EdicaoHome() {
  //const history = useHistory();
  const [homes, setHomes] = useState([]);


  async function pegandoDados() {
    const dadosHomes = await managerService.GetHomes();
    setHomes(dadosHomes);
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
            <Input
              value="Sobre mim"
              textAlign="center"
              backgroundColor="#7757A0"
              color={Cores.branco}
              fontSize="120%"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              marginLeft="10px"
            />
            <Input
              value="Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book."
              backgroundColor="#7757A0"
              color={Cores.branco}
              width="100%"
              height="auto"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
              textAlign="left"
              overflow="auto"
            />
            <ScrollSobreMim>

              <Conteudo
                color={Cores.branco}
              >
                {homes.map((value) => (
                  <div>"{value.titulo_um}"</div>
                ))}
                {homes.map((value) => (
                  <div>"{value.texto_um}"</div>
                ))}
              </Conteudo>
            </ScrollSobreMim>

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
              value="Indicações e Sugestões"
              textAlign="center"
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              fontSize="120%"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
            />
            <Input
              value="Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book."
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              width="100%"
              height="auto"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
              textAlign="left"
              lineBreak="auto"
            />
            <Conteudo>
              {homes.map((value) => (
                <div>"{value.titulo_dois}"</div>
              ))}
              {homes.map((value) => (
                <div>"{value.texto_dois}"</div>
              ))}
            </Conteudo>
            <TextoSaibaMais color={Cores.preto}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>

          <BoxSaibaMais backgroundColor={Cores.lilas[1]}
          >
            <Input
              value="Comentarios e Depoimentos"
              textAlign="center"
              backgroundColor={Cores.lilas[1]}
              color={Cores.branco}
              fontSize="120%"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
            />
            <Input
              value="Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book."
              backgroundColor={Cores.lilas[1]}
              color={Cores.branco}
              width="100%"
              height="auto"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
              textAlign="left"
              lineBreak="auto"
            />
            <Conteudo>
              {homes.map((value) => (
                <div>"{value.titulo_tres}"</div>
              ))}
              {homes.map((value) => (
                <div>"{value.texto_tres}"</div>
              ))}
            </Conteudo>
            <TextoSaibaMais color={Cores.branco}>
              Saiba Mais
            </TextoSaibaMais>
          </BoxSaibaMais>
          <BoxSaibaMais>
            <Input
              value="Grupo AMIE (Epilepsia)"
              textAlign="center"
              backgroundColor={Cores.branco}
              color={Cores.preto}
              fontSize="120%"
              width="100%"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
            />
            <Input
              value="Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
              Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
              when an unknown printer took a galley
              of type and scrambled it to make a type
              specimen book."
              backgroundColor={Cores.branco}
              color={Cores.preto}
              width="100%"
              height="auto"
              marginTop="2%"
              name="titulo"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
              textAlign="left"
              lineBreak="auto"
            />
            <Conteudo>
              {homes.map((value) => (
                <div>"{value.titulo_quatro}"</div>
              ))}
              {homes.map((value) => (
                <div>"{value.texto_quatro}"</div>
              ))}
            </Conteudo>
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
