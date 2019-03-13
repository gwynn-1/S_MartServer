module.exports.crontab = {
    '*/2 * * * *' : function(){
        require('../crontab/update-token.js').run();
    }
};