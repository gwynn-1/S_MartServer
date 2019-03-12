/**
 * Receipt.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'receipt',
  primaryKey: 'receipt_id',

  attributes: {
    receipt_id:{ type:'number',unique:true,autoIncrement:true},
    user_id:{type:'number'},
    receipt_code:{ type:'string',maxLength:20},
    total_price:{ type:'number'},
    total_payment:{ type:'number'},
    status:{type:'string',enum: ['pending', 'success', 'failed']}
  },

  _getReceiptByUser:async function(userid,page=1){
      var limit =10;
      var res = await Receipt.find({
        where: { user_id: userid },
         limit, skip: limit * (page-1)
      });

      
      return res;
  }

};

