import filmeController from "../controllers/filmeController.js";
import authMiddleware from "../middlewares/validaLoginMiddleware.js";

export default (app) => {
    app.get('/filme', authMiddleware, filmeController.get); 
    app.get('/filme/:id', authMiddleware, filmeController.get); 
    app.post('/filme', authMiddleware, filmeController.persist); 
    app.patch('/filme/:id', authMiddleware, filmeController.persist);
    app.delete('/filme/:id', authMiddleware, filmeController.destroy); 
}