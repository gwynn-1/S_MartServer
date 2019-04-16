/**
 * UserDetail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {
  datastore: 'mongoDB',
  tableName: 'user_details',
  primaryKey: '_id',
  // dontUseObjectIds: true,
  // autoPK:false,
  attributes: {
    _id:{type: 'string', columnName: '_id'},
    user_id: { model: 'Users', unique: true },
    shop_token: { type: 'string', maxLength: 100, columnName: 'shop_token' },
    isShopping: { type: "number", columnName: 'isShopping' },
    isLogin: { type: "number", columnName: 'isLogin' },
  },

  insertDetail:async function(params){
    var user = await UserDetail.create(params).fetch();
    return user;
  },
  updateDetail: async function (userid, user) {
    await UserDetail.update({ user_id: userid })
      .set(user);
  },

  changeShoppingStatus: async function (userid, status) {
    try {
      await UserDetail.update({ user_id: userid })
        .set({ isShopping: status });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getShoppingToken: async function (userid) {
    var user = await UserDetail.find({
      where: { user_id: userid },
    }).limit(1);
    if (user[0])
      return user[0].shop_token;
    else
      return false;

  },
};

