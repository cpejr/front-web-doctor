import React, { useState, useEffect,forwardRef } from "react"; 
import Button from "../../styles/Button"; 
import { LoadingOutlined } from "@ant-design/icons"; 
import { Spin } from "antd"; 
import AddToast from "../AddToast/AddToast"; 
import * as managerService from "../../services/ManagerService/managerService"; 
import { redirecionamento, sleep } from "../../utils/sleep"; 
import { recebeTipo, usuarioAutenticado } from "../../services/auth"; 
import { Cores } from "../../variaveis"; 
import { toast } from "react-toastify"; 
import { 
  ContainerModalExcluir, 
  ConteudoModalExcluir, 
  ContainerFooterModalExcluir, 
} from "./Styles"; 
 
const ModalExcluirConversa = forwardRef((props, ref) => {
  const [carregandoDeletar, setCarregandoDeletar] = useState(false);  
  const antIconModal = ( 
    <LoadingOutlined style={{ fontSize: 15, color: Cores.azul }} spin /> 
  ); 
 
  async function deletarConversa() {
    setCarregandoDeletar(true);
    await managerService.deletarConversa(props.id);
    props.fecharModal();
    document.location.reload(true);
    setCarregandoDeletar(false);
  
  }
  
  return ( 
    <div> 
      <ContainerModalExcluir> 
        <ConteudoModalExcluir> 
          Tem certeza que quer excluir essa conversa?
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
            onClick={() => deletarConversa()} 
          > 
            {carregandoDeletar ? ( 
              <Spin indicator={antIconModal} /> 
            ) : ( 
              "Confirmar" 
            )} 
          </Button> 
        </ContainerFooterModalExcluir> 
      </ContainerModalExcluir> 
    </div> 
  ); 
}); 
 
export default ModalExcluirConversa;