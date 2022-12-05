import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from '../../variaveis';
import {
  Botao, BotaoContainer, Container, Divisor, EdicaoContainer, InputAreaTexto, InputContainer, InputImagem, InputImagemContainer, Inputs, InputTextoContainer,
  InputTitulo, Titulo
} from "./Styles";

function EdicaoSobreMim() {
  const [sobreMimDados, setSobreMimDados] = useState({});
  const [carregando, setCarregando] = useState(false);
  const tituloUmRef = useRef(null);
  const textoUmRef = useRef(null);
  const imagemUmRef = useRef(null);
  const tituloDoisRef = useRef(null);
  const textoDoisRef = useRef(null);
  const imagemDoisRef = useRef(null);

  async function getSobreMimDados() {
    setCarregando(true)

    const dados = await managerService.requisicaoSobreMimDados();
    setSobreMimDados(dados);
    
    setCarregando(false);
  }
  useEffect(() => {
    getSobreMimDados();
  }, [])

  const imagemEhValida = (file) => {
    const tiposValidos = ["jpg", "gif", "png", "jpeg", "pjpeg"];
    const tamanhoMaximo = 2 * 1024 * 1024;

    const tipo = file.type.split('/')[1];
    const tamanho = file.size;

    if (!tiposValidos.includes(tipo)){
      toast.error("Tipo de arquivo inválido!")
      return false;
    }

    if (!(tamanho <= tamanhoMaximo)){
      toast.error("Arquivo muito grande!")
      return false
    }

    return true
  }
  const imagemOnChange = (e) => {
    if (!e.target.files.length) return
      
    const nome = e.target.name;
    const file = e.target.files[0];
    const ehImagemUm = nome === "imagem_um";

    if (!imagemEhValida(file)) {
      ehImagemUm
        ? imagemUmRef.current.value = null 
        : imagemDoisRef.current.value = null
      
      return
    }

    const url = URL.createObjectURL(file);
    const novaImagem = ehImagemUm
      ? { imagem_um: { url } } 
      : { imagem_dois: { url } }

    setSobreMimDados((prev) => ({ ...prev, ...novaImagem }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = new FormData(e.target);
    const formDados = Object.fromEntries(dados.entries());

    delete formDados.imagem_um;
    delete formDados.imagem_dois;

    if (!formDados.imagem_um.size) dados.delete("imagem_um");
    if (!formDados.imagem_dois.size) dados.delete("imagem_dois");

    const id = sobreMimDados.id;

    setCarregando(true);
    await managerService.atualizarSobreMim(id, dados);
    setSobreMimDados((prev) => ({ ...prev, ...formDados }));
    setCarregando(false);
  };
  const handleCancelar = () => {
    getSobreMimDados();

    imagemUmRef.current.value = null;
    imagemDoisRef.current.value = null;
  };

  const antLoadingIcon = (
    <LoadingOutlined style={{ fontSize: 130, color: Cores.azul }} spin />
  );

  if (carregando) return (
    <Spin
      indicator={antLoadingIcon}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )

  return (
    <Container>
      <EdicaoContainer>
        <Titulo>Página sobre mim</Titulo>
          <Inputs onSubmit={handleSubmit}>
            <InputContainer>
              <InputImagemContainer src={sobreMimDados?.imagem_um?.url}>
                <InputImagem htmlFor="imagem_um">Alterar Imagem</InputImagem>
                <input 
                  type="file"
                  name="imagem_um"
                  id="imagem_um"
                  ref={imagemUmRef}
                  onChange={imagemOnChange}
                  style={{ display: "none" }} 
                />
              </InputImagemContainer>
              <InputTextoContainer>
                <InputTitulo 
                  name="titulo_um" 
                  ref={tituloUmRef} 
                  defaultValue={sobreMimDados?.titulo_um} 
                />
                <InputAreaTexto
                  name="texto_um"
                  ref={textoUmRef}
                  defaultValue={sobreMimDados?.texto_um}
                />
              </InputTextoContainer>
            </InputContainer>
            <Divisor />
            <InputContainer>
              <InputImagemContainer src={sobreMimDados?.imagem_dois?.url}>
                <InputImagem htmlFor="imagem_dois">Alterar Imagem</InputImagem>
                <input 
                  type="file" 
                  name="imagem_dois" 
                  id="imagem_dois"
                  ref={imagemDoisRef}
                  onChange={imagemOnChange}
                  style={{ display: "none" }} 
                />
              </InputImagemContainer>
              <InputTextoContainer>
                <InputTitulo 
                  name="titulo_dois" 
                  ref={tituloDoisRef} 
                  defaultValue={sobreMimDados?.titulo_dois} 
                />
                <InputAreaTexto
                  name="texto_dois"
                  ref={textoDoisRef}
                  defaultValue={sobreMimDados?.texto_dois}
                />
              </InputTextoContainer>
              <BotaoContainer>
                <Botao type="submit" salvar>Salvar Alterações</Botao>
                <Botao onClick={handleCancelar} type="button" cancelar>Cancelar Alterações</Botao>
              </BotaoContainer>
            </InputContainer>
          </Inputs>
      </EdicaoContainer>
    </Container>
  );
}

export default EdicaoSobreMim;
