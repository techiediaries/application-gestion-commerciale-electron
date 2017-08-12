"use strict";

module.exports = function(sequelize, DataTypes) {
  var C = sequelize.define("CategorieCharge", {
    name:DataTypes.STRING,//impot,assurance,cnss,salaire,banque,repation meca,degat,sortie de caisse,pneau,divers,etc..
    description:DataTypes.STRING//float

  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return C;
};