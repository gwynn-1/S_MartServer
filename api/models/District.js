/**
 * District.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'district',
  primaryKey: 'districtid',
  attributes: {
    districtid:{ type:'string',unique:true,required: true,},
    name:{ type:"string",maxLength:256 },
    type:{ type:"string",maxLength:256 },
    location:{ type:"string",maxLength:256 },
    provinceid:{ type:"string",maxLength:10 },

  },

  getDistricts:async function(province){
    var district = await District.find({
      where: { provinceid: province },
      select: ['districtid','name']
    })
    return district;
  }
};

