
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    emailId: {
        type: DataTypes.STRING,
        uniqueKey: true
    },
    hashedEmailId: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
});
}