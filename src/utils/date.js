export function brParaPadrao(strDataOriginal){
    const [dia, mes, ano] = strDataOriginal.split("/")
    if (!dia?.length || !mes?.length || !ano?.length) throw new Error()
    const dataFormatada = `${ano.padStart(4,"00")}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`
    if (new Date(dataFormatada).length !== 10) { //refazer para -> === Invalid date
        return "Data invalida"
    } else {
        return dataFormatada;
    }
}