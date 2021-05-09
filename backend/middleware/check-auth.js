const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
  try{
    const token = req.headers.authenticate.split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.userData = decoded;
    next()
  }catch(err){
    res.status(401).json({
      message : 'Token is Invalid'
    })
  }
}
