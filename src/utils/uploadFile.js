import path from 'path';
import {dirname} from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param file deve ser um arquivo que venha do req.files
 * @param params deve ser um objeto contendo {tipo, tabela, id}
 * id: chave primaria do registro
 * tabela: tabela do banco
 * tipo: tipo do arquivo
 * @return objeto contendo erro ou sucesso
 */

export default async(file, params) => {
    try {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        let extensao = path.extname(file.name);
        let filepath = `public/${params.tipo}/${params.tabela}/${params.id}${extensao}`;
        let uploadPath = `${__dirname}/../../${filepath}`;
        await file.mv(uploadPath);

        return {
            type: 'sucess',
            message: uploadPath
        }
        
    } catch (error) {
        return {
            type: 'erro',
            message: error.message
        }
    }
} 
