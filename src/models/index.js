 import Cargo from "./CargoModel.js";
 import Usuario from "./UsuarioModel.js";
 import Parametro from "./ParametroModel.js";
 import Filme from "./FilmeModel.js";
 import PadraoLugar from "./PadraoLugarModel.js";
 import Sala from "./SalaModel.js";
 import Sessao from "./SessaoModel.js";
 import UsuarioSessao from "./UsuarioSessaoModel.js";

 (async () => {
    await Cargo.sync();
    await Usuario.sync();
    await Parametro.sync();
    await Filme.sync();
    await PadraoLugar.sync();
    await Sala.sync();
    await Sessao.sync();
    await UsuarioSessao.sync();
 })();