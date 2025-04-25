import cargoController from "../controllers/cargoController.js";

export default (app) => {
    app.get('/cargo', cargoController.get);
    app.get('/cargo/:id', cargoController.get);
    app.post('/cargo', cargoController.persist);
    app.patch('/cargo/:id', cargoController.persist);
    app.delete('/cargo/:id', cargoController.destroy);
}