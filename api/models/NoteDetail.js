/**
 * NoteDetail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'note_detail',
  primaryKey: 'note_detail_id',
  attributes: {
    note_detail_id: { type: 'number', unique: true, autoIncrement: true },
    note_id: { type: 'number' },
    product_id: {
      model: 'product'
    },
    quantity: { type: 'number' },
    isBuy: { type: 'number' },
    created_at: {
      columnName: 'created_at',
      type: 'number', columnType: 'datetime', autoCreatedAt: true
    },
    updated_at: {
      columnName: 'updated_at',
      type: 'number', columnType: 'datetime', autoUpdatedAt: true
    }
  },
  _getNoteDetail: async function (rid) {
    var res = await Note.find({
      where: { note_id: rid }
    }).populate('product_id');
    return res;
  }
};

