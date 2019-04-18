/**
 * CartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var ObjectID = require("bson-objectid");

module.exports = {
    _listCart: async function (req, res) {
        var cart = await Cart._getAllByUser(req.users.userid);
        var total_price = 0;
        var quantity = 0;
        if (cart.length > 0) {
            for (var index in cart) {
                total_price += cart[index].total_price;
                quantity += cart[index].quantity;
            }
        }

        return res.status(200).json({
            "status": "success",
            "data": cart,
            "total_price": total_price,
            "total_quantity": quantity
        });
    },

    _modifyCart: async function (req, res) {
        var user_id = req.users.userid;
        var params = req.allParams();
        var cart = await Cart._checkProductExistsInCart(user_id, params.product_id);
        // console.log(cart)
        try {
            if (cart != null) {
                if (params.op == 1) {
                    await Cart._updateCart({
                        quantity: cart.quantity + 1,
                        total_price: cart.total_price + cart.product_id.price
                    }, user_id, params.product_id);
                } else {
                    if (cart.quantity > 1) {
                        await Cart._updateCart({
                            quantity: cart.quantity - 1,
                            total_price: cart.total_price - cart.product_id.price
                        }, user_id, params.product_id);
                    } else {
                        var delCart = await Cart._deleteCart(user_id, params.product_id);
                        if (!delCart) {
                            return res.status(401).json({
                                'status': "error",
                                'message': sails.config.error_code.CART_ITEM_NOT_EXIST
                            });
                        }
                    }
                }
            } else {
                if (params.op == 1) {
                    var product = await Product._getProduct(params.product_id);
                    await Cart._insertCart({
                        '_id': ObjectID().toString(),
                        user_id,
                        product_id: params.product_id,
                        quantity: 1,
                        total_price: product.price
                    });
                } else {
                    return res.status(401).json({
                        "status": "success",
                        'message': sails.config.error_code.CART_ITEM_NOT_EXIST
                    });
                }
            }
        } catch (e) {
            return res.status(401).json({
                "status": "success",
                'message': sails.config.error_code.CART_ERROR,
                "raw": e
            });
        }


        return res.status(200).json({
            "status": "success",
        });
    }
};
