export function brParaPadrao(strDataOriginal){
    const [dia, mes, ano] = strDataOriginal.split("/")
    if (!dia?.length || !mes?.length || !ano?.length) throw new Error()
    if (mes !== "02"){
        if ( mes % 2 === 0 && dia > "30" )
            return "Data Invalida"
    } else {
        if ( dia > "28" )
            return "Data Invalida"
    }
    if (ano > new Date().getFullYear()){
        return "Data Invalida"
    }
    const dataFormatada = `${ano.padStart(4,"00")}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`
    //isNaN false = existe
    if (isNaN(new Date(dataFormatada)) === false) { 
        return dataFormatada 
    } else {
        return "Data Invalida" 
    }     
}