module.exports = async function (req, res, proceed) {

    // If `req.me` is set, then we know that this request originated
    // from a logged-in user.  So we can safely proceed to the next policy--
    // or, if this is the last policy, the relevant action.
    // > For more about where `req.me` comes from, check out this app's
    // > custom hook (`api/hooks/custom/index.js`).
    var authorization = req.headers.authorization;
    if(authorization !=undefined){
        var authen_token = authorization.replace("Bearer ","");
    }else{
        return res.forbidden();
    }
    
    var decoded = JwtService.jwtCheck(authen_token);

    if(decoded){
        
        var loginstatus = await Users.checkIfLogin(decoded.userid);
        if(loginstatus == false){
            return res.status(401).json({
                status:"error",
                message:"User vẫn chưa đăng nhập"
            });
        }
        req.users = decoded;
        return proceed();
    }
      
    return res.forbidden();
  
    //--•
    // Otherwise, this request did not come from a logged-in user.
  
  };