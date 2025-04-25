import parametroController from "../controllers/parametroController.js";

export default (app) => {
    app.get('/parametro', parametroController.get);
    app.get('/parametro/:id', parametroController.get);
    app.post('/parametro', parametroController.persist);
    app.patch('/parametro/:id', parametroController.persist);
    app.delete('/parametro/:id', parametroController.destroy);
}