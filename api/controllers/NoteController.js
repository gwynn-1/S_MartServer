/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    _getNote: async function (req, res) {
        var userid = req.users.userid;
        var n_id = req.param('id');

        if(n_id!=undefined){
            var page = req.param('page');
            var receipt = await Note.listNote(userid,page);
            // console.log(page);
            var total = await Note.count();
            data = {
                data : receipt,
                page,total
            };
            return res.status(200).json({
                'status': "success",
                'data': data
            });
        }else{
            if (!isNaN(n_id)) {
                var n_detail = await NoteDetail._getNoteDetail(n_id);
                // console.log(receipt);
                return res.status(200).json({
                    'status': "success",
                    'data': n_detail
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

