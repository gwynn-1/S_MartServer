/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var QrCodeReader = require('qrcode-reader');
var QRCode = require("qrcode");
var Jimp = require("jimp");

module.exports = {
    error_code: sails.config.error_code,
    getQrCode: async function (req, res) {
        
        var shop_token = await UserDetail.getShoppingToken(req.users.userid);
        console.log(shop_token);
        if (shop_token) {

            QRCode.toDataURL(shop_token, {
                errorCorrectionLevel: sails.config.qrcode.errorCorrectionLevel,
                type: "image/png",
                width: 400
            }, async function (error, url) {
                if (error) throw error;
                return res.status(200).json({
                    qr_image: url
                });
            });
        }
        else {
            return res.status(401).json({
                "status": "error",
                "message": sails.config.error_code.USER_NOT_FOUND
            });
        }
        // console.log(image_str);

    },

    authenQrCode: async function (req, res) {
        var params = ValidateReqService.validateInputQrCode(req);
        if (!params)
            return res.status(401).json({
                "status": "error",
                "message": sails.config.error_code.WRONG_IMAGE_DATA
            });
        var oResult = await UserDetail.checkShoppingToken(params["qr_data"]);
        console.log(oResult);

        if (oResult) {
            if (await UserDetail.changeShoppingStatus(oResult.user_id, 1)) {
                var jwt = JwtService.jwtSign({
                    userid: oResult.user_id,
                    username: oResult.user_name,
                    name: oResult.Name
                });

                return res.status(200).json({
                    "status": "success",
                    "data": {
                        "jwt_string": jwt
                    }
                });
            }

        } else {
            return res.status(401).json({
                "status": "error",
                "message": sails.config.error_code.WRONG_QR_CODE
            })
        }
    },

    // checkQrCode: async function (req, res) {
    //     var params = QrCodeService.validateImage(req);
    //     if (!params)
    //         return res.status(401).json({
    //             "status": "error",
    //             "message": sails.config.error_code.WRONG_IMAGE_FORMAT
    //         });
    //     // check QR Code
    //     var img_buffer = GeneralService.base64Decoded(params.qrcode);
    //     Jimp.read(img_buffer.data, function (err, image) {
    //         // console.log(image);
    //         // image.write('test.jpg');
    //         if (err) {
    //             console.error("Jimp" + err);
    //             // TODO handle error
    //             return res.status(500).json({
    //                 "status": "error",
    //                 "message": err
    //             });
    //         }
    //         var qr = new QrCodeReader();
    //         qr.callback = async function (err, value) {
    //             console.log(value);
    //             if (err) {
    //                 console.error("Reader " + err);
    //                 // TODO handle error
    //                 return res.status(500).json({
    //                     "status": "error",
    //                     "message": err
    //                 });
    //             }
    //             // check Shop Token
    //             var shop_token = value.result;
    //             var oResult = await Users.checkShoppingToken(shop_token);
    //             console.log(oResult);

    //             if (oResult) {
    //                 if (await Users.changeShoppingStatus(oResult.user_id, 1)) {
    //                     var jwt = JwtService.jwtSign({
    //                         userid: oResult.user_id,
    //                         username: oResult.user_name,
    //                         name: oResult.Name
    //                     });

    //                     return res.status(200).json({
    //                         "status": "success",
    //                         "data": {
    //                             "jwt_string": jwt
    //                         }
    //                     });
    //                 }

    //             } else {
    //                 return res.status(401).json({
    //                     "status": "error",
    //                     "message": sails.config.error_code.WRONG_QR_CODE
    //                 })
    //             }
    //         };
    //         qr.decode(image.bitmap);
    //     });
    // }

};

