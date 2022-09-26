import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React, { useState, useEffect } from "react";
import * as managerService from "../../services/ManagerService/managerService";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";

function TesteUpload() {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
      setLoading(true);
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
      setLoading(true);
    }

    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [carregando, setCarregando] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null)

  async function handleChange(info) {
    // Get this url from response in real world.
    setLoading(true);
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  }

  async function pegandoIdUsuario() {
    setCarregando(true);
    const email = "aspas@gmail.com"
    const resposta = await managerService.GetDadosUsuario(email);
    setIdUsuario(resposta.dadosUsuario.id)
    setCarregando(false);
  }

  useEffect(() => {
    pegandoIdUsuario();
  }, []);

  async function upload() {
    if (imageUrl) {
      setCarregando(true);
      await managerService.UpdateFotoDePerfil(idUsuario, imageUrl);
      setCarregando(false);
    } else {
      toast.error("Selecione uma foto para enviar!");
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={() => {}}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <button onClick={upload}>
        {carregando ? <LoadingOutlined /> : <>Botão </>}
      </button>
      <AddToast />
    </>
  );
}

export default TesteUpload;
