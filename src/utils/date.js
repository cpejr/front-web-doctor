export function brParaPadrao(strDataOriginal){
    const [dia, mes, ano] = strDataOriginal.split("/")
    if (!dia?.length || !mes?.length || !ano?.length) throw new Error()
    const dataFormatada = `${ano.padStart(4,"00")}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`
    // if (new Date(dataFormatada) === "Invalid date") {
    //     return "Data invalida"
    // } else {
    //     return dataFormatada;
    // }
    console.log(isNaN(new Date(dataFormatada)))
    console.log(new Date(dataFormatada))

    //nao pega o invalid date
}