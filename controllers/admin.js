const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
   req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  })
  .then((val)=>{console.log("Created Product")})
  .catch((err)=>{console.log("Error :",err)})
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([product])=>{
    res.render('shop/product-detail',{
      product:product[0],
      pageTitle:product.title,
      path:'/products'
    })
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((data) => {
     res.render('shop/index', {
        prods:data,
        pageTitle: 'Shop',
        path: '/'
      })
    
  })
 
  
   

  .catch((err)=>console.log("Error: ",err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId)
 Product.destroy({where:{id:prodId}})
  .then(()=>{
    console.log("Deleted Products")
    res.redirect("/admin/products");
  })
  .catch((err)=>console.log("Error :",err)) 
  
};
