const User = require("../../models/Users")

module.exports = {
    createUser: async (name, lastName, username, password, email, phone) => {
        const user = await User.create({
            user_name: name,
            user_lastname: lastName,
            user_username: username,
            user_password: password,
            user_email: email,
            user_phone: phone,
        })
        return user
    },
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

}



