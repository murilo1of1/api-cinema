import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";

const Cargo = sequelize.define(
    'cargos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao: {
            type: DataTypes.STRING(200),
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
    }
);

export default Cargo;