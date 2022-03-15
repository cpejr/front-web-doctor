
function translateError(errorCode) {
  const defaultError = "Erro inesperado";
  const errors = {
    401: "Não autorizado",
    403: "Credenciais inválidas",
    404: "Recurso não encontrado",
    500: defaultError,
  };

  const errorMessage = errors[errorCode] || defaultError;
  return errorMessage;
}

export default function handleError(error, callback = () => {}) {
  const response = error.response;
  const statusCode = response.status;

  if (statusCode > 199 && statusCode < 399) {
    // not an error
    return;
  }

  callback(error);
  /*const messageText = response.data.message;

  if (messageText) {
    return alert(messageText);
  }
*/
  const errorMessage = translateError(statusCode);
  return alert(errorMessage);
}
