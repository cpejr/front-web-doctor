import React from "react";
import { Cores} from "../../variaveis";
import { useHistory } from "react-router-dom";
import Button from "../../styles/Button";
import {
  Body,
  Board,
  Notificacao,
  TextoNotificacao,
  CaixaTexto,
  BotoesColuna,
  BotaoCanto,
  IconeAdicionar,
} from "./Styles";

function HomeSecretaria() {
  const history = useHistory();

  return (
    <div>
      <Body>
        <Board>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
          <Notificacao>
            <CaixaTexto>
              <h3>
                <TextoNotificacao>
                  Formulário Pré-consulta respondido por Nome do Usuário
                </TextoNotificacao>
              </h3>
            </CaixaTexto>
            <BotoesColuna>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/respostaformulario")}
              >
                VISUALIZAR
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azul}
                color={Cores.preto}
                fontSize="1.5em"
                fontWeight="medium"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia="2em"
                onClick={() => history.push("/web/chat")}
              >
                INICIAR CHAT
              </Button>
            </BotoesColuna>
          </Notificacao>
        </Board>
        <BotaoCanto>
          <Button
            width="50%"
            height="50px"
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            justify-content="flex-end"
            color={Cores.azul}
            fontSize="1.5em"
            fontWeight="medium"
            fontSizeMedia="1em"
            fontSizeMedia950="1.2em"
            boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            onClick={() => history.push("/cadastro")}
          >
            Cadastrar Novo Paciente
            <IconeAdicionar>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill={Cores.azul}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </IconeAdicionar>
          </Button>
        </BotaoCanto>
      </Body>
    </div>
  );
}

export default HomeSecretaria;
