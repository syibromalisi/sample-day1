import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface SkillsAttributes {
    id: number;
    skill: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
}
export interface SkillsModel extends Model<SkillsAttributes>, SkillsAttributes { }
export class Skills extends Model<SkillsModel, SkillsAttributes> { }

export type SkillsStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): SkillsModel;
};

export function SkillsFactory(sequelize: Sequelize): SkillsStatic {
    
    return <SkillsStatic>sequelize.define("skills", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        skill: { type: DataTypes.STRING, allowNull: false, unique: true },
        createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
        createdBy: { type: DataTypes.STRING, allowNull: false },
        LastUpdatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
        LastUpdatedBy: { type: DataTypes.STRING, allowNull: true },
    });
}
