import { DataTypes } from "sequelize";
import {sequelize} from "../config/postgres.js";
import Cargo from "./CargoModel.js";

const Usuario = sequelize.define(
    'usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        estudante: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        resetPasswordToken: {
            field: 'reset_password_token',
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        resetPasswordExpires: {
            field:'reset_password_expires',
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
    }
);

Usuario.belongsTo(Cargo, {
    as: 'cargo',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idCargo',
        field: 'id_cargo',
    }
});

export default Usuario;