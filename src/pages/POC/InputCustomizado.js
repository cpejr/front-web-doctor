import React from "react";

//tentativa de fazer um input estilizado com diferentes informacoes, mas falhei
function CustomFieldTemplate(props) {
    const {id, classNames, label, help, required, description, errors, children} = props;
    return (
      <div className={classNames}>
        <label htmlFor={id}>{label}{required ? "*" : null}</label>
        {description}
        {children}
        {errors}
        {help}
      </div>
    );
  }

  export default CustomFieldTemplate;