var jwt = require('jsonwebtoken');

module.exports = {
    jwtSign: function(payload){
        var Key = sails.config.jwt.secretKey;
        var token = jwt.sign(payload,Key);
        return token;
    },

    jwtCheck:function(jwtString){
        try{
            var decoded = jwt.verify(jwtString, sails.config.jwt.secretKey);
            return decoded;
        }catch(err){
            return false;
        }
        
    }
  };