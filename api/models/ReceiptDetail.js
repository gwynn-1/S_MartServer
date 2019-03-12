/**
 * ReceiptDetail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'receipt_detail',
  primaryKey: 'r_detail_id',
  attributes: {
    r_detail_id:{ type:'number',unique:true,autoIncrement:true},
    receipt_id:{ type:'number'},
    product_id:{ 
      model: 'product'
    },
    quantity:{ type:'number'},
    price:{ type:'number'},
  },

  _getReceiptDetail:async function(rid){
    var res = await ReceiptDetail.find({
      where: { receipt_id: rid }
    }).populate('product_id');
    return res;
  }
};

