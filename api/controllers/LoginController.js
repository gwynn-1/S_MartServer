/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    login:async function(req,res) {

        //validate input
        var params = ValidateReqService.validateInputLogin(req);        
        if(!params)
            return ;
        
        //check Username hoặc email có trong DB
        var oResult = await Users.getUserLoginInfo(params);

        if(oResult == false) {
            return res.status(401).json({
                'status':"error",
                'message':sails.config.error_code.LOGIN_USER_NOT_EXIST
            });
        }else if(typeof oResult == "string"){
            return res.status(401).json({
                'status':"error",
                'message':sails.config.error_code.INACTIVE_USER
            });
        }

        //check Password
        await sails.helpers.passwords.checkPassword(params.password, oResult.password)
                    .intercept("incorrect",function(){
                        return res.status(401).json({
                            status:'error',
                            message:sails.config.error_code.LOGIN_WRONG_PASSWORD
                        });
                    });

        // thay doi Login Status
        await Users.updateUser(oResult.user_id,{
            isLogin:1
        });

        // tao jwt
        var jwt = JwtService.jwtSign({
            'userid':oResult.user_id,
            'username':oResult.user_name,
            'name':oResult.Name
        });
        
        return res.status(200).json({
            'status':"success",
            'data':{
                'jwt_string':jwt,
                'username':oResult.user_name,
                'avatar':oResult.Avatar,
                'name':oResult.Name
            }
        });
    },
    checkLogin:async function(req,res){
        var params = ValidateReqService.validateInputCheckLogin(req);        
        if(!params)
            return ;

        var loginstatus = await Users.checkIfLoginByUsername(params.user_name);
        if(loginstatus != false){
            var jwt = JwtService.jwtSign({
                'userid':loginstatus.user_id,
                'username':loginstatus.user_name,
                'name':loginstatus.Name
            });

            return res.status(200).json({
                'status':"success",
                'data':{
                    'jwt_string':jwt,
                    'username':loginstatus.user_name,
                    'avatar':loginstatus.Avatar,
                    'name':loginstatus.Name
                }
            });
        }else{
            return res.status(401).json({
                'status':"error",
                'message':sails.config.error_code.USER_NOT_LOGIN
            });
        }
    },

    logout:async function(req,res){
        var loginstatus = await Users.checkIfLogin(req.users.userid);
        if(loginstatus==false){
            return res.status(401).json({
                status:"error",
                message:sails.config.error_code.USER_NOT_LOGIN
            });
        }

        try{
            await Users.updateUser(req.users.userid,{ isLogin:0});
            return res.status(200).json({
                status:"success"
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                status:"error",
                message:err
            });
        }
    }

};

