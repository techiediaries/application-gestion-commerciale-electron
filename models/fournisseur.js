"use strict";

module.exports = function(sequelize, DataTypes) {
  var F = sequelize.define("Fournisseur", {
    reference: {type: DataTypes.STRING, unique: true},
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    fax: DataTypes.STRING,
    representant: DataTypes.STRING,
    //identite fiscal
    //address:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
       
      }
    }
  });

  return F;
};