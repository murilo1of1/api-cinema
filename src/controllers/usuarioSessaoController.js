import UsuarioSessao from "../models/UsuarioSessaoModel.js";
import Sessao from "../models/SessaoModel.js";
import Filme from "../models/FilmeModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            const response = await UsuarioSessao.findAll({
                order: [['id', 'desc']],
            });
        
            return res.status(200).send({
                message: 'dados encontrados',
                data: response,
            });
        }

        const response = await UsuarioSessao.findOne({
            where: {
                id: id
            }
        });

        if(!response) {
            return res.status(404).send('não achou');
        }

        return res.status(200).send({
            message: 'dados encontrados',
            data: response,
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const create = async (corpo) => {
    try {
        const {
            valor,
            idUsuario,
            idSessao,
        } = corpo

        const response = await UsuarioSessao.create({
            valor,
            idUsuario,
            idSessao,
        });

        return response;

    } catch (error) {
        throw new Error(error.message);
    }
}

const update = async(corpo, id) => {
    try {
        const response = await UsuarioSessao.findOne({
            where: {
                id
            }
        });

        if(!response) {
            throw new Error('não achou');
        }
        Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
        await response.save();
        return response;

    } catch (error) {
        throw new Error(error.message);
    }
}

const persist = async(req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            const response = await create(req.body);
            return res.status(201).send({
                message: 'criado com sucesso',
                data: response
            });
        }

        const response = await update(req.body, id);
        return res.status(201).send({
            message: 'atualizado com sucesso',
            data: response
        });
        
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            return res.status(400).send('informe please');
        }

        const response = await UsuarioSessao.findOne({
            where: {
                id
            }
        });

        if(!response) {
            return res.status(404).send('nao achou');
        }
        await response.destroy();

        return res.status(200).send({
            message: 'registro excluido',
            data: response
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const getLugaresDisponiveis = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            return res.status(400).send('informe please');
        }

        const response = await Sessao.findOne({
            where: { idSessao : id },
            attributes: ['lugares'] 
        });

        if (!response) {
            return res.status(404).send('Sessão não encontrada');
        }

        const lugares = response.lugares;
        const lugaresDisponiveis = lugares.filter(item => item.ocupado === false);

        return res.status(200).send({
            lugaresDisponiveis,
            total: lugaresDisponiveis.length,
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const postComprarIngresso = async (req, res) => {
    try {
        const { idUsuario, idSessao, lugar } = req.body;

        if (!idUsuario || !idSessao || !lugar) {
            return res.status(400).send({ message: 'informe please' });
        }

        const response = await Sessao.findOne({
            where: { id: idSessao },
            attributes: ['id', 'lugares', 'preco', 'dataInicio']
        });

        if (!response) {
            return res.status(404).send({ error: 'sessao nao existe' });
        }

        const lugares = response.lugares;
        const lugarSelecionado = lugares.find(item => item.lugar === lugar);

        if (!lugarSelecionado) {
            return res.status(400).send({ error: 'Lugar não encontrado na sessao' });
        }

        if (lugarSelecionado.ocupado) {
            return res.status(400).send({ error: 'lugar ocupado' });
        }

        const lugaresAtualizados = lugares.map(item => {
            if (item.lugar === lugar) {
                return {
                    ...item,
                    ocupado: true,
                    idUsuario: idUsuario
                };
            }
            return item;
        });

        response.lugares = lugaresAtualizados;
        await response.save();

        const ingresso = await UsuarioSessao.create({
            idUsuario,
            idSessao,
            lugar,
            valor: response.preco,
            dataCompra: new Date()
        });

        return res.status(201).send({
            ingresso: {
                id: ingresso.id,
                valor: ingresso.valor,
                lugar: ingresso.lugar
            },
            sessao: {
                data: response.dataInicio
            }
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const cancelarCompra = async (req, res) => {
    try {
        const { idUsuario, idSessao, lugar } = req.body;

        if (!idUsuario || !idSessao || !lugar) {
            return res.status(400).send({ message: 'informe idUsuario, idSessao e lugar, please!!' });
        }

        const response = await Sessao.findOne({
            where: { id: idSessao },
            attributes: ['id', 'lugares', 'preco'] 
        });

        if (!response) {
            return res.status(404).send({ message: 'sessao nao encontrada' });
        }

        const lugares = response.lugares;


        const lugaresAtualizados = lugares.map(item => {
            console.log(item);
            
            if (item.lugar === lugar && item.idUsuario === idUsuario) {
                return {
                    ...item,
                    ocupado: false,
                    idUsuario: null
                };
            }
            return item;
        });

        response.lugares = lugaresAtualizados;
        console.log(response.preco);
        await response.save();

        const compra = await UsuarioSessao.findOne({
            where: {
                idUsuario,
                idSessao,
            }
        });

        if (!compra) {
            return res.status(404).send({ message: 'compra nao encontrada' });
        }

        compra.status = 'cancelada';
        await compra.save();

        return res.status(200).send({ 
            message: 'compra cancelada'
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


const listarCompras = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            return res.status(400).send('informe please');
        }

        const response = await UsuarioSessao.findAll({
            where: {idUsuario: id},
            include: [{
                model: Sessao,
                as: 'sessao',
                attributes: ['dataInicio', 'idSala'],

                include: [{
                    model: Filme,
                    as: 'filme',
                    attributes: ['nome', 'duracao'],
                }]
            }]
        });

        if(!response.length) {
            return res.status(404).send('nao possui compras');
        }

        return res.status(200).send({
            message: 'compras encontradas',
            data: response
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export default {
    get,
    persist,
    destroy,
    getLugaresDisponiveis,
    postComprarIngresso,
    cancelarCompra,
    listarCompras,
}