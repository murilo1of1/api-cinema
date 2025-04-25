import usuarioSessaoController from "../controllers/usuarioSessaoController.js";

export default (app) => {
    app.get('/usuario-sessao', usuarioSessaoController.get);
    app.get('/usuario-sessao/:id', usuarioSessaoController.get);
    app.post('/usuario-sessao', usuarioSessaoController.persist);
    app.patch('/usuario-sessao/cancelar-compra', usuarioSessaoController.cancelarCompra);
    app.patch('/usuario-sessao/:id', usuarioSessaoController.persist);
    app.delete('/usuario-sessao/:id', usuarioSessaoController.destroy);
    app.get('/usuatio-sessao/lugares-disponiveis/:idSessao', usuarioSessaoController.getLugaresDisponiveis);
    app.post('/usuario-sessao/comprar-ingresso', usuarioSessaoController.postComprarIngresso);
    app.get('/usuario-sessao/compras/:id', usuarioSessaoController.listarCompras);
}