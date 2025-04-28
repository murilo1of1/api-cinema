import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";

const Filme = sequelize.define(
    'filmes', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        descricao: {
            type: DataTypes.STRING(200),
        },
        autor: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        duracao: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        caminhoCartaz: { 
            field: 'caminho_cartaz',
            type: DataTypes.STRING,
            allowNull: true, 
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
    }
);

export default Filme;