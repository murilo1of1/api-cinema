import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";
import Filme from "./FilmeModel.js";
import Sala from "./SalaModel.js";

const Sessao = sequelize.define(
    'sessao',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lugares: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'data_inicio',
        },
        dataFim: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'data_fim',
        },
        preco: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
);

Sessao.belongsTo(Filme, {
    as: 'filme',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idFilme',
        allowNull: false,
        field: 'id_filme',
    }
});

Sessao.belongsTo(Sala, {
    as: 'sala',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idSala',
        allowNull: false,
        field: 'id_sala',
    }
});

export default Sessao;
