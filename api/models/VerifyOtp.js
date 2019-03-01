module.exports = {
    tableName: 'verify_otp',
    primaryKey: 'otp_id',
    attributes:{
        otp_id:{ type:'number',unique:true,autoIncrement:true},
        user_id:{ type:"number",unique:true, required: true },
        otp_code: { type: 'string',unique: true},
        is_expire:{ type:"number"}
    },
    checkIfExists:async function(otp){
        var otp = await VerifyOtp.find({
            where: { otp_code: otp },
            select: ["user_id"]
          }).limit(1);
        if(otp[0]){
            return true;
        }else
            return false;
    },
    checkOtp:async function(otp){
        var otp = await VerifyOtp.find({
            where: { otp_code: otp,is_expire:0 },
            select: ["user_id"]
          }).limit(1);

        if(otp[0]){
            return otp[0].user_id;
        }else
            return false;
    },

    insertOtp:async function(otp,db){
        await VerifyOtp.create(otp).usingConnection(db);
    },

    expireOtp:async function(userid){
        await VerifyOtp.update({user_id:userid})
                    .set({
                        is_expire:1
                    });
    }
}