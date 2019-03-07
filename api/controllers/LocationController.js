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
        var resp =[];

        for(var index in result){
            resp.push({key:result[index].wardid, label:result[index].name})
        }
        return res.status(200).json({
            "status":"success",
            "data":resp
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
        var resp =[];

        for(var index in result){
            resp.push({key:result[index].districtid, label:result[index].name})
        }
        return res.status(200).json({
            "status":"success",
            "data":resp
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
    var resp =[];

    for(var index in result){
        resp.push({key:result[index].provinceid, label:result[index].name})
    }

    return res.status(200).json({
        "status":"success",
        "data":resp
    });
  }
};

