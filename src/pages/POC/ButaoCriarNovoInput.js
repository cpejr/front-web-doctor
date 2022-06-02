import React from "react";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";

//esse arquivo que cria o botao para criar novos inputs

function ArrayFieldTemplate(props) {
  return (
    <div className={props.className}>
      {props.items &&
        props.items.map((element) => (
          <div key={element.key} className={element.className}>
            <div>{element.children}</div>
            {element.hasMoveDown && (
              <Button
              width="100%"
              height="20px"
              backgroundColor={Cores.cinza[3]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={element.onReorderClick(
                element.index,
                element.index + 1
              )}
            >
              Baixo
            </Button>
            )}
            {element.hasMoveUp && (
              <Button
              width="100%"
              height="20px"
              backgroundColor={Cores.cinza[3]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={element.onReorderClick(
                element.index,
                element.index - 1
              )}
            >
              Cima
            </Button>
            )}
            <Button
              width="100%"
              height="20px"
              backgroundColor={Cores.lilas[2]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={element.onDropIndexClick(element.index)}
            >
              Apagar
            </Button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <div className="row">
          <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
            <Button
              width="100%"
              height="20px"
              backgroundColor={Cores.lilas[1]}
              borderColor={Cores.azul}
              color={Cores.branco}
              fontSize="1.5em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={props.onAddClick}
            >
              +
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}

export default ArrayFieldTemplate;
