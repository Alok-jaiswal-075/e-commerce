const express = require('express');
const catchAsync = require('../Utility/catchAsync');
const appError = require('../Utility/appError')
const router = express.Router();

const User = require('../models/user')
const Catalog = require('../models/catalog')
const Order = require('../models/order');
const Product = require('../models/product')
const { isLoggedIn, isSeller } = require('../middleware');
const { populate } = require('dotenv');


router.post('/create-catalog',isLoggedIn,isSeller, catchAsync(async (req,res)=>{
    const items = req.body

    if(!items || items.length === 0) throw new appError(401,'Require some items to build catalog')

    const productsPromises = items.map(async (item) => {
        const product = new Product({name:item.name, price:item.price})
        await product.save();
        return product;
    })

    const products = await Promise.all(productsPromises);


    const seller = await User.findOne({username:req.user.username});

    if(!seller) throw new appError(401,'Seller does not exist')

    const catalog = new Catalog({seller,products})

    seller.catalog = catalog;

    await seller.save();
    await catalog.save();

    res.json({"msg":'Catalog created'})

}))


router.get('/orders',isLoggedIn,isSeller, catchAsync(async (req,res) => {
    const seller = await User.findOne({username:req.user.username}).populate({
        path : 'orders',
        populate : {
            path : 'products',
            populate : {
                path : 'product'
            }
        }
    });

    if(!seller) throw new appError(404,'Seller does not exist')


    res.json(seller.orders)
}))



module.exports = router