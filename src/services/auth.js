export const CHAVE_TOKEN = "@doctorapp-Token";
// export const CHAVE_ID = "@doctorapp-Id";

export const usuarioAutenticado = () => sessionStorage.getItem(CHAVE_TOKEN) !== null;
export const recebeToken = () => sessionStorage.getItem(CHAVE_TOKEN);
// export const recebeId = () => sessionStorage.getItem(CHAVE_ID);

export const login = (token, id) => {
  sessionStorage.setItem(CHAVE_TOKEN, token);
  // sessionStorage.setItem(CHAVE_ID, id);
};
export const logout = () => {
  sessionStorage.removeItem(CHAVE_TOKEN);
};