import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useState , useEffect} from "react";
import * as managerService from "../../services/ManagerService/managerService";



const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    console.log("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    console.log("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

function TesteUpload() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
 



  async function handleChange(info) {
    // Get this url from response in real world.
    setLoading(true);
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });


  }

  

  async function upload(){
    await managerService.EnviandoImagem( imageUrl );
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
      <button onClick={upload}>botao</button>
  
    </>
  );
}

export default TesteUpload;
