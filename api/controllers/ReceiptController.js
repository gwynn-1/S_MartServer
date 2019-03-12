/**
 * ReceiptController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    _getReceipt: async function (req, res) {
        var userid = req.users.userid;
        var r_id = req.param('id');
        if (r_id == undefined) {
            var receipt = await Receipt._getReceiptByUser(userid);
            // console.log(receipt);
            return res.status(200).json({
                'status': "success",
                'data': receipt
            });
        } else {
            if (!isNaN(r_id)) {
                var r_detail = await ReceiptDetail._getReceiptDetail(r_id);
                // console.log(receipt);
                return res.status(200).json({
                    'status': "success",
                    'data': r_detail
                });
            } else {
                return res.status(401).json({
                    'status': "error",
                    'message': sails.config.error_code.WRONG_ID_TYPE
                });
            }
        }
    }

};

