module.exports = {
    validateInputLogin: function (req) {
        // here you call your models, add object security validation, etc...
        return req.validate([   // 'numeric || string' or 'numeric|| string' are OK. Space will be ignored
            { 'user_name': 'string' },
            { 'password': 'string' }
        ]);
    },

    validateInputCheckLogin: function (req) {
        return req.validate([   // 'numeric || string' or 'numeric|| string' are OK. Space will be ignored
            { 'user_name': 'string' }
        ]);
    },

    validateInputSignup: function (req) {
        // here you call your models, add object security validation, etc...
        var values = req.allParams();

        if (values.password != values.repassword) {
            return sails.config.custom.VALIDATE_PASSWORD;
        }
        if (this.hasEmptyString(values)) {
            return sails.config.custom.REQUIRED_FIELD;
        } else {
            return req.validate([   // 'numeric || string' or 'numeric|| string' are OK. Space will be ignored
                { 'user_name': 'string' },
                { 'password': 'string' },
                'repassword?',
                { "Name": "string" },
                { "Email": "email" },
                { "Phone": "numeric" }
            ]);
        }

    },
    validateInputQrCode: function (req) {
        return req.validate([   // 'numeric || string' or 'numeric|| string' are OK. Space will be ignored
            { 'qr_data': 'string' }
        ]);
    },
    validateInputOtp: function (req) {
        return req.validate([   // 'numeric || string' or 'numeric|| string' are OK. Space will be ignored
            { 'token': 'string' },
        ]);
    },

    hasEmptyString: function (obj) {
        for (var key in obj) {
            if (obj[key] === "")
                return true;
        }
        return false;
    },

    validateInputUpdateUser: function (req) {
        // here you call your models, add object security validation, etc...
        return req.validate([   // 'numeric || string' or 'numeric|| string' are OK. Space will be ignored
            { "Name": "string" },
            { "Email": "email" },
            { "Phone": "numeric" },
            'Address?','CityId?','DistrictId?','WardId?','gender?'
        ]);
    },
};