import React, {useState} from "react";
import { Modal, Spin } from "antd";
import ModalAdicionarIndicacao  from "../ModalAdicionarIndicacao";
import ModalExcluirIndicacao from "../ModalExcluirIndicacao";
import ModalAlterarIndicacao from "../ModalAlterarIndicacao";
import Button from "../../styles/Button";
import {Cores, Fontes} from "../../variaveis"; 
import {PlusSquareOutlined,EditOutlined,DeleteOutlined,LoadingOutlined} from "@ant-design/icons";
import {
    Informacoes,
    TituloInfo,
    DescricaoInformacoes,
    Container,
    BotoesIndicacao} from "./Styles"

function ModalIndicacao (props){
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



    return(  
        <Container>
            <Informacoes>
                <TituloInfo>{props.indicacao.Titulo}</TituloInfo>
                <DescricaoInformacoes  disabled >{props.indicacao.Descricao}</DescricaoInformacoes>   
            </Informacoes>
            <BotoesIndicacao>
                <Button
                gap="5px"
                backgroundColor={Cores.azul}
                fontSize="1.3em"
                width="70%"
                borderColor={Cores.azulEscuro}
                color={Cores.branco}
                height="100%"
                onClick={()=>abrirModalAdicionarIndicacao()}
                >
                Adicionar Indicação <PlusSquareOutlined/>
                </Button>
                <Button
                gap="5px"
                backgroundColor={Cores.azul}
                fontSize="1.3em"
                width="70%"
                borderColor={Cores.azulEscuro}
                color={Cores.branco}
                height="100%"
                onClick={()=>abrirModalAlterarIndicacao()}
                >
                Alterar Indicação <EditOutlined/>
                </Button>
                <Button
                gap="5px"
                backgroundColor={Cores.azul}
                fontSize="1.3em"
                width="50%"
                borderColor={Cores.azulEscuro}
                color={Cores.branco}
                height="30px"
                onClick={()=>abrirModalExcluirIndicacao()}
                >
                Excluir Indicação <DeleteOutlined/>
                </Button>
            </BotoesIndicacao>
                <Modal
                    visible={modalAdicionarIndicacao}
                    onCancel={() => fecharModalAdicionarIndicacao()}
                    footer={null}
                    width={"100%"}
                    centered={true}
                    >
                    <ModalAdicionarIndicacao
                    fechandoModal={()=> fecharModalAdicionarIndicacao() }
                    />
                </Modal> 

                <Modal
                    visible={modalExcluirIndicacao}
                    onCancel={() => fecharModalExcluirIndicacao()}
                    footer={null}
                    width={"100%"}
                    centered={true}
                    >
                        <ModalExcluirIndicacao
                        fechandoModal={()=> fecharModalExcluirIndicacao() }
                        />
                </Modal> 

                <Modal
                    visible={modalAlterarIndicacao}
                    onCancel={() => fecharModalAlterarIndicacao()}
                    footer={null}
                    width={"100%"}
                    centered={true}
                    >
                        <ModalAlterarIndicacao
                        fechandoModal={()=> fecharModalAlterarIndicacao() }
                        />
                </Modal>
        </Container>
    )
}
export default ModalIndicacao;