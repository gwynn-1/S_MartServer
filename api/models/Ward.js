/**
 * Ward.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'ward',
  primaryKey: 'wardid',
  attributes: {
    wardid:{ type:'string',unique:true,required: true,},
    name:{ type:"string",maxLength:256 },
    type:{ type:"string",maxLength:256 },
    location:{ type:"string",maxLength:256 },
    districtid:{ type:"string",maxLength:10 },

  },

  getWards:async function(district) {
    var ward = await Ward.find({
      where: { districtid: district },
      select: ['wardid','name']
    })
    return ward;
  }
};

