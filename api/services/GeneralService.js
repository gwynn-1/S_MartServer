module.exports = {
    token_genarate:function(specified){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 63; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text+"/"+specified;
    },
    base64Decoded:function(dataString){
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
    
        return response;
    },

    createOtpCode:async function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 32; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        while( await VerifyOtp.checkIfExists(text)){
            return GeneralService.createOtpCode();
        }
        return text;
    }
};