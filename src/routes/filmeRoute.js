import filmeController from "../controllers/filmeController.js";
import authMiddleware from "../middlewares/validaLoginMiddleware.js";

export default (app) => {
    app.get('/filme', filmeController.get); 
    app.get('/filme/:id', authMiddleware, filmeController.get); 
    app.post('/filme', filmeController.persist); 
    app.patch('/filme/:id', filmeController.persist);
    app.delete('/filme/:id', filmeController.destroy); 
}