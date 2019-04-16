/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'product',
  primaryKey: 'product_id',
  dontUseObjectIds: true,
  attributes: {
    product_id:{ type:'number',unique:true,autoIncrement:true},
    product_name:{ type:'string',maxLength:256},
    p_image:{type:'string',maxLength:512},
    type_id:{ model: 'ProductType'},
    price_origin:{ type:'number'},
    price:{ type:'number'},
    p_quantity:{ type:'number'},
  },
  _getAllByType:async function(){
    var product = await Product.find().populate('type_id');
    return product;
  },
  _getProduct:async function(product_id){
    var product = await Product.findOne({product_id});
    return product;
  },
  _reduceQuantity:async function(product_id){
    var product = await Product.findOne({product_id});
    product.p_quantity -= 1;
    
    await Product.update({  product_id})
      .set({
        p_quantity:product.p_quantity-1
      });
  },
};

