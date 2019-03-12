/**
 * ProductType.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'product_type',
  primaryKey: 'type_id',

  attributes: {
    type_id:{ type:'number',unique:true,autoIncrement:true},
    product_type_name:{ type:'string',maxLength:256},

  },

};

