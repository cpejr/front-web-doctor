import React, { useState } from 'react';
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';
import { Modal } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { toast } from 'react-toastify';
import {
  Container,
  Formulario,
  CriarFormularioTitulo,
  TitulosInput,
  TextoInstrucao,
  Instrucao,
  CaixaInputs,
} from './Styles';
import Input from '../../styles/Input';
import { Cores } from '../../variaveis';
import { Select, SelectContainer } from './SelectTeste';
import Button from '../../styles/Button';
import { sleep } from '../../utils/sleep';
import * as managerService from '../../services/ManagerService/managerService';

function CriacaoFormulario() {
  const [uiSchema, setUiSchema] = useState('');
  const [schema, setSchema] = useState('');
  const [estado, setEstado] = useState({});
  const [camposVazios, setCamposVazios] = useState(false);
  const [carregandoCriacao, setCarregandoCriacao] = useState();
  const [campoPerguntas, setCampoPerguntas] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
  );

  const errors = {};
  const referenciaInputNulos = {
    finalidade: false,
    tipo: false,
    titulo: false,
    urgencia: false,
  };

  const TirandoCabecalho = {
    showFormHead: false,
  };

  function mudancasForm(newSchema, newUiSchema) {
    setEstado({ ...estado, perguntas: newSchema });
    setSchema(newSchema);
    setUiSchema(newUiSchema);
    let aux = JSON.parse(newSchema);
    if (JSON.stringify(aux.properties) === '{}') {
      setCampoPerguntas(false);
    } else {
      setCampoPerguntas(true);
    }
  }

  function preenchendoDados(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    setEstado({ ...estado, [e.target.name]: e.target.value });
  }

  async function requisicaoFormularios() {
    if (!estado.finalidade) errors.finalidade = true;
    if (!estado.tipo) errors.tipo = true;
    if (!estado.urgencia) errors.urgencia = true;
    if (!estado.titulo) errors.titulo = true;

    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, referenciaInputNulos)) {
      if (campoPerguntas === false) {
        toast.warn('Adicione alguma pergunta.');
      } else {
        setCarregandoCriacao(true);
        await managerService.CriarFormulario(estado);
        await sleep(1500);
        setCarregandoCriacao(false);
        window.location.href = '/web/listaformularios';
      }
    } else {
      setCarregandoCriacao(true);
      toast.warn('Preencha todos os campos corretamente');
      setCarregandoCriacao(false);
    }
  }

  return (
    <Container>
      <CaixaInputs>
        <CriarFormularioTitulo>Criar Formulário</CriarFormularioTitulo>
        <TitulosInput>Título:</TitulosInput>
        <Input
          placeholder='Titulo'
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          fontSize='1em'
          width='100%'
          name='titulo'
          camposVazios={camposVazios.titulo}
          onChange={preenchendoDados}
        ></Input>
        <TitulosInput>Tipo:</TitulosInput>
        <Input
          placeholder='Tipo'
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          fontSize='1em'
          width='100%'
          name='tipo'
          camposVazios={camposVazios.tipo}
          onChange={preenchendoDados}
        ></Input>
        <TitulosInput>Finalidade:</TitulosInput>
        <Input
          placeholder='Finalidade'
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          fontSize='1em'
          width='100%'
          name='finalidade'
          camposVazios={camposVazios.finalidade}
          onChange={preenchendoDados}
        ></Input>
        <TitulosInput>Urgência:</TitulosInput>
        <SelectContainer borderWidth='2px' width='100%'>
          <Select
            id='urgencia'
            marginTop='0px'
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            name='urgencia'
            camposVazios={camposVazios.urgencia}
            onChange={preenchendoDados}
          >
            <option value=''>Urgência</option>
            <option value='1' borderColor={Cores.azul}>
              1
            </option>
            <option value='2' borderColor={Cores.azul}>
              2
            </option>
            <option value='3' borderColor={Cores.azul}>
              3
            </option>
          </Select>
        </SelectContainer>
        <Button
          height='50px'
          width='100%'
          backgroundColor={Cores.lilas[1]}
          borderColor={Cores.azul}
          color={Cores.branco}
          fontSize='1.5em'
          style={{ marginTop: '4%' }}
          fontSizeMedia='1.2em'
          onClick={() => requisicaoFormularios()}
          fontWeight='bold'
        >
          {carregandoCriacao ? <Spin indicator={antIcon} /> : <div>CRIAR</div>}
        </Button>
      </CaixaInputs>
      <Instrucao>
        <TextoInstrucao>
          Aperte no + verde abaixo. Em seguida, clique em “Create”. Mantenha o
          campo “Object Name” preenchido com um nome único e escreva a pergunta
          em “Display Name”. Escolha o tipo do input em “Input Type”. Quando
          finalizar, clique em “Criar”.
        </TextoInstrucao>
      </Instrucao>
      <Formulario>
        <FormBuilder
          schema={schema}
          uischema={uiSchema}
          onChange={mudancasForm}
          mods={TirandoCabecalho}
        />
      </Formulario>
    </Container>
  );
}

export default CriacaoFormulario;
