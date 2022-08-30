import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { toast } from "react-toastify";
import AddToast from "../../components/AddToast/AddToast";
import * as managerService from "../../services/ManagerService/managerService";

function EsqueciSenha() {

    const [email, setEmail] = useState("");
    // const history = useHistory();

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

    async function validacaoEmail(e) {
        setEmail(e.target.value);
        console.log(email);
    };

    async function alterarSenha() {
        const resposta = await managerService.GetDadosPessoais();
        let achei = 0;
        resposta.forEach((usuario) => {
            if (usuario.email === email) {
                achei++;
            }
        })
        if (achei) {
            toast.success("ATUMALAKA!");
            await sleep(3000);
            await managerService.EnviandoEmail(email);
        } else {
            toast.error("Email Inválido");
        }

    }

    return (
        <div>
            <Input
                placeholder="Digite seu email"
                value={email}
                onChange={validacaoEmail}
            />
            <Button
                width="100%"
                height="50px"
                backgroundColor="#434B97"
                borderColor="#151B57"
                color="white"
                fontSize="1.5em"
                fontSizeMedia="1.2em"
                onClick={alterarSenha}
            >
                Recuperar Senha
            </Button>
            <AddToast />
        </div>
    );
}
export default EsqueciSenha;