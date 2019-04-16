/**
 * Note.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'note',
  primaryKey: 'note_id',

  attributes: {
    note_id: { type: 'number', unique: true, autoIncrement: true },
    user_id: { type: 'number' },
    note_description: { type: 'string', maxLength: 256 },
    notification_date: {
      columnName: 'notification_date',
      type: 'number', columnType: 'datetime'
    },
    isNotify: { type: 'number' },
    isFinish: { type: 'number' },
    created_at: {
      columnName: 'created_at',
      type: 'number', columnType: 'datetime', autoCreatedAt: true
    },
    updated_at: {
      columnName: 'updated_at',
      type: 'number', columnType: 'datetime', autoUpdatedAt: true
    }
  },

  listNote: async function (userid,page=1) {
    var limit =10;
    var oResult = await Note.find({
      where: { user_id: userid },
      limit, skip: limit * (page - 1)
    });

    return oResult;
  }

};

