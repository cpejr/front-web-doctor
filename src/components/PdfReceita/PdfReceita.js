import React from 'react';
import { Document } from '@react-pdf/renderer';
import {
    Logo,
    TextoPdf,
    Corpo,
} from "./Styles";

const PdfReceita = () => {
    return (
        <Document>
            <Corpo size="A4">
                <Logo />
                <TextoPdf>Nome do paciente:</TextoPdf>
                <TextoPdf>Data de nascimento:</TextoPdf>
                <TextoPdf>Receita</TextoPdf>
            </Corpo>
        </Document>
    );
}

export default PdfReceita;