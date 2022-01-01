
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('accesstokens', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}