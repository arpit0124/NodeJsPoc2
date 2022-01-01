const app = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const userDb = require('../database/users')
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return res.json({
                status: 0,
                description: "something went wrong"
            });
        }
        if (!user) {
            return res.json({
                status: 0,
                description: "Invalid username or password"
            });
        }
        req.logIn(user, { session: false }, async function (err) {
            if (err) { return next(err); }
            try {
                let userObj = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userid: user.id
                }
                const accessToken = jwt.sign({ user: userObj }, 'secret', { expiresIn: '20m' });
                const refreshToken = uuidv4();
                let result = await userDb.saveRefreshToken(user.id, accessToken, refreshToken);
                if (result) {
                    return res.json({
                        status: 1,
                        accessToken: `Bearer ${accessToken}`,
                        refreshToken
                    });
                }
            } catch (err) {
                console.log(err)
                return res.json({
                    status: 0,
                    description: 'something went wrong'
                });
            }
        });
    })(req, res, next)
})
app.post("/accessTokenByRefershToken", async (req, res) => {
    try {
        await models.sequelize.transaction(async (t) => {
            let refreshToken = req.body.refreshToken
            let result = await userDb.getAccessToken(refreshToken)
            if (result) {
                let user = await userDb.getUserDetails(result.userid)
                let userObj = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userid: user.id
                }
                const accessToken = jwt.sign({ user: userObj }, 'secret', { expiresIn: '20m' });
                const refreshToken = uuidv4();
                await userDb.removeToken(result.id, t)
                let saveToken = await userDb.saveRefreshToken(user.id, accessToken, refreshToken, t);
                if (saveToken) {
                    return res.json({
                        status: 1,
                        accessToken: `Bearer ${accessToken}`,
                        refreshToken
                    });
                }
            } else {
                return res.json({
                    status: 0,
                    description: "error"
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = app