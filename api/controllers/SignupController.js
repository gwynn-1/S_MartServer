/**
 * SignupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    error_code :sails.config.error_code,

  signup:async function(req,res){
    var params = ValidateReqService.validateInputSignup(req);        
    if(params == sails.config.error_code.VALIDATE_PASSWORD)
        return res.badRequest(sails.config.error_code.VALIDATE_PASSWORD);
    if(params == sails.config.error_code.REQUIRED_FIELD){
        return res.badRequest(sails.config.error_code.REQUIRED_FIELD);
    }
    
    var oResult = await Users.getUserSignupInfo(params);
    if(Object.getOwnPropertyNames(oResult).length !==0){
        return res.status(401).json({
            'status':"error",
            'message':sails.config.error_code.LOGIN_USER_EXISTED
        });
    }

    var hashedPassword = await sails.helpers.passwords.hashPassword(params.password);
    params["password"] = hashedPassword;
    params["active"] = 0;
    var otp_code = await GeneralService.createOtpCode();

    try{
        await sails.getDatastore()
                    .transaction(async function (db, proceed) {
                        var user = await Users.insertUser(params,db);
                        // console.log(otp_code,user.user_id );
                        await VerifyOtp.insertOtp({
                            "user_id":user.user_id,
                            "otp_code":otp_code,
                            "is_expire":0
                        },db);

                        //send mail
                        var html_email = await sails.renderView("mail/mail-template",
                                {
                                    link:req.baseUrl + "/api/gateway/verify-otp/"+otp_code,
                                    image_link:req.baseUrl + "/images",
                                    layout: false
                                }
                                    );
                        MailService.Sendmail("test mail",html_email,user.Email);
                        return proceed();
                    });
        
        
        return res.status(200).json({
            "status":"success",
        });
    }catch(err){
        return res.status(500).json({
            "status":"error",
            "message":err
        });
    }
  },
  verifyotp:async function(req,res){
    var params = ValidateReqService.validateInputOtp(req);        
    if(!params)
        return ;

    var userid = await VerifyOtp.checkOtp(params.token);
    if(userid){
        await Users.updateUser(userid,{
            'active':1
        });

        await VerifyOtp.expireOtp(userid);

        return res.view("mail/verify-token",{success:true,layout: false});
    }else{
        return res.view("mail/verify-token",{success:false,message:"Mã token không hợp lệ",layout: false});
    }
  }

};

