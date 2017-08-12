"use strict";

module.exports = function(sequelize, DataTypes) {
  var AL = sequelize.define("LigneFabrication", {
    description: DataTypes.STRING,
	  quantite: DataTypes.STRING,

  
  }, {
    classMethods: {
      associate: function(models) {

       		AL.belongsTo(models.Article);
      
      }
    }
  });

  return AL;
};