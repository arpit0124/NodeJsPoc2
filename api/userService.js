const app = require('express').Router()

const currentDateTime = (req, res, next)=>{
    let date = new Date()
    req.currentDateTime = date;
    next()
}
app.get('/userDetails',currentDateTime,async(req, res)=>{
    let result = req.user
    if (result) {
        let resObj = {
            firstName: result.firstName,
            lastName: result.lastName,
            dateTime: req.currentDateTime
        }
        return res.json({
            status: 1,
            result: resObj
        })
    } else {
        return res.json({
            status: 0,
            description: "Invalid user"
        })   
    }
})
module.exports = app