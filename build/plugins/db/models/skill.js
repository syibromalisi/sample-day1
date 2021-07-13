"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsFactory = exports.Skills = void 0;
const sequelize_1 = require("sequelize");
class Skills extends sequelize_1.Model {
}
exports.Skills = Skills;
function SkillsFactory(sequelize) {
    return sequelize.define("skills", {
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        skill: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        createdDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW, allowNull: false },
        createdBy: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        LastUpdatedDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW, allowNull: true },
        LastUpdatedBy: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    });
}
exports.SkillsFactory = SkillsFactory;
//# sourceMappingURL=skill.js.map