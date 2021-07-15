
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UsersAttributes {
    userId?: string;
    username: string;
    password: string;
    email?: string;
    address?: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
}

export interface UserModel extends Model<UsersAttributes>, UsersAttributes { }
export class User extends Model<UserModel, UsersAttributes> { }

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

const users = {
    userId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    username: {
        primaryKey: true,
        type: DataTypes.STRING,
        unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    LastUpdatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
    LastUpdatedBy: { type: DataTypes.STRING, allowNull: true },
};


export const UserFactory = (sequalize: Sequelize): UserStatic => {
    const attributes = users;
    const model = <UserStatic>sequalize.define("Users", attributes, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });

    model.sync();

    return model;
};

