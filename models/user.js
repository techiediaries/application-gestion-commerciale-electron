//var bcrypt = require('bcrypt');

"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {type:DataTypes.STRING,allowNull: false,unique: true},
    email: {type:DataTypes.STRING,allowNull: true,
            validate: {
              isEmail: true
            }
    },
    firstName: {type:DataTypes.STRING,allowNull: true},
    lastName: {type:DataTypes.STRING,allowNull: true},
    password: {type:DataTypes.STRING,allowNull: true},
    isAdmin : {type:DataTypes.BOOLEAN,allowNull: false},
    
    salt: {type:DataTypes.STRING,allowNull: true},
    

  }, {
    classMethods: {
      associate: function(models) {

      }
    },
    instanceMethods: {
      setPassword: function(password) {
        
        this.password=password;
        
      },
      verifyPassword: function(password){
        var self = this;
        if(self.password === password)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
    }    
  });

  return User;
};
