const {Order, Purchase, Product, User} = require('../../models')
const postEmail = require("../services/mails")
const getCarts = (req, res, next) => {
    Purchase.findAll({
        where: {
            userId : req.user.id,
            status: 'completed'
        }
    })    
    .then(data => {res.send(data)})
    .catch(next)
}

// CART'S ROUTES
// Find or create currectCart for logged user
const hasCurrentCart = (req, res, next) => {
    Purchase.findOne({
        where: {
            userId: req.user.id,
            status: 'pending'
        }
    })
    .then(currentPurchase => {
        currentPurchase 
        ? (req.body.cart = currentPurchase, next())
        : req.user.createPurchase()
        .then(purchase => {
                req.body.cart = purchase;
                next()
            })
    })
}
// Find single cart by id
const hasSingleCart = (req, res, next) => {
    Purchase.findByPk(req.params.id)
    .then(purchase => {
        purchase 
        ? (req.body.cart = purchase, next())
        : res.sendStatus(404)
    })
}
// Serve cart
const getSingleCart = (req, res, next) => {
    req.body.cart.getOrders({include: Product})
    .then(orders => res.send({purchase: req.body.cart, orders}))
    .catch(next)
}

// Submint cart
const submitCart = (req, res, next) => {
    Promise.all(
        req.body.transactions.map(t => 
            Order.update({subtotal: t.subtotal}, {where: {id: t.id}})
            .then(Product.update({stock: t.stock}, {where: {id: t.productId}}))
        )
    )
    .then(() => {
        Purchase.findByPk(req.params.id)
        .then(purchase => purchase.update({
            total: req.body.total, 
            status: 'completed'
        }))
        .then(data => res.send(data))
    }).then(()=> {return postEmail(req.user,req.body)})
    .catch(next)
}

// ORDERS' ROUTES
const addProduct = (req, res, next) => {
    const {cartId, productId, units} = req.body
    Purchase.findByPk(cartId)
    .then(cart => 
        cart.status === 'completed'
        ?   res.sendStatus(401)
        :   cart.getOrders({where: {productId}})
            .then(orders => {
                orders[0]
                ? orders[0].update({units})
                    .then(order => Order.findByPk(order.id,{include: Product})
                        .then(complete=>res.status(200).send(complete))
                    )
                : cart.createOrder({productId, units})
                    .then(order => Order.findByPk(order.id,{include: Product})
                        .then(complete=>res.status(201).send(complete))
                    )
            })
    )
    .catch(next)
} 
const updateProduct = (req, res, next) => {
    Order.findByPk(req.params.id, {include: Purchase})
    .then( order => 
        order.purchase.status === 'completed'
        ? res.sendStatus(401)
        : order.update(req.body)).then(order => res.send(order)
    )
    .catch(next)
}
const deleteProduct = (req, res, next) => {
    Order.findByPk(req.params.id, {include: Purchase})
    .then( order => 
        order.purchase.status === 'completed'
        ? res.sendStatus(401)
        : order.destroy().then(() => res.sendStatus(200))
    )
    .catch(next)
}

module.exports = {
    getCarts,
    getSingleCart,
    hasCurrentCart,
    hasSingleCart,
    addProduct,
    updateProduct,
    deleteProduct,
    submitCart,
}