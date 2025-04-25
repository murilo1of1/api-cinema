import cargoRoute from "./cargoRoute.js";
import usuarioRoute from "./usuarioRoute.js";
import parametroRoute from "./parametroRoute.js"
import filmeRoute from "./filmeRoute.js";
import padraoLugarRoute from "./padraoLugarRoute.js";
import salaRoute from "./salaRoute.js";
import sessaoRoute from "./sessaoRoute.js";
import usuarioSessaoRoute from "./usuarioSessaoRoute.js";

function Routes(app) {
    cargoRoute(app);
    usuarioRoute(app);
    parametroRoute(app);
    filmeRoute(app);
    padraoLugarRoute(app);
    salaRoute(app);
    sessaoRoute(app);
    usuarioSessaoRoute(app);
}


export default Routes;