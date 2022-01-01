const express = require('express')
const app = express();
const routes = require('./routes')
const passport = require('passport')
const initializePassport= require('./passport_Auth');

// parse application/json
app.use(express.json())
app.use(passport.initialize());
initializePassport(passport)
//router
app.use('/api',routes)

//error handler
app.use((err, req, res, next)=> {
  console.log(err)
    res.status(err.status || 500)
    res.json({ message: err.message })
})
  
app.listen(4001, ()=>{console.log("server is running on port 4001")})
