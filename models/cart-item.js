const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const cartItem = sequelize.define("cart-item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
  amount: Sequelize.INTEGER,
});

module.exports = cartItem;
