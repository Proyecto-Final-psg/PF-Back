const userGroup = require("../models/userGroup")
module.exports = {
    showAllUserGroups: async () => {
        return await userGroup.findAll()
    },
    createUserGroup: async (user_id, grupoId) => {
        if (user_id && grupoId) {
            return await userGroup.create({
                user_id: user_id,
                group_id: grupoId
            })
        }else{
            return {"msg":"need user_id or group_id"}
        }
    },
    userGroupIds: async (id) => {
        return await userGroup.findAll({
            where: { user_id: id }
        })
    },
    usersIdFromGroup: async (id) => {
        return await userGroup.findAll({
            where: { group_id: id }
        })
    },


}
