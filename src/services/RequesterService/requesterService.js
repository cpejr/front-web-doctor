import api from "../../services/api";

export const logarUsuario = (email, senha) => api.post("/login", {
    email,
    senha,
  });