import { format, zonedTimeToUtc } from "date-fns-tz";

export default function formatarData({ data, formatacao, fuso }) {
  if (!!!data) return null; 
  const dataParaFormatar = fuso ? zonedTimeToUtc(data, fuso) : new Date(data);
  return format(dataParaFormatar, formatacao);
}