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
  AL.afterDestroy(function (model, options, cb) {

        var newQ = model.quantite; 
        sequelize.models.Article.removeQuantity(model.ArticleId,newQ,0);
        return cb(null, options);
  });
  return AL;
};