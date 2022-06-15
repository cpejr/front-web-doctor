import React, { useState } from "react";
import ModalEnvioFormulario from "../../components/ModalEnvioFormulario";
import { Modal } from "antd";
import Button from "../../styles/Button";


function CriacaoFormulario() {
  const [modalEnvio, setModalEnvio] = useState(false);

  async function fechandoModal() {
    setModalEnvio(false);
  }

  async function abrindoModal() {
    setModalEnvio(true);
  }
  return (
    <>
      <div>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color="green"
          fontSize="1em"
          textDecoration="underline"
          height="50px"
          onClick={() => abrindoModal()}
        >
          Marcar Agendamento
        </Button>
      </div>
      <Modal
        visible={modalEnvio}
        onCancel={fechandoModal}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalEnvioFormulario />
      </Modal>
    </>
  );
}

export default CriacaoFormulario;
