/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'product',
  primaryKey: 'product_id',
  attributes: {
    product_id:{ type:'number',unique:true,autoIncrement:true},
    product_name:{ type:'string',maxLength:256},
    p_image:{type:'string',maxLength:512},
    p_type_id:{ type:'number'},
    price_origin:{ type:'number'},
    price:{ type:'number'},
    p_quantity:{ type:'number'},
  },

};

