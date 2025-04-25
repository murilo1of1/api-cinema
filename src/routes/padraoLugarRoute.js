import padraoLugarContoller from "../controllers/padraoLugarController.js";

export default (app) => {
    app.get('/padraolugar', padraoLugarContoller.get);
    app.get('/padraolugar/:id', padraoLugarContoller.get);
    app.post('/padraolugar', padraoLugarContoller.persist);
    app.patch('/padraolugar/:id', padraoLugarContoller.persist);
    app.delete('/padraolugar/:id', padraoLugarContoller.destroy);
}