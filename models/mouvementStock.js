"use strict";
// cas sortie benefit= prixVente - prixAchat
module.exports = function(sequelize, DataTypes) {
  var M = sequelize.define("Movement", {
    reference: {type: DataTypes.STRING, unique: false},
    type:  {type:   DataTypes.ENUM,values: ['entrée', 'sortie']}, 
    quantite: {type:DataTypes.FLOAT,defaultValue:0},
    prixAchat: {type:DataTypes.FLOAT,defaultValue:0.0},
    libelle: {type:DataTypes.STRING,defaultValue:''},
    cause:  {type:   DataTypes.ENUM,values: ['autre', 'périmé','vente','achat']}, 

    //coefficient:DataTypes.FLOAT,//0
    //benefit
    prixUnitaire: {type:DataTypes.FLOAT,defaultValue:0.0},//0
    //taxe: DataTypes.FLOAT//0 20%
    //fournisseur ou client

      
  }, {
    classMethods: {
      associate: function(models) {
        M.belongsTo(models.Article);
     }
    }
  });

  M.afterCreate(function(model, options, cb) {
    if(model.type === 'entrée')
    {
      //sequelize.models.Article.addQuantity(model.ArticleId,model.quantite);
      //sequelize.models.Article.setQuantityAndBuyingPrice(model.ArticleId,model.quantite,model.prixAchat);
         //sequelize.models.Article.fromMovement(model);

    }
    if(model.type === 'sortie')
    {
        console.log('sortie');
        if(model.cause === 'périmé')
        {
            //sequelize.models.Article.changeObsoluteQuantity(model.ArticleId,model.quantite);
            console.log('set obsolute q');
            sequelize.models.Article.removeQuantity(model.ArticleId,model.quantite,model.quantite);
        }
        else
        {
            sequelize.models.Article.removeQuantity(model.ArticleId,model.quantite);

        } 
        
    }

    return cb(null,options);

  });
  M.afterDestroy(function(model, options, cb) {
      return cb(null,options);
  });


  return M;
};