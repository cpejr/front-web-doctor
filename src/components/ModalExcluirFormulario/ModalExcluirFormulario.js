import React, { useState, useEffect } from "react"; 
import Button from "../../styles/Button"; 
import { LoadingOutlined } from "@ant-design/icons"; 
import { Spin } from "antd"; 
import AddToast from "../AddToast/AddToast"; 
import * as managerService from "../../services/ManagerService/managerService"; 
import { redirecionamento, sleep } from "../../utils/sleep"; 
import { Cores } from "../../variaveis"; 
import { 
  ContainerModalExcluir, 
  ConteudoModalExcluir, 
  ContainerFooterModalExcluir, 
} from "./Styles"; 
 
function ModalExcluirFormulario(props) { 
  const [carregandoDeletar, setCarregandoDeletar] = useState(false);
  const [idFormulario, setIdFormulario] = useState("");  
  const antIconModal = ( 
    <LoadingOutlined style={{ fontSize: 15, color: Cores.azul }} spin /> 
  ); 
 
  async function excluirFormulario() { 
      setCarregandoDeletar(true); 
      await managerService.DeletarFormulario(idFormulario); 
      await sleep(3000); 
      setCarregandoDeletar(false); 
  }
  
  useEffect(() => {
    setIdFormulario(props.formulario.id);
  }, [props]);
 
  return ( 
    <div> 
      <ContainerModalExcluir> 
        <ConteudoModalExcluir> 
          Tem certeza que quer excluir esse formulário? 
        </ConteudoModalExcluir> 
        <ContainerFooterModalExcluir> 
          <Button 
            color={Cores.azulEscuro} 
            fontWeight="normal" 
            borderColor={Cores.cinza[3]} 
            height="28px" 
            width="25%"
            widthMedia670="50%" 
            fontSize="13px" 
            onClick={props.fecharModal} 
          > 
            Cancelar 
          </Button> 
          <Button 
            backgroundColor={Cores.lilas[2]} 
            color={Cores.azulEscuro} 
            borderColor={Cores.azulEscuro} 
            fontWeight="normal" 
            height="28px" 
            width="25%"
            widthMedia670="50%" 
            fontSize="13px" 
            marginLeft="2%" 
            onClick={() => excluirFormulario()} 
          > 
            {carregandoDeletar ? ( 
              <Spin indicator={antIconModal} /> 
            ) : ( 
              "Confirmar" 
            )} 
          </Button> 
        </ContainerFooterModalExcluir> 
      </ContainerModalExcluir> 
      <AddToast /> 
    </div> 
  ); 
} 
 
export default ModalExcluirFormulario;