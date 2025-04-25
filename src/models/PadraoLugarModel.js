import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";

const PadraoLugar = sequelize.define(
   'padrao_lugares',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lugares: {
            type: DataTypes.JSONB,
            allowNull: false,
        }
    },
    {
        tableName: 'padrao_lugares',
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
    }
);

export default PadraoLugar;