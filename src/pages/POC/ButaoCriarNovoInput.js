import React from "react";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";

//esse arquivo que cria o botao para criar novos inputs

function ArrayFieldTemplate(props) {
    return (
      <div>
        {props.items.map(element => element.children)}
        {props.canAdd && <Button 
        width="100%"
        height="20px"
        backgroundColor={Cores.lilas[1]}
        borderColor={Cores.azul}
        color={Cores.branco}
        fontSize="1.5em"
        fontWeight="bold"
        fontSizeMedia="1.2em"
        onClick={props.onAddClick}>+</Button>}
      </div>
    );
  }


export default ArrayFieldTemplate;
