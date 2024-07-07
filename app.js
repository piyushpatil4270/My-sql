const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const User = require("./models/user");
const Product = require("./models/product");

const { FORCE } = require("sequelize/lib/index-hints");
const Cart = require("./models/cart");
const cartItem = require("./models/cart-item");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user)=>{
      req.user=user
      next()
    })
    .catch((err)=>console.log("Request Error ",err))
})
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:cartItem})
Product.belongsToMany(Cart,{through:cartItem})


sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) return User.create({ name: "Augustus", email: "augustus@email.com" });
    return Promise.resolve(user);
  })
  .then(user => {
    console.log(user);
     return user.createCart()
  })
  .then((cart)=>{
    app.listen(3000);
  })
  .catch(err => console.log(err));


