import React, { useState } from "react";
import { Modal, Spin } from "antd";
import ModalAdicionarIndicacao from "../ModalAdicionarIndicacao";
import ModalExcluirIndicacao from "../ModalExcluirIndicacao";
import ModalAlterarIndicacao from "../ModalAlterarIndicacao";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Informacoes,
  TituloInfo,
  DescricaoInformacoes,
  Container,
  BotoesIndicacao,
} from "./Styles";

function ModalIndicacao({ dadosIndicacao, carregando }) {
  const [modalAdicionarIndicacao, setModalAdicionarIndicacao] = useState(false);
  const [modalExcluirIndicacao, setModalExcluirIndicacao] = useState(false);
  const [modalAlterarIndicacao, setModalAlterarIndicacao] = useState(false);

  async function abrirModalAdicionarIndicacao() {
    setModalAdicionarIndicacao(true);
  }

  async function abrirModalExcluirIndicacao() {
    setModalExcluirIndicacao(true);
  }

  async function abrirModalAlterarIndicacao() {
    setModalAlterarIndicacao(true);
  }

  async function fecharModalAdicionarIndicacao() {
    setModalAdicionarIndicacao(false);
  }

  async function fecharModalExcluirIndicacao() {
    setModalExcluirIndicacao(false);
  }

  async function fecharModalAlterarIndicacao() {
    setModalAlterarIndicacao(false);
  }

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );

  return (
    <Container>
      <Informacoes style={{ position: "relative" }}>
        {carregando ? (
          <Spin
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            indicator={antIcon}
          />
        ) : (
          <>
            <TituloInfo>{dadosIndicacao.titulo}</TituloInfo>
            <DescricaoInformacoes>
              {dadosIndicacao.descricao}
            </DescricaoInformacoes>
          </>
        )}
      </Informacoes>
      <BotoesIndicacao>
        <Button
          gap="5px"
          backgroundColor={Cores.azul}
          fontSize="1.1em"
          width="100%"
          borderColor={Cores.azulEscuro}
          color={Cores.branco}
          height="100%"
          onClick={abrirModalAdicionarIndicacao}
        >
          Adicionar Indicação <PlusSquareOutlined />
        </Button>
        <Button
          gap="5px"
          backgroundColor={Cores.azul}
          fontSize="1.1em"
          width="100%"
          borderColor={Cores.azulEscuro}
          color={Cores.branco}
          height="100%"
          onClick={abrirModalAlterarIndicacao}
        >
          Alterar Indicação <EditOutlined />
        </Button>
        <Button
          gap="5px"
          backgroundColor={Cores.azul}
          fontSize="1.1em"
          width="100%"
          borderColor={Cores.azulEscuro}
          color={Cores.branco}
          height="30px"
          onClick={abrirModalExcluirIndicacao}
        >
          Excluir Indicação <DeleteOutlined />
        </Button>
      </BotoesIndicacao>
      <Modal
        visible={modalAdicionarIndicacao}
        onCancel={fecharModalAdicionarIndicacao}
        footer={null}
        width={"100%"}
        centered={true}
        destroyOnClose
      >
        <ModalAdicionarIndicacao
          fechandoModal={fecharModalAdicionarIndicacao}
        />
      </Modal>

      <Modal
        visible={modalExcluirIndicacao}
        onCancel={fecharModalExcluirIndicacao}
        footer={null}
        width={"100%"}
        centered={true}
        destroyOnClose
      >
        <ModalExcluirIndicacao fechandoModal={fecharModalExcluirIndicacao} />
      </Modal>

      <Modal
        visible={modalAlterarIndicacao}
        onCancel={fecharModalAlterarIndicacao}
        footer={null}
        width={"100%"}
        centered={true}
        destroyOnClose
      >
        <ModalAlterarIndicacao fechandoModal={fecharModalAlterarIndicacao} />
      </Modal>
    </Container>
  );
}
export default ModalIndicacao;
