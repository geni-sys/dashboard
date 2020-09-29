function dataAtualFormatada(stamps) {
  const msec = new Date(String(stamps));
  const hour = msec.getHours();
  const sec = msec.getHours();
  const hourF = hour.length === 1 ? "0" + hour : hour;
  const secF = hour.length === 1 ? "0" + sec : sec;

  const date = hourF + ":" + msec.getMinutes() + ":" + secF;

  return date;
}

const fomartTime = (stamps) => {
  const data = new Date(stamps),
    dia = data.getDate().toString(),
    diaF = dia.length === 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length === 1 ? "0" + mes : mes,
    anoF = data.getFullYear();

  return dataAtualFormatada(stamps) + " em " + diaF + "/" + mesF + "/" + anoF;
};

export default fomartTime;
