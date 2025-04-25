import Sessao from "../models/SessaoModel.js";
import Sala from "../models/SalaModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            const response = await Sessao.findAll({
                order: [['id', 'desc']],
            });
        
            return res.status(200).send({
                message: 'dados encontrados',
                data: response,
            });
        }

        const response = await Sessao.findOne({
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
            dataInicio,
            dataFim,
            preco,
            idFilme,
            idSala
        } = corpo;

        const sala = await Sala.findByPk(idSala);
        if (!sala) {
            throw new Error('Sala não encontrada');
        }

        const lugares = sala.padraoLugar.map((lugar) => ({
            ...lugar,
            ocupado: false
        }));

        const response = await Sessao.create({
            lugares,
            dataInicio,
            dataFim,
            preco,
            idFilme,
            idSala
        });

        return response;

    } catch (error) {
        throw new Error(error.message);
    }
}

const update = async (corpo, id) => {
    try {
        const response = await Sessao.findOne({
            where: { id }
        });

        if (!response) {
            throw new Error('Sessão não encontrada');
        }
        
        if (corpo.idSala === response.idSala) {
            throw new Error('idSala é igual');
        } else {
            response.idSala = corpo.idSala;
        }

        Object.keys(corpo).forEach((item) => {
            if (item !== 'idSala') {
                response[item] = corpo[item];
            }
        });

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

        const response = await Sessao.findOne({
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

const relatorioSessao = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            return res.status(400).send('informe please');
        }

        const response = await Sessao.findOne({
            where: { id : id },
            attributes: ['lugares', 'preco'],

        });
        console.log(response);

        if(!response) {
            return res.status(404).send('nao achou');
        }

        const lugares = response.toJSON().lugares;
        const vendidos = lugares.filter(lugar => lugar.ocupado === true).length;
        const valorArrecadado = vendidos * Number(response.preco);

        return res.status(200).send({
            message: 'relatorio gerado',
            data: {
                vendidos, 
                valorArrecadado,
            }
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

export default {
    get,
    persist,
    destroy,
    relatorioSessao,
}