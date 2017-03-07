'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg:'Invalid Email address'
      }
    }
  },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,20],
          msg: 'Password must be between 4 and 20 characters long'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb){
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash; //Change the password to the hash value before inserting to the DB
        cb(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },//compare user password to user hash
    instanceMethods: {
      isValidPassword: function(passwordTyped){
        return bcrypt.compareSync(passwordTyped, this.password);
      },
      toJSON: function(){
        var data = this.get();
        delete data.password;
        return data;
      }
    }
  });
  return user;
};

