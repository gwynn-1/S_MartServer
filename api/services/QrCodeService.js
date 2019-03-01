var QRCode = require('qrcode');


module.exports = {
    createQrCode:function(user_name,datastring){
        // var image_path = 'assets/upload/qrimage/'+ Math.floor( (Date.now())/1000)+"_"+user_name+".png";
        // console.log(image_path);
        return QRCode.toDataURL( datastring, {
            errorCorrectionLevel:sails.config.qrcode.errorCorrectionLevel,
            type:"image/png"
          }, function (error, url) {
            if (error) throw error;
            console.log(url);
            return url;
          });
        //   return image_path.replace("assets/","");
    },
    validateImage:function(req){
        var params = req.allParams();
        qrcode = params.qrcode;
        if(qrcode.match("data:image\/[a-z]+;base64,")){
            return params;
        }else
            return false;
    }
};