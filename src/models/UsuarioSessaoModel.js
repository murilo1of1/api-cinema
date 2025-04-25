import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";
import Usuario from "./UsuarioModel.js";
import Sessao from "./SessaoModel.js";

const UsuarioSessao = sequelize.define(
    'usuario_sessao', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valor: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: 'usuario_sessao',
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
    }
);

UsuarioSessao.belongsTo(Usuario, {
    as: 'usuario',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idUsuario',
        allowNull: false,
        field: 'id_usuario',
    }
});

UsuarioSessao.belongsTo(Sessao, {
    as: 'sessao',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idSessao',
        allowNull: false,
        field: 'id_sessao',
    }
});

export default UsuarioSessao;