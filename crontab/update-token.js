module.exports = {
    run: async function(){
        var total = await Users.count();
        var range = 500;
        var total_page = Math.floor( total /range);
        var cur_page = sails.config.custom.indexOfUser;

        await Users.find({
            select: ['user_name',"user_id"],
          })
          .paginate( cur_page, range)
          .exec(async function(err,users){
            if (err) {
                return ;
            }
            
            for(var i=0; i<users.length;i++){
                var token = GeneralService.token_genarate(users[i].user_name);
                await Users.update({user_id:users[i].user_id})
                        .set({shop_token:token});
            }
            console.log("success");
          });

        if(cur_page == total_page){
            sails.config.custom.indexOfUser =0;
        }
    }
}