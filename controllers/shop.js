const Product = require("../models/product");


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      
      res.render("shop/product-list", {
        prods: data,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then((product) => {
    
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((data)=>{
   res.render('shop/index',{
    prods:data,
    pageTitle:'Shop',
    path:"/"
   })
  })
    .catch((err) => console.log("Error :", err));
};

exports.getCart = (req, res, next) => {
 const user=req.user
 user.getCart()
 .then((cart)=>{
  return cart.getProducts()
  .then((prods)=>{
    console.log("The products are ",prods)
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products:prods,
    })
  })
  .catch((err)=>console.log(err))
})
 .catch((err)=>console.log(err))

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then((cart)=>{
      fetchedCart=cart
       return cart.getProducts({where:{id:prodId}})

  })
  .then((products)=>{
    let product;
    if(products.length>0) product=products[0]
    let newQty=1;
    if(product){
      const oldQty=product.cartItem.quantity
      newQty=oldQty+1
      return fetchedCart.addProduct(product,{through:{quantity:newQty}})
    }
    return Product.findByPk(prodId)
    .then((prod)=>{
     return  fetchedCart.addProduct(prod,{through:{quantity:newQty}})
    })
    .then(()=>res.redirect('/cart'))
    .catch((err)=>{
      console.log(err)
    })

  })
  .catch((err)=>console.log("Error - cart ",err))
  // res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts({where:{id:prodId}})

  })
  .then((prods)=>{
    const prod=prods[0];
    return prod.cartItem.destroy()
  })
  .then(()=>res.redirect("/cart"))
  .catch((err)=>console.log(err))
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
