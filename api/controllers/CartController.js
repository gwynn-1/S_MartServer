/**
 * CartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    _listCart: async function (req, res) {
        var cart = await Cart._getAllByUser(req.users.userid);
        return res.status(200).json({
            "status":"success",
            "data":cart
        });
    }

};

