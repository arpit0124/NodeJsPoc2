const model = require('../models');

exports.saveRefreshToken = async (userid, accessToken, refreshToken, transaction) => {
    try {
        let result = await model.accessToken.create({
            userid,
            accessToken,
            refreshToken
        }, { transaction })
        return result
    } catch (err) {
        console.log(err)
    }
}
exports.removeToken = async (id, transaction) => {
    try {
        let result = await model.accessToken.destroy({
            where: { id }, transaction
        })
        return result
    } catch (err) {
        console.log(err)
    }
}
exports.getAccessToken = async (refreshToken) => {
    return await model.accessToken.findOne({
        where: { refreshToken }
    });
}
exports.getUserDetails = async (id) => {
    return await model.users.findOne({
        where: { id }
    })
}