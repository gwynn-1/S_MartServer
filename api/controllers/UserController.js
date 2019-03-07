/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getUserInfo: async function (req, res) {
        var userid = req.users.userid;
        var user = await Users.getUserInfo(userid);

        if (user) {
            return res.status(200).json({
                'status': "success",
                'data': user
            });
        } else {
            return res.status(401).json({
                'status': "error",
                'message': sails.config.error_code.USER_NOT_FOUND
            });
        }
    },
    updateUser: async function (req, res) {
        var userid = req.users.userid;
        var params = ValidateReqService.validateInputUpdateUser(req);
        if (!params)
            return;

        try {
            await Users.updateUser(userid, params);
            return res.status(200).json({
                status: "success"
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: "error",
                message: (err.code == "E_UNIQUE") ? sails.config.error_code.LOGIN_USER_EXISTED : err.code
            });
        }
    }
};

