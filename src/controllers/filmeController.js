import Filme from "../models/FilmeModel.js";
import uploadFile from "../utils/uploadFile.js";
import path from 'path'
import fs from 'fs';
import {dirname} from 'node:path';
import { fileURLToPath } from 'node:url';

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if(!id) {
            const response = await Filme.findAll({
                order: [['id', 'desc']],
            });
        
            return res.status(200).send({
                message: 'dados encontrados',
                data: response,
            });
        }

        const response = await Filme.findOne({
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
};

const create = async (corpo, file) => {
    try {
        const {
            nome,
            descricao,
            autor,
            duracao
        } = corpo;

        let caminhoCartaz = null;
        const filmeCriado = await Filme.create({ 
            nome,
            descricao,
            autor,
            duracao,
            caminhoCartaz: null 
        });

        if (file) {
            const fileExtension = path.extname(file.name).toLowerCase();
            const filename = `${filmeCriado.id}${fileExtension}`;
            const params = { tipo: 'filmes', tabela: 'filmes', id: filename.split('.')[0] };
            const uploadResult = await uploadFile(file, params);

            if (uploadResult.type === 'sucess') {
                await Filme.update({ caminhoCartaz: uploadResult.message }, { where: { id: filmeCriado.id } });
                const filmeAtualizado = await Filme.findByPk(filmeCriado.id);
                return filmeAtualizado;
            } else {
                await Filme.destroy({ where: { id: filmeCriado.id } });
                throw new Error(uploadResult.message);
            }
        }

        console.log(caminhoCartaz);

        return filmeCriado;

    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (corpo, id, file) => {
    try {
        const filme = await Filme.findOne({ where: { id } });

        if (!filme) {
            throw new Error('Filme não encontrado.');
        }

        if (file) {
            if (filme.caminhoCartaz) {
                const __dirname = dirname(fileURLToPath(import.meta.url));
                const imagePath = path.join(__dirname, '../../', filme.caminhoCartaz);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Erro ao excluir imagem antiga do filme ${id}: ${err}`);
                    } else {
                        console.log(`Imagem antiga do filme ${id} excluída: ${imagePath}`);
                    }
                });
            }

            const fileExtension = path.extname(file.name).toLowerCase();
            const filename = `${id}${fileExtension}`; 
            const params = { tipo: 'filmes', tabela: 'filmes', id: filename.split('.')[0] };
            const uploadResult = await uploadFile(file, params);

            if (uploadResult.type === 'sucess') {
                corpo.caminhoCartaz = uploadResult.message; 
            } else {
                throw new Error(uploadResult.message);
            }
        }

        Object.keys(corpo).forEach((item) => filme[item] = corpo[item]);
        await filme.save();
        return filme;

    } catch (error) {
        throw new Error(error.message);
    }
};

const persist = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
        const corpo = req.body;
        const file = req.files && req.files.cartaz ? req.files.cartaz : null; 

        console.log("Corpo da requisição (persist):", corpo);
        console.log("ID da requisição (persist):", id);
        console.log("Arquivo da requisição (persist):", file);

        if (!id && file) {
            try {
                const response = await create(corpo, file);
                return res.status(201).send({ message: 'Filme criado com sucesso.', data: response });
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        } else if (id) {
            try {
                const response = await update(corpo, id, file);
                return res.status(200).send({ message: 'Filme atualizado com sucesso.', data: response });
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        } else if (!id) { 
            try {
                const response = await create(corpo, null);
                return res.status(201).send({ message: 'Filme criado com sucesso.', data: response });
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        } else {
            return res.status(400).send({ message: 'Requisição inválida para persistir o filme.' });
        }

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send('Informe o ID do filme a ser excluído.');
        }

        const filme = await Filme.findOne({ where: { id: id } });

        if (!filme) {
            return res.status(404).send('Filme não encontrado.');
        }

        if (filme.caminhoCartaz) {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const imagePath = path.join(__dirname, '../../', filme.caminhoCartaz);
            console.log(`Tentando excluir imagem em: ${imagePath}`);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Erro ao excluir imagem do filme ${id}: ${err}`);
                } else {
                    console.log(`Imagem do filme ${id} excluída: ${imagePath}`);
                }
            });
        }

        await filme.destroy();

        return res.status(200).send({ message: 'Filme excluído com sucesso.', data: filme });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export default {
    get,
    persist,
    destroy,
}