const User = require("../../models/Users")

module.exports = {
    findAllUsers: async () => {
        return await User.findAll()
    },
    findOrCreate: async (user_email, user_name) => {
        return await User.findOrCreate({
            where: { user_email },
            defaults: {
                user_email: user_email,
                user_name: user_name
            }
        });
    },
    changeRole: async (user_id, roll) => {
        return await User.update({ roll: roll }, {
            where: {
                user_id: user_id
            }
        })
    },

}



