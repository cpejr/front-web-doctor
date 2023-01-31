import React, { useState, useEffect, useRef } from "react";
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
  const [homes, setHomes] = useState([]);
  //const tituloUmRef = useRef(null);


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
              type={homes.map((value) => (
                <div>"{value.titulo_um}"</div>
              ))}
              textAlign="center"
              backgroundColor="#7757A0"
              color={Cores.branco}
              fontSize="120%"
              width="100%"
              marginTop="2%"
              borderWidth='0px'
              marginLeft="10%"
              value={homes.titulo_um}
              name="titulo_um"
              onChange={preenchendoDados}
            />
             
            <Input
              backgroundColor="#7757A0"
              color={Cores.branco}
              width="100%"
              height="auto"
              marginTop="2%"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
              textAlign="left"
              overflow="auto"
              value={homes.texto_um}
              name="texto_um"
              onChange={preenchendoDados}
            />
            <ScrollSobreMim>

              <Conteudo
                color={Cores.branco}
              >
                
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
            
              <BotaoGenerico>Alterar Imagens</BotaoGenerico>
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
              borderWidth='0px'
              value={homes.titulo_dois}
              name="titulo_dois"
              onChange={preenchendoDados}
            />
            <Input
              backgroundColor="#FBCB4C"
              color={Cores.preto}
              width="100%"
              height="auto"
              marginTop="2%"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
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
              borderWidth='0px'
              value={homes.titulo_tres}
              name="titulo_tres"
              onChange={preenchendoDados}
            />
            <Input
              backgroundColor={Cores.lilas[1]}
              color={Cores.branco}
              width="100%"
              height="auto"
              marginTop="2%"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
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
          <BoxSaibaMais>
            <Input
              value="Grupo AMIE (Epilepsia)"
              textAlign="center"
              backgroundColor={Cores.branco}
              color={Cores.preto}
              fontSize="120%"
              width="100%"
              marginTop="2%"
              borderWidth='0px'
              value={homes.titulo_quatro}
              name="titulo_quatro"
              onChange={preenchendoDados}
            />
            <Input

              backgroundColor={Cores.branco}
              color={Cores.preto}
              width="100%"
              height="auto"
              marginTop="2%"
              borderWidth='0px'
              paddingLeft="10%"
              paddingRight="10%"
              fontSize="120%"
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

          <BotaoGenerico color={Cores.verde}>Salvar Alterações</BotaoGenerico>
          <BotaoGenerico color={Cores.verde}>Cancelar Alterações</BotaoGenerico>

        </MetadeDireita>
      </Container>
    </Corpo>
  );
}

export default EdicaoHome;
