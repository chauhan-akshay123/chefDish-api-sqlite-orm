let { DataTypes, sequelize } = require("../lib/");

let dish = sequelize.define("dish", {
 name: {
    type: DataTypes.STRING,
 },
 cuisine: {
    type: DataTypes.STRING,
 },
 preparation: {
    type: DataTypes.INTEGER,
 }, 
});

module.exports = { dish };