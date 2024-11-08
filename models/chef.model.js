let { DataTypes, sequelize } = require("../lib/");

let chef = sequelize.define("chef", {
 name: {
    type: DataTypes.STRING,
 },
 birthYear: {
    type: DataTypes.INTEGER,
 },
});

module.exports = { chef };