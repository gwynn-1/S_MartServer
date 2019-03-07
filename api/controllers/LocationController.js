/**
 * LocationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _getWard:async function(req,res){
    var district = req.param('districtid');
    if(district !=undefined){
        var result = await Ward.getWards(district);
        console.log(district)
        return res.status(200).json({
            "status":"success",
            "data":result
        });
    }else{
        return res.status(200).json({
            "status":"success",
            "data":[]
        });
    }
  },
  _getDistrict:async function(req,res){
    var province = req.param('provinceid');
    if(province !=undefined){
        var result = await District.getDistricts(province);
        console.log(province)
        return res.status(200).json({
            "status":"success",
            "data":result
        });
    }else{
        return res.status(200).json({
            "status":"success",
            "data":[]
        });
    }
  },
  _getProvince:async function(req,res){
    var result = await Province.getProvince();
    return res.status(200).json({
        "status":"success",
        "data":result
    });
  }
};

