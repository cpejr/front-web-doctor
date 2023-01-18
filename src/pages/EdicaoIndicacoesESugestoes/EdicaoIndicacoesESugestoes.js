import React, {useEffect, useState} from "react";
import {Cores} from "../../variaveis";
import { Modal, Spin } from "antd";
import { sleep } from "../../utils/sleep";
import {PlusSquareOutlined,EditOutlined,DeleteOutlined,LoadingOutlined} from "@ant-design/icons";
import {Container,
        EdicaoContainer,
        ContainerInterno,
        Titulo,
        Descricao,
        ContainerSugestao,
        Sugestao,
        Divisoria,
        Informacoes,
        TituloInfo,
        BotoesIndicacao,
        Indicacao,
        DescricaoInformacoes} from "./Styles";
import { wait } from "@testing-library/user-event/dist/utils";
import  ModalAdicionarIndicacao  from "../../components/ModalAdicionarIndicacao";

function EdicaoIndicacoesESugestoes (){
    const [atualizando,setAtualizando] = useState();
    const [dadosIndicacao,setDadosIndicacao] = useState({"Titulo":"Eletroneuromiografia",
                                                        "Descricao":""});
    const [modalAdicionarIndicacao, setModalAdicionarIndicacao] = useState(false);

    const antIcon = (
        <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
      );

    async function alterarIndicacao(nomeIndicacao){
        setAtualizando(true);
        await sleep(1500);
        setDadosIndicacao({"Titulo": nomeIndicacao,
            "Descricao":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non velit sed dolor viverra cursus. Quisque bibendum est eu massa mollis, eu tincidunt nisi lacinia. Morbi ut augue pulvinar, rhoncus libero eget, hendrerit velit. Integer faucibus diam velit, id luctus leo ultrices ac. Mauris laoreet rhoncus pellentesque. Aliquam risus ex, fringilla dapibus mauris at, viverra volutpat mauris. Mauris mi ante, semper vitae bibendum at, dignissim ac augue. Etiam non magna enim. Cras eu posuere libero, ut lobortis nulla. Etiam eget eros erat. Mauris ullamcorper rutrum augue, eget venenatis diam semper eu. Praesent sodales, ipsum sed fermentum imperdiet, risus ipsum viverra."});
        
        setAtualizando(false);    
    }

    async function abrirModalAdicionarIndicacao() {
        setModalAdicionarIndicacao(true);
    }

    async function fechandoModalAdicionarIndiacao() {
        setModalAdicionarIndicacao(false);
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
                        <Sugestao onClick={()=>{alterarIndicacao("Eletroneuromiografia")}}>Eletroneuromiografia</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Ressonância Magnética em Epilespsia")}}>Ressonância Magnética em Epilespsia</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Punção Lombar")}}>Punção Lombar</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Fisioterapia CPAP")}}>Fisioterapia CPAP</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Fonoaudiologia - Apneia de Sono")}}>Fonoaudiologia - Apneia de Sono</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Odontologia do Sono")}}>Odontologia do Sono</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Psicologia - TCC Insônia")}}>Psicologia - TCC Insônia</Sugestao>
                        <Sugestao onClick={()=>{alterarIndicacao("Avaiação Neuropsicológica")}}>Avaiação Neuropsicológica</Sugestao>
                    </ContainerSugestao>
                </ContainerInterno>
                <Divisoria></Divisoria>
                <ContainerInterno>
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
                        <Indicacao
                            onClick={ () => abrirModalAdicionarIndicacao() }
                        >Adicionar Indicação <PlusSquareOutlined /> </Indicacao>
                        <Indicacao>Alterar Indicação <EditOutlined /></Indicacao>
                        <Indicacao>Excluir Indicação <DeleteOutlined /></Indicacao>
                    </BotoesIndicacao>
                </ContainerInterno>
            </EdicaoContainer>

            
            <Modal
            visible={modalAdicionarIndicacao}
            onCancel={() => fechandoModalAdicionarIndiacao()}
            footer={null}
            width={"50%"}
            centered={true}
            >
                <ModalAdicionarIndicacao
                fechandoModal={()=> fechandoModalAdicionarIndiacao() }
                />
            </Modal> 
        </Container>

        )
}

export default EdicaoIndicacoesESugestoes;