module.exports = {
    tableName: 'users',
    primaryKey: 'user_id',
    attributes:{
        user_id:{ type:'number',unique:true,autoIncrement:true},
        user_name:{ type:"string",unique:true, required: true,maxLength:256 },
        password: { type: 'string',required: true,protect: true,maxLength:256 },
        Name:{ type:"string",maxLength:256 },
        Email:{ type:"string",unique:true,isEmail: true,maxLength:256 },
        Phone:{ type:"string" },
        Avatar:{ type:"string" },
        Address:{ type:"string" },
        CityId:{ type:"number" },
        DistrictId:{ type:"number" },
        WardId:{ type:"number" },
        gender:{ type:"number" },

        shop_token:{ type:'string',maxLength:100 },
        isShopping:{ type:"number" },
        isLogin:{ type:"number" },
        active:{ type:"number" },
        // user_detail: {
        //     collection: 'user_detail',
        //     via: 'users'
        //   }
    },

    getUserInfo:async function(userid) {
        var oUser = await Users.findOne({
            select: ["Name","Email","Phone","Avatar","Address","CityId","DistrictId","WardId","gender"],
          }).where({'user_id': userid,"active":1});
        // console.log(oUser);
          if(oUser){
            if(Object.getOwnPropertyNames(oUser).length !==0){
                return oUser;
            }else{
                return false;
            }
          }else
            return false;
    },
    getUserLoginInfo:async function(params) {
        var oUser = await Users.findOne().where({
            "or" : [
                { "user_name": params.user_name },
                { "Email": params.user_name },
              ]
          });
        // console.log(oUser);
          if(oUser){
            if(Object.getOwnPropertyNames(oUser).length !==0 && oUser.active ==1){
                return oUser;
            }else if(Object.getOwnPropertyNames(oUser).length !==0 && oUser.active ==0){
                return "User chưa được active";
            }
          }else
            return false;
    },

    getUserSignupInfo:async function(params) {
        var oUser = await Users.find().where({
            "or" : [
                { "user_name": params.user_name },
                { "Email": params.Email },
                {"Phone":params.Phone}
              ]
          });
        // console.log(oUser.length != 0);
          if(oUser.length != 0){
            if(Object.getOwnPropertyNames(oUser[0]).length !==0 && oUser[0].active ==1){
                return oUser[0];
            }else if(Object.getOwnPropertyNames(oUser[0]).length !==0 && oUser[0].active ==0){
                return "User chưa được active";
            }
          }else
            return false;
    },

    checkIfLoginByUsername:async function(username){
        var oUser = await Users.findOne({
            select: ['isLogin','active','user_name',"Avatar","Name","user_id"],
          }).where({'user_name': username});
        if(oUser){
            if(Object.getOwnPropertyNames(oUser).length !=0 && oUser.active ==1 && oUser.isLogin==1){
                return {
                    user_name:oUser.user_name,
                    Name:oUser.Name,
                    user_id:oUser.user_id
                };
            }
            else if(Object.getOwnPropertyNames(oUser).length !=0 && oUser.active ==1 && oUser.isLogin==0)
                return false;
            else
                return false;
        }else
            return false;
        
    },

    checkIfLogin:async function(userid){
        var oUser = await Users.findOne({
            select: ['isLogin','active'],
          }).where({'user_id': userid});
        
        if(Object.getOwnPropertyNames(oUser).length !=0 && oUser.active ==1 && oUser.isLogin==1){
            return true;
        }
        else if(Object.getOwnPropertyNames(oUser).length !=0 && oUser.active ==1 && oUser.isLogin==0)
            return false;
        else
            return false;
    },

    updateUser:async function(userid,user){
        await Users.update({user_id:userid})
                    .set(user);
    },

    insertUser : async function(user,db){
        var user = await Users.create(user).usingConnection(db).fetch();
        return user;
    },

    getShoppingToken:async function(userid){
        var user = await Users.find({
            where: { user_id: userid },
            select: ['shop_token']
          }).limit(1);
        if(user[0])
            return user[0].shop_token;
        else
            return false;
        
    },

    checkShoppingToken:async function(shoptoken){
        var user = await Users.find({
            where: { shop_token: shoptoken },
            select: ['user_name',"Name","user_id"]
          }).limit(1);
        if(user[0])
            return user[0];
        else
            return false;
    },

    changeShoppingStatus:async function(userid,status){
        try{
            await Users.update({user_id:userid})
                        .set({isShopping:status});
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}