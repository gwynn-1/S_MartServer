/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getAllProduct: async function (req, res) {
        var oResult = await ProductType._getAllByType();
        // console.log(oResult)
        // var arr = [];


        return res.status(200).json({
            status:"success",
            data: oResult
        });
    }

};

