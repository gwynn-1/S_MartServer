/**
 * Province.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'province',
  primaryKey: 'provinceid',
  attributes: {
    provinceid:{ type:'string',unique:true,required: true,},
    name:{ type:"string",maxLength:256 },
    type:{ type:"string",maxLength:256 },
    location_id:{ type:"string",maxLength:10 },

  },

  getProvince:async function(){
    var province = await Province.find({
      select: ['provinceid','name']
    })
    return province;
  }

};

