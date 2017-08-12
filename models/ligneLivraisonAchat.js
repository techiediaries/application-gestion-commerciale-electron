"use strict";

module.exports = function(sequelize, DataTypes) {
  var AL = sequelize.define("LigneLivraisonAchat", {
    description: DataTypes.STRING,
	  quantite: DataTypes.STRING
    //prixAchat: DataTypes.FLOAT 
	}, {
    classMethods: {
      associate: function(models) {

       		AL.belongsTo(models.Article);
      
      }
    }
  });

  return AL;
};