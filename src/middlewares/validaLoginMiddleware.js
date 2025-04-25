import jwt from 'jsonwebtoken'
import Usuario from '../models/UsuarioModel.js'

const validaLogin = async (req, res, next) => {
  
    const Header = req.headers.authorization;

  if (!Header || !Header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado: Token não fornecido' });
  }

  try {
    const token = Header.split(' ')[1]; 

    const user = jwt.verify(token, process.env.TOKEN_KEY); 

    const usuario = await Usuario.findById(user.id);

    if (!usuario) {
      return res.status(401).json({ message: 'Não autorizado: Usuário não encontrado' });
    }

    req.usuario = usuario;
    next(); 
    
  } catch (error) {
    return res.status(500).send({
        error: error.message
    });
  }
};

export default validaLogin