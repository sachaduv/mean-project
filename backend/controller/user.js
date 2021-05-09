const User = require('../modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userSignUp = (req,res,next)=>{
  bcrypt.hash(req.body.password,10).then((hash)=>{
    const user = new User({
      email : req.body.email,
      password : hash
    })

    user.save().then((result)=>{
      res.status(201).json({
        message : 'User successfully created!...',
        user : result
      })
    }).catch(err => {
      res.status(500).json({
        message : 'Invalid Authentication !...'
      })
    })
  }).catch(error=>{
    res.status(500).json({
      message : 'Invalid Authentication !...'
    })
  })
}

exports.userLogin = (req,res,next)=>{
  let fetchUser;
  User.findOne({email:req.body.email}).then(user=>{
    if(!user){
      return res.status(401).json({
        message : 'Auth failed!..'
      })
    }
   fetchUser = user;
    return bcrypt.compare(req.body.password,user.password)
  }).then((user)=>{
    if(!user){
      return res.status(401).json({
        message : 'Auth failed!..'
      })
    }

    const token = jwt.sign({email:fetchUser.email,userId:fetchUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    res.status(200).json({
      expiresIn : 3600,
      token:token,
      userId : fetchUser._id
    })

  }).catch(err=>{
    return res.status(500).json({message : 'Authentication Failed!..'})
  })
}