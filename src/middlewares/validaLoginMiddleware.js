import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Não autorizado: Token não fornecido ou mal formatado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = decoded.idUsuario; 
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).send(error.message);
    }
};

export default authMiddleware;