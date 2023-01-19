import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Titulo, Container, ContainerInputs } from "./Styles";
import { Cores } from "../../variaveis";
import { DeleteOutlined } from "@ant-design/icons";


function ModalExcluirIndicacao (props) {



    return(
        <Container>
            <Titulo>Excluir Indicação:</Titulo>
            <ContainerInputs>
                <Select
                    id="indicacao"
                    backgroundColor={Cores.cinza[7]}
                    width="100%"
                    >
                    
                    <option>Escolher indicação para deletar</option>
                    <option>Opção 1</option>
                    <option>Opção 2</option>
                    <option>Opção 3</option>
                </Select>
            </ContainerInputs>
            <Button
              gap="5px"
              backgroundColor={Cores.azul}
              fontSize="1.5em"
              width="80%"
              borderColor={Cores.azulEscuro}
              color={Cores.branco}
              height="50px"
              marginTop="10%"
              >
               Excluir Indicação <DeleteOutlined/>
            </Button>
        </Container>

    )

}


export default ModalExcluirIndicacao;