function mapToDepositos(depositos) {
    const repl = depositos.map(obj => ({
      _id: obj._id,
      bancoDeposito: obj.banco,
      depositoMonto: obj.monto,
      comentarioDeposito: obj.comentarios,
      fechaDeposito: obj.fecha,
      fechaDepositoStr: obj.fecha,
      ...obj,
    }));
    return repl;
  }
  
  function mapToRetornos(retornos) {
    const repl = retornos.map(obj => ({
      _id: obj._id,
      nombreRetorno: obj.Nombre,
      entidadRetorno: obj.Banco,
      retornoMonto: obj.Monto,
      comentarioRetorno: obj.Comentario,
      cuentaRetorno: obj.Cuenta_clabe,
      ...obj,
    }));
    return repl;
  }