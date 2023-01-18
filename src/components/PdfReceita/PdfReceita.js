import React from 'react';
import { Document } from '@react-pdf/renderer';
import {
    Logo,
    TextoPdf,
    Corpo,
    TituloPDF
} from "./Styles";
import LogoPdf from "../../assets/LogoPdf.png"

const PdfReceita = () => {
    return (
        <Document>
            <Corpo size="A4">
                <Logo src={LogoPdf}/>
                <TextoPdf>Nome do paciente:</TextoPdf>
                <TextoPdf>Data de nascimento:</TextoPdf>
                <TituloPDF>Titulo:</TituloPDF>
                <TextoPdf>Receita</TextoPdf>
            </Corpo>
        </Document>
    );
}

export default PdfReceita;