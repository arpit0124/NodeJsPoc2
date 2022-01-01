const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
const model = require('./models');
const encrypt = require('./utils/encrypt')
async function initializePassport(passport){
passport.use('local',new LocalStrategy(
  async (username, password, done)=> {
    try{
    let hashedEmail = encrypt.computeHash(username)
   let result = await model.users.findOne({        
    where:{hashedEmailId:hashedEmail} 
  });
  if(!result){
    return done(null, false)
  }
  if(!await encrypt.compare(password, result.password)){
   return done(null, false)
  }
  return done(null, result)
}catch(err){
  console.log(err)
}
  }

));
passport.use('verifyToken',new JwtStrategy(opts, function(jwt_payload, done) {
    done(null, jwt_payload.user)
}))
}
module.exports=initializePassport