import React from "react";

//tentativa de fazer um input estilizado com diferentes informacoes, mas falhei
function CustomFieldTemplate({label, children}) {
    return (
      <div >
        <label>{label}</label>
    
        {children} 
      </div>
    );
  }

  export default CustomFieldTemplate;