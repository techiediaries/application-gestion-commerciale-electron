"use strict";

module.exports = function(sequelize, DataTypes) {
  var AL = sequelize.define("LigneVente", {
    
    quantite: DataTypes.FLOAT,
    prixUnitaire: DataTypes.FLOAT 
	
  
  }, {
    classMethods: {
      associate: function(models) {

       		AL.belongsTo(models.Article);
      
      }
    }
  });

  return AL;
};