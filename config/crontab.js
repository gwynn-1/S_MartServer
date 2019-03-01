module.exports.crontab = {
    '*/1 * * * *' : function(){
        require('../crontab/update-token.js').run();
    }
};