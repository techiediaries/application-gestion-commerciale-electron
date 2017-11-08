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
  AL.beforeDestroy(function (model, options, cb) {

        var newQ = model.quantite; 
        console.log("removing lignevente " + model.id);
        console.log("adding back quantity: " + model.quantite + " for Article"+ model.ArticleId);
        sequelize.models.Article.addQuantity(model.ArticleId,newQ);
        return cb(null, options);
  });
  return AL;
};