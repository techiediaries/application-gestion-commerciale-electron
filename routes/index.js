const express = require('express');
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');

var passport = require('passport');
var models = require('../models');


const router = express.Router();
var auth = ejwt({secret: 'SECRET', userProperty: 'payload'});
router.get('/',auth,function(req, res, next) {
	res.status(401).json({message: '/'})
});


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var User = models.db.User;
  var user = User.build({'username':req.body.username});
  user.setPassword(req.body.password);
  
  user.save().then(function(u){
	  	return res.json({token: user.generateJWT()});
  });
  
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  
  passport.authenticate('local', function(err, user, info){
    
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(404).json(info);
    }

  })(req, res, next);
});

module.exports = router;
