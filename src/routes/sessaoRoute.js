import sessaoController from "../controllers/sessaoController.js";

export default (app) => {
    app.get('/sessao', sessaoController.get);
    app.get('/sessao/:id', sessaoController.get);
    app.post('/sessao', sessaoController.persist);
    app.patch('/sessao/:id', sessaoController.persist);
    app.delete('/sessao/:id', sessaoController.destroy);
    app.get('/sessao/relatorio/:id', sessaoController.relatorioSessao);
}