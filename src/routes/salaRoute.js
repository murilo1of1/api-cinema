import salaController from "../controllers/salaController.js";

export default (app) => {
    app.get('/sala', salaController.get);
    app.get('/sala/:id', salaController.get);
    app.post('/sala', salaController.persist);
    app.patch('/sala/:id', salaController.persist);
    app.delete('/sala/:id', salaController.destroy);
}