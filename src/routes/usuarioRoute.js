import usuarioController from "../controllers/usuarioController.js";


export default (app) => {
    app.get('/usuario', usuarioController.get);
    app.get('/usuario/:id', usuarioController.get);
    app.post('/usuario', usuarioController.persist);
    app.patch('/usuario/:id', usuarioController.persist);
    app.delete('/usuario/:id', usuarioController.destroy);
    app.post('/usuario/login', usuarioController.login);
    app.get('/usuario/info-by-token', usuarioController.getDataByToken);
}