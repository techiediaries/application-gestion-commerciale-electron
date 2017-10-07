"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
//var config = require(path.join(__dirname,'/../config.json'));
var config = JSON.parse(window.localStorage.getItem('config')) || {};
//console.log(config);
/*if(config === null || config === undefined)
{
  module.exports = {};
  return ;  
}*/
/*var sequelize = new Sequelize(config.dbName || '', config.username || '', config.password || '',{
    host: 'localhost',
    dialect:config.dbType || 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

  });*/
var sequelize;
var db        = {};
var o = {};

function setup(){
    var config = JSON.parse(window.localStorage.getItem('config')) || {};
      console.log('in init scope.config.dbName' + config.dbName);
      
    sequelize = new Sequelize(config.dbName || '', config.username || '', config.password || '',{
    host: config.server || '127.0.0.1',
    dialect:config.dbType || 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },logging: console.log.bind(console),
    storage: './../database.sqlite'
  });
 /* config.dbName = 'database';
  config.username = 'root';
  config.password = 'jb395566';
  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
    // SQLite only
    storage: './../../database.sqlite'
  });*/

  o.config = config || {};
  o.sequelize = sequelize || {};
  o.Sequelize = Sequelize;
     
}
function readDB()
{
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });
  o.db = db || {};
}
setup();
readDB();

o.init = function(){
  setup();
  readDB();
}
o.testDatabaseConnexion = function() {
    console.log('testing connection');
    return o.sequelize.authenticate()
};
module.exports = o;