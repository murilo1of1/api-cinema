import cargoController from "../controllers/cargoController.js";
import tempoMiddleware from "../middlewares/tempoMiddleware.js";

export default (app) => {
    app.get('/cargo', tempoMiddleware, cargoController.get);
    app.get('/cargo/:id', cargoController.get);
    app.post('/cargo', cargoController.persist);
    app.patch('/cargo/:id', cargoController.persist);
    app.delete('/cargo/:id', cargoController.destroy);
}
