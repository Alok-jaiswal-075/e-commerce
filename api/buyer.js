const express = require('express');
const catchAsync = require('../Utility/catchAsync');
const appError = require('../Utility/appError')
const router = express.Router();

const User = require('../models/user')
const Catalog = require('../models/catalog')
const Order = require('../models/order');
const { isLoggedIn, isBuyer } = require('../middleware');

router.get('/list-of-sellers',isLoggedIn,catchAsync( async (req,res)=>{
    const sellers = await User.find({role:'seller'}).select('-password').exec()

    res.json(sellers)
}))

router.get('/seller-catalog/:seller_id',isLoggedIn, catchAsync(async (req,res)=>{
    const {seller_id} = req.params
    const catalog = await Catalog.findOne({seller:seller_id}).exec()

    res.json(catalog)
}))

router.post('/create-order/:seller_id', isLoggedIn, isBuyer, catchAsync(async (req, res) => {
    const { seller_id } = req.params;
    const items = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new appError(400,'Item list is required');
    }

    const seller = await User.findById(seller_id).populate('catalog').exec();
    const buyer = await User.findOne({username:req.user.username});

    const sellerCatalog = seller.catalog.products.map(product => product.toString());

    const itemsNotInCatalog = items.filter(item => !sellerCatalog.includes(item.productId));


    if (itemsNotInCatalog.length > 0) {
        throw new appError(400,'One or more items are not available in seller\'s catalog.');
    }

    const order = new Order({
        seller,
        buyer, 
        products: items.map(item => ({ product: item._id, quantity: item.quantity }))
    });

    buyer.orders.push(order)
    seller.orders.push(order)

    await order.save();
    await buyer.save();
    await seller.save();


    res.json({ msg: 'Order created successfully.'});
}));


module.exports = router