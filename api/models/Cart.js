/**
 * Cart.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'mongoDB',
  tableName: 'carts',

  attributes: {
    id: { type: 'string', columnName: '_id' },
    user_id: { type: 'number', columnName: 'user_id' },
    // product_id: { type: 'number', columnName: 'product_id' },
    quantity: { type: 'number', columnName: 'quantity' },
    total_price: { type: 'number', columnName: 'total_price' },
    product_id:{ 
      model: 'product'
    },

  },

  _getAllByUser: async function (id) {
    var cart = await Cart.find({
      where: { user_id: id }
    }).populate('product_id');
    return cart;
  }
};

