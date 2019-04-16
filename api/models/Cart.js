/**
 * Cart.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'mongoDB',
  tableName: 'carts',
  primaryKey: '_id',

  attributes: {
    _id:{type: 'string', columnName: '_id'},
    user_id: { type: 'number', columnName: 'user_id' },
    // product_id: { type: 'number', columnName: 'product_id' },
    quantity: { type: 'number', columnName: 'quantity' },
    total_price: { type: 'number', columnName: 'total_price' },
    product_id: {
      model: 'product'
    },

  },

  _getAllByUser: async function (id) {
    var cart = await Cart.find({
      where: { user_id: id }
    }).populate('product_id');
    return cart;
  },

  _checkProductExistsInCart: async function (user_id, product_id) {
    var cart = await Cart.findOne({
      user_id,product_id
    }).populate('product_id');
    // console.log(cart)
    if(cart == undefined){
      return null;
    }
    return cart;
  },

  _updateCart: async function (params, user_id,product_id) {
    await Cart.update({ user_id, product_id})
      .set(params);
  },
  _deleteCart:async function (user_id,product_id) {
    var cart = await Cart.destroyOne({user_id,product_id})
    return cart;
  },
  _insertCart: async function (params) {
    var cart = await Cart.create(params).fetch();
    return cart;
  },
};

