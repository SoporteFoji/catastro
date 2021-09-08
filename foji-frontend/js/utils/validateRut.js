// Valida el rut con su cadena completa "XXXXXXXX-X"
export var Fn = {
  validaRut(rutCompleto) {
    rutCompleto = rutCompleto.replace(/\./g, '');
    if (rutCompleto.indexOf('-') == -1) {
      const lastone = rutCompleto.substr(rutCompleto.length - 1);
      rutCompleto = rutCompleto.substr(0, rutCompleto.length - 1);
      rutCompleto = `${rutCompleto}-${lastone}`;
    }
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto)) return false;
    const tmp = rutCompleto.split('-');
    let digv = tmp[1];
    const rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return (Fn.dv(rut) == digv);
  },
  dv(T) {
    let M = 0; let S = 1;
    for (;T; T = Math.floor(T / 10)) S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  },
};

export default Fn;
