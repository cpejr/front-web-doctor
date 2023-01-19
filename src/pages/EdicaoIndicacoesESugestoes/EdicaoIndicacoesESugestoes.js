import React, { useState} from "react";
import {Cores} from "../../variaveis";
import { Modal, Spin } from "antd";
import { sleep } from "../../utils/sleep";
import {PlusSquareOutlined,EditOutlined,DeleteOutlined,LoadingOutlined} from "@ant-design/icons";
import {Container,
        EdicaoContainer,
        ContainerInterno,
        ContainerDireita,
        Titulo,
        Descricao,
        ContainerSugestao,
        Divisoria,
        Informacoes,
        TituloInfo,
        BotoesIndicacao,
        DescricaoInformacoes} from "./Styles";
import ModalAdicionarIndicacao  from "../../components/ModalAdicionarIndicacao";
import ModalExcluirIndicacao from "../../components/ModalExcluirIndicacao";
import ModalAlterarIndicacao from "../../components/ModalAlterarIndicacao";
import ModalIndicacao from "../../components/ModalIndicacao";
import Button from "../../styles/Button";

function EdicaoIndicacoesESugestoes (){
    const [atualizando,setAtualizando] = useState();
    const [dadosIndicacao,setDadosIndicacao] = useState({Titulo:"",Descricao:""});
    const [modalAdicionarIndicacao, setModalAdicionarIndicacao] = useState(false);
    const [modalExcluirIndicacao, setModalExcluirIndicacao] = useState(false);
    const [modalAlterarIndicacao, setModalAlterarIndicacao] = useState(false);
    const [modalIndicacao,setModalIndicacao] = useState(false)

    const antIcon = (
        <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
      );

    async function alterarIndicacao(nomeIndicacao){
        var largura = window.innerWidth;
        console.log("Largura:",largura);
        if(largura < 600){
            setDadosIndicacao({"Titulo": nomeIndicacao,
                "Descricao":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non velit sed dolor viverra cursus. Quisque bibendum est eu massa mollis, eu tincidunt nisi lacinia. Morbi ut augue pulvinar, rhoncus libero eget, hendrerit velit. Integer faucibus diam velit, id luctus leo ultrices ac. Mauris laoreet rhoncus pellentesque. Aliquam risus ex, fringilla dapibus mauris at, viverra volutpat mauris. Mauris mi ante, semper vitae bibendum at, dignissim ac augue. Etiam non magna enim. Cras eu posuere libero, ut lobortis nulla. Etiam eget eros erat. Mauris ullamcorper rutrum augue, eget venenatis diam semper eu. Praesent sodales, ipsum sed fermentum imperdiet, risus ipsum viverra."});
            
            abrirModalIndicacao();
        }else{
            setAtualizando(true);
            await sleep(1500);
            setDadosIndicacao({"Titulo": nomeIndicacao,
                "Descricao":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non velit sed dolor viverra cursus. Quisque bibendum est eu massa mollis, eu tincidunt nisi lacinia. Morbi ut augue pulvinar, rhoncus libero eget, hendrerit velit. Integer faucibus diam velit, id luctus leo ultrices ac. Mauris laoreet rhoncus pellentesque. Aliquam risus ex, fringilla dapibus mauris at, viverra volutpat mauris. Mauris mi ante, semper vitae bibendum at, dignissim ac augue. Etiam non magna enim. Cras eu posuere libero, ut lobortis nulla. Etiam eget eros erat. Mauris ullamcorper rutrum augue, eget venenatis diam semper eu. Praesent sodales, ipsum sed fermentum imperdiet, risus ipsum viverra."});
            
            setAtualizando(false);  
        }
          
    }

    async function abrirModalAdicionarIndicacao() {
        setModalAdicionarIndicacao(true);
    }

    async function abrirModalExcluirIndicacao() {
        setModalExcluirIndicacao(true);
    }

    async function abrirModalAlterarIndicacao() {
        setModalAlterarIndicacao(true);
    }

    async function abrirModalIndicacao(){
        setModalIndicacao(true);
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

    async function fecharModalIndicacao(){
        setModalIndicacao(false);
    }
    
    return(
        <Container>
            <EdicaoContainer>
                <ContainerInterno>
                    <div>
                        <Titulo>Indicações e Sugestões<br/>Exames e profissionais</Titulo>
                        <Descricao>São sugestões de profissionais de confiança para realização de exames ou tratamentos específicos, não oferecidos em meu consultório:</Descricao>
                    </div>
                    <ContainerSugestao>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Eletroneuromiografia")}}
                            >
                            Eletroneuromiografia
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Ressonância Magnética em Epilespsia")}}
                            >
                            Ressonância Magnética em Epilespsia
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Punção Lombar")}}
                            >
                            Punção Lombar
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Fisioterapia CPAP")}}
                            >
                            Fisioterapia CPAP
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Fonoaudiologia - Apneia de Sono")}}
                            >
                            Fonoaudiologia - Apneia de Sono
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Odontologia do Sono")}}
                            >
                            Odontologia do Sono
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Psicologia - TCC Insônia")}}
                            >
                            Psicologia - TCC Insônia
                        </Button>
                        <Button
                            fontSize="14px"
                            width="100%"
                            backgroundColor={Cores.cinza[7]}
                            borderColor={Cores.azulEscuro}
                            height="36px"
                            onClick={()=>{alterarIndicacao("Avaiação Neuropsicológica")}}
                            >
                            Avaiação Neuropsicológica
                        </Button>
                    </ContainerSugestao>
                </ContainerInterno>

                <Divisoria/>

                <ContainerDireita>
                    <Informacoes>
                    {atualizando ? (<Spin indicator={antIcon}/>
                    ):(
                        <>
                        <TituloInfo>{dadosIndicacao.Titulo}</TituloInfo>
                        <DescricaoInformacoes type="" disabled >{dadosIndicacao.Descricao}</DescricaoInformacoes>
                        </>
                    )}
                        
                    </Informacoes>
                    <BotoesIndicacao>
                        <Button
                        gap="5px"
                        backgroundColor={Cores.azul}
                        fontSize="1.7em"
                        width="100%"
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
                        fontSize="1.7em"
                        width="100%"
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
                        fontSize="1.7em"
                        width="100%"
                        borderColor={Cores.azulEscuro}
                        color={Cores.branco}
                        height="100%"
                        onClick={()=>abrirModalExcluirIndicacao()}
                        >
                        Excluir Indicação <DeleteOutlined/>
                        </Button>
                    </BotoesIndicacao>
                </ContainerDireita>
            </EdicaoContainer>

            
            <Modal
            visible={modalAdicionarIndicacao}
            onCancel={() => fecharModalAdicionarIndicacao()}
            footer={null}
            width={"50%"}
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
            width={"50%"}
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
            width={"50%"}
            centered={true}
            >
                <ModalAlterarIndicacao
                fechandoModal={()=> fecharModalAlterarIndicacao() }
                />
            </Modal>

            <Modal
            visible={modalIndicacao}
            onCancel={() => fecharModalIndicacao()}
            footer={null}
            width={"100%"}
            centered={true}
            >
                <ModalIndicacao
                indicacao={{Titulo:dadosIndicacao.Titulo,Descricao:dadosIndicacao.Descricao}}
                fechandoModal={()=> fecharModalIndicacao() }
                />
            </Modal>

            
        </Container>

        )
}

export default EdicaoIndicacoesESugestoes;