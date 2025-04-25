import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";
import PadraoLugar from "./PadraoLugarModel.js";

const Sala = sequelize.define(
    'sala',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        observacao: {
            type: DataTypes.STRING(200),
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
);

Sala.belongsTo(PadraoLugar, {
    as: 'padraoLugar',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idPadraoLugar',
        allowNull: false,
        field: 'id_padrao_lugar',
    }
});

export default Sala;