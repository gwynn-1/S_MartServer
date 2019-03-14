var admin = require("firebase-admin");

var serviceAccount = require("../smartapp-45af7-firebase-adminsdk-lhg28-09cdb2e7fe.json");

const UPDATE_QR_TOPIC ="UPDATE_QR_TOPIC";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smartapp-45af7.firebaseio.com"
});

var payload = {
    data: {
        action: "LOAD_QR",
    }
};

module.exports = {
    run: async function () {

        var total = await Users.count();
        var range = 500;
        var total_page = Math.floor(total / range);
        var cur_page = sails.config.custom.indexOfUser;

        await Users.find({
            select: ['user_name', "user_id"],
        })
            .paginate(cur_page, range)
            .exec(async function (err, users) {
                if (err) {
                    return;
                }

                for (var i = 0; i < users.length; i++) {
                    var token = GeneralService.token_genarate(users[i].user_name);
                    await Users.update({ user_id: users[i].user_id })
                        .set({ shop_token: token });
                }
                console.log("success");
                // admin.messaging().sendToTopic(UPDATE_QR_TOPIC,payload,{
                //     priority:"high",timeToLive:60*60*12
                // });
            });

        if (cur_page == total_page) {
            sails.config.custom.indexOfUser = 0;
        }
    }
}